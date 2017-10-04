let chai = require("chai")
let sinon = require("sinon")
let sinonChai = require("sinon-chai")
let chaiAsPromised = require("chai-as-promised")
let chaiSpies = require("chai-spies")
let assert = chai.assert
let expect = chai.expect
chai.should()
chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiSpies)

let Sequelize = require('sequelize')
let _         = Sequelize.Utils._
let Promise   = Sequelize.Promise
let validator = Sequelize.Validator
let modelFactory = require('../harness/test-models')
let assocUpdates = require('../../lib/sequelize-plugins/association-updates')

describe('sequelize-association-updates', async function() {
  beforeEach(async function(){
    this.models = modelFactory.createAssociationsTestModel([ assocUpdates ])
    this.sequelize = this.models.sequelize
    await this.models.sync({logging: null})
    this.testUser = await this.models.User.create({
      name: 'Raul Contreras',
      contract: { name: 'Kepen' },
      profile:  { name: 'Admin' },
      addresses: [
        { street: 'street1', entity: 'USER' },
        { street: 'street2', entity: 'USER' }
      ]}, { include:{ all:true } }
    )
    await this.testUser.createProperty({ name: 'userProp1',  internal: true }, { value: 'value1' })
    await this.testUser.createProperty({ name: 'userProp2',  internal: true }, { value: 'value2' })
    await this.testUser.profile.createProperty ({ name: 'profileProp' }, { value: 'value1' })
    await this.testUser.contract.createProperty({ name: 'contractProp'}, { value: 'value1' })
  })

  it('Debe crear la asociacion M:1', async function () {

    let user = await this.testUser.updateAssoc({
      model: this.models.Contract,
      as: 'contract',
      values: {name: 'CompanyX'}
    })
    let contract = await user.getContract()

    expect(contract).to.be.ok
    expect(contract).to.have.property('name')
    expect(contract.name).to.be.equal('CompanyX')
  })

  it('Debe crear las asociaciones 1:M y soportar scopes en asociacion', async function () {
    await this.testUser.updateAssoc({
      model: this.models.Address,
      as: 'addresses',
      values: [
        { street: 'street3' },
        { street: 'street4' },
        { street: 'street5' }
      ]
    })
    let addresses = await this.testUser.getAddresses()
    expect(addresses).to.have.length(5)
    expect(_.map(addresses,'entity')).to.have.members(['USER','USER','USER','USER','USER'])
  })

  it('Debe crear las asociaciones M:N junto con sus atributos adicionales', async function(){
    let user = await this.testUser.updateAssoc({
      model: this.models.Property,
      as: 'properties',
      values: [{
        name: 'userProp3',
        UserProperty: {  value: 'value1' }
      }]
    })
    let properties = await this.testUser.getProperties({ where: { name: 'userProp3' }})
    expect(properties).to.have.length(1)
    expect(properties[0].UserProperty.value).to.be.equal('value1')
  })

  it('Debe actualizar las asociaciones M:N junto con sus atributos de asociacion', async function(){
    let properties = await this.testUser.getProperties()
    await this.testUser.updateAssoc({
      model: this.models.Property,
      as: 'properties',
      values: [
        {
          id: properties[0].id,
          name: 'nameChanged',
          UserProperty: {  value: 'valueChanged' }
        },
        {
          id: properties[1].id,
          name: 'nameChanged',
          UserProperty: {  value: 'valueChanged' }
        }
      ]
    })

    properties = await this.testUser.getProperties()
    expect(properties).to.have.length(2)
    expect(properties[0].name).to.be.equal('nameChanged')
    expect(properties[1].name).to.be.equal('nameChanged')
    expect(properties[0].UserProperty.value).to.be.equal('valueChanged')
    expect(properties[1].UserProperty.value).to.be.equal('valueChanged')
  })

  it('Debe actualizar solo los campos que cambiaron', async function(){
    await this.testUser.updateAssoc({
      model: this.models.Property,
      as: 'properties',
      values: [
        { id: 1, name: 'nameChanged' }
      ]
    })
    let properties = await this.testUser.getProperties({ where: {id: 1} })
    expect(properties).to.have.length(1)
    expect(properties[0].name).to.be.equal('nameChanged')
    expect(properties[0].internal).to.be.ok //Debe conservar su valor, no debe aplicar el default de la columna!
  })

  it('Debe funcionar en series de actualizaciones donde una depende de la otra', async function () {

    let tx = await this.sequelize.transaction({autocommit: false})
    await this.testUser.updateAssoc({
      as: 'contract',
      model: this.models.Contract,
      values: { id: 1 }  //Eliminamos el contrato actual
    })
    await this.testUser.updateAssoc({
      as: 'contract',
      model: this.models.Contract,
      values: { name: 'New Company' } //Creamos un nuevo contrato
    })
    let contract = await this.testUser.getContract()
    await contract.updateAssoc({
      as: 'details',
      model: this.models.ContractDet,
      values: { desc: 'Future is now' } //Creamos un nuevo detalle del contrato
    })
    let contracts = await this.models.Contract.findAll()

    expect(contracts).to.have.length(1)

    contract = await this.testUser.getContract({
      include:[{
        model: this.models.ContractDet,
        as: 'details'
      }]
    })
    tx.commit()

    expect(contract).to.be.ok
    expect(contract.name).to.be.equal('New Company')
    expect(contract.details).to.be.ok
    expect(contract.details.desc).to.be.equal('Future is now')
  })

  it('Debe fallar al actualizar las asociaciones debido a que no existe el "target" en DB ( opts.checkRelated = true )', async function(){

      //M:1
      await this.testUser.updateAssoc({
        model: this.models.Contract,
        as: 'contract',
        values: { id: 99, name: 'CompanyX' }
      })
      .should.be.rejectedWith(/No existe relacion/)


      //M:N
      let contractProp = await this.models.Property.find({ where: { name: 'contractProp' }})
      await this.testUser.updateAssoc({
        model: this.models.Property,
        as: 'properties',
        values: {
          id: contractProp.id,
          name: 'nameChanged',
          UserProperty: {  value: 'valueChanged' }
        }
      })
        .should.be.rejectedWith(/No existe relacion/)
  })

  it('Debe actualizar la asociacion M:N creando una nueva relacion de no existir si opts.checkRelated = false', async function(){
    let prop = await this.models.Property.create({name: 'unrelatedProperty'})
    await this.testUser.updateAssoc({
      model: this.models.Property,
      as: 'properties',
      values: [{
        id: prop.id,
        name: 'propertyRelated', //We can update the property name...
        UserProperty: {  value: 'valueX' } //...and create the relation at once.
      }],
      checkRelated: false //Disabling the check for relation existence
    })
    let properties = await this.testUser.getProperties()

    expect(properties).to.have.length(3)
    expect(_.find(properties, {name: 'propertyRelated'})).to.be.ok
  })

  it('Debe fallar al actualizar la asociacion M:N debido a que no existe la relacion si opts.checkRelated = true', async function(){
    let prop = await this.models.Property.create({name: 'unrelatedProperty'})
    await this.testUser.updateAssoc({
      model: this.models.Property,
      as: 'properties',
      values: [{
        id: prop.id,
        name: 'propertyRelated', //We can update the property name...
        UserProperty: {  value: 'valueX' } //...and create the relation at once.
      }],
      checkRelated: true //Enabling the check for relation existence
    })
      .should.be.rejectedWith(/No existe relacion/)
  })

  it('Debe soportar asociaciones con scope', async function() {
    let prop = await this.models.Property.create({name: 'unrelatedProperty'})
    await this.testUser.updateAssoc({
      model: this.models.Property,
      as: 'properties',
      values: [{
        id: prop.id,
        name: 'propertyRelated', //We can update the property name...
        UserProperty: {  value: 'valueX' } //...and create the relation at once.
      }],
      checkRelated: true //Enabling the check for relation existence
    })
    .should.be.rejectedWith(/No existe relacion/)
  })
})
