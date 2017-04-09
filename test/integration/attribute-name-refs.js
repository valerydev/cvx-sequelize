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

let Sequelize  = require('sequelize')
global.Promise = Sequelize.Promise
let _          = Sequelize.Utils._
let Promise    = Sequelize.Promise
let validator  = Sequelize.Validator
let modelFactory = require('../harness/test-models')
let sequelizeEvents = require('../../lib/sequelize-plugins/sequelize-events')
let attrNameRefs    = require('../../lib/sequelize-plugins/attribute-name-refs')


describe('attribute-name-refs', function(){
  it('Debe sustituir nombres de atributos por nombres de campo de BD en scopes de asociacion', function(){
    let models          = modelFactory.createScopesTestModel([attrNameRefs])
    let soldierTarget   = models.Soldier.associations.target
    let tankTargets     = models.Tank.associations.targets
    let aircraftTargets = models.Aircraft.associations.targets

    expect(soldierTarget.scope.thread).to.be.ok
    expect(tankTargets.scope.thread).to.be.ok
    expect(aircraftTargets.scope.thread).to.be.ok
    expect(aircraftTargets.through.scope.thread).to.be.ok
  })

  it('Debe sustituir nombres de modelos y atributos por nombres de tablas y campos de BD en referencias', function(){
    let models = modelFactory.createReferencesTestModel([sequelizeEvents, attrNameRefs])
    models.sequelize.emit('afterDefineAll', models)
    let references = models.User.attributes.contractId.references
    expect(references).to.eql({
      model: 'dat_contract',
      key  : 'correlative'
    })
  })
})

