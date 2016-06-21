var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var chaiAsPromised = require("chai-as-promised");
var chaiSpies = require("chai-spies");
var assert = chai.assert;
var expect = chai.expect;
chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiSpies);

var Sequelize = require('sequelize');
var _         = Sequelize.Utils._;
var Promise   = Sequelize.Promise;
var validator = Sequelize.Validator;
var assocUpdates = require('../../sequelize-plugins/sequelize-association-updates');

beforeEach(function(done){
  this.timeout(0);
  var self = this;

  var sq = this.sequelize = new Sequelize(null,null,null,{
    dialect: 'sqlite',
    define: { timestamps: false, freezeTableName: true },
    logging: null//console.log
  });

  assocUpdates(sq);

  var models = this.models = {
    Address         : sq.define('Address'         , {
                                                      street: Sequelize.STRING,
                                                      entity: {
                                                        field: 'entidad',
                                                        type: Sequelize.STRING,
                                                        allowNull: false
                                                      }
                                                    }),
    User            : sq.define('User'            , { name  : Sequelize.STRING  }),
    Contract        : sq.define('Contract'        , { name  : Sequelize.STRING  }),
    ContractDet     : sq.define('ContractDet'     , { desc  : Sequelize.STRING  }),
    Profile         : sq.define('Profile'         , { name  : Sequelize.STRING  }),
    UserProperty    : sq.define('UserProperty'    , { value : Sequelize.STRING  }),
    ProfileProperty : sq.define('ProfileProperty' , { value : Sequelize.STRING  }),
    ContractProperty: sq.define('ContractProperty', { value : Sequelize.STRING  }),
    Property        : sq.define('Property', {
      name  : Sequelize.STRING,
      internal: {
        type: Sequelize.BOOLEAN,
        default: false
      }
    })
  };

  //M:1
  models.User.belongsTo    ( models.Contract    , { as: 'contract', foreignKey: { name: 'contractId', allowNull: true  }});
  models.Contract.hasOne   ( models.ContractDet , { as: 'details' , foreignKey: { name: 'contractId', allowNull: false }});
  models.Profile.belongsTo ( models.Contract    , { as: 'contract', foreignKey: { name: 'contractId', allowNull: true  }});
  models.User.belongsTo    ( models.Profile     , { as: 'profile' , foreignKey: { name: 'profileId' , allowNull: true  }});

  //1:M
  models.User.hasMany      ( models.Address     , { as: 'addresses',foreignKey: { name: 'entityId'  , allowNull: false }, scope:{ entity: 'USER' }});

  //M:N
  models.User.belongsToMany    ( models.Property, {
    through: models.UserProperty,
    as: 'properties',
    foreignKey: { name: 'userId'     },
    otherKey  : { name: 'propertyId' }
  });
  models.Profile.belongsToMany ( models.Property, {
    through: models.ProfileProperty,
    as: 'properties',
    foreignKey: { name: 'profileId'  },
    otherKey  : { name: 'propertyId' }
  });
  models.Contract.belongsToMany( models.Property, {
    through: models.ContractProperty,
    as: 'properties',
    foreignKey: { name: 'contractId' },
    otherKey  : { name: 'propertyId' }
  });

  sq.sync({logging: null}).then(function(){
    return models.User.create({
       name: 'Raul Contreras',
       contract: { name: 'Kepen' },
       profile:  { name: 'Admin' },
       addresses: [
         { street: 'street1', entity: 'USER' },
         { street: 'street2', entity: 'USER' }
       ]}, { include:{ all:true }
    }).then( user => {
      return Promise.mapSeries([
          ()=> user.createProperty({ name: 'userProp1',  internal: true }, { value: 'value1' }),
          ()=> user.createProperty({ name: 'userProp2',  internal: true }, { value: 'value2' }),
          ()=> user.profile.createProperty ({ name: 'profileProp' }, { value: 'value1' }),
          ()=> user.contract.createProperty({ name: 'contractProp'}, { value: 'value1' })
        ],
        runPromise => runPromise()).then(()=> self.currUser = user).then(()=> done());
    });
  });
});

describe('sequelize-association-updates', function() {

  it('Debe crear la asociacion M:1', function (done) {
    this.timeout(0);

    return this.currUser.updateAssoc({
      model: this.models.Contract,
      as: 'contract',
      values: { name: 'CompanyX' }
    })
    .then(user => user.getContract())
    .then(contract => {

      expect(contract).to.be.ok;
      expect(contract).to.have.property('name');
      expect(contract.name).to.be.equal('CompanyX');
      done();

    }).catch(err => done(err));
  });

  it('Debe crear las asociaciones 1:M y soportar scopes en asociacion', function (done) {
    this.timeout(0);
    return this.currUser.updateAssoc({
      model: this.models.Address,
      as: 'addresses',
      values: [
        { street: 'street3' },
        { street: 'street4' },
        { street: 'street5' }
      ]
    })
    .then(user => user.getAddresses())
    .then(addresses => {
      expect(addresses).to.have.length(5);
      expect(_.map(addresses,'entity')).to.have.members(['USER','USER','USER','USER','USER']);
      done();

    }).catch(err => done(err));
  });

  it('Debe crear las asociaciones M:N junto con sus atributos adicionales', function(done){
    this.timeout(0);

    return this.currUser.updateAssoc({
      model: this.models.Property,
      as: 'properties',
      values: [{
        name: 'userProp3',
        UserProperty: {  value: 'value1' }
      }]
    })
    .then(user => user.getProperties({where: {name: 'userProp3'}}))
    .then(properties => {

      expect(properties).to.have.length(1);
      expect(properties[0].UserProperty.value).to.be.equal('value1');
      done();

    }).catch(err => done(err));
  });

  it('Debe actualizar las asociaciones M:N junto con sus atributos adicionales', function(done){
    this.timeout(0);

    return this.currUser.getProperties().bind(this)
      .then(properties => {
        return this.currUser.updateAssoc({
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
        });
      })
      .then(user => user.getProperties())
      .then(properties => {

        expect(properties).to.have.length(2);
        expect(properties[0].name).to.be.equal('nameChanged');
        expect(properties[1].name).to.be.equal('nameChanged');
        expect(properties[0].UserProperty.value).to.be.equal('valueChanged');
        expect(properties[1].UserProperty.value).to.be.equal('valueChanged');
        done();

      }).catch(err => done(err));
  });

  it('Debe actualizar solo los campos que cambiaron', function(done){
    this.timeout(0);

    return this.currUser.updateAssoc({
      model: this.models.Property,
      as: 'properties',
      values: [
        {
          id: 1,
          name: 'nameChanged'
        }
      ]
    })
    .then(user => user.getProperties({ where: {id: 1} }))
    .then(properties => {

      expect(properties).to.have.length(1);
      expect(properties[0].name).to.be.equal('nameChanged');
      expect(properties[0].internal).to.be.ok; //Debe conservar su valor, no debe aplicar el default de la columna!
      done();

    }).catch(err => done(err));
  });

  it('Debe funcionar en series de actualizaciones donde una depende de la otra', function (done) {
    this.timeout(0);

    var user = this.currUser;
    var models = this.models;
    var sequelize = this.sequelize;

    return sequelize.transaction({autocommit: false}, tx => {
      return Promise.mapSeries([
        ()=> user.updateAssoc({
               as: 'contract',
               model: models.Contract,
               values: { id: 1 }  //Eliminamos el contrato actual
             }),
        ()=> user.updateAssoc({
               as: 'contract',
               model: models.Contract,
               values: { name: 'New Company' } //Creamos un nuevo contrato
             }),
        ()=> user.getContract().then( contract => {
               return !contract ? contract : contract.updateAssoc({
                 as: 'details',
                 model: models.ContractDet,
                 values: { desc: 'Future is now' } //Creamos un nuevo detalle del contrato
               });
             })
      ], runPromise => runPromise() )

      .then(()=> models.Contract.findAll().then( contracts => expect(contracts).to.have.length(1)))

      .then(() => user.getContract({
        include:[{
          model: models.ContractDet,
          as: 'details'
        }]
      }))
      .then(contract => {

        expect(contract).to.be.ok;
        expect(contract.name).to.be.equal('New Company');
        expect(contract.details).to.be.ok;
        expect(contract.details.desc).to.be.equal('Future is now');
        done();

      });
    }).catch(err => done(err));
  });

  it('Debe fallar al actualizar las asociaciones debido a que no existe el "target" en DB ( opts.checkRelated = true )', function(done){
    this.timeout(0);

    return Promise.mapSeries([

      //M:1
      ()=> this.currUser.updateAssoc({
             model: this.models.Contract,
             as: 'contract',
             values: { id: 99, name: 'CompanyX' }
           })
           .should.be.rejectedWith(/No existe relacion/),


      //M:N
      ()=> this.models.Property.find({where: { name: 'contractProp' }}).bind(this).then( contractProp => {
             return this.currUser.updateAssoc({
               model: this.models.Property,
               as: 'properties',
               values: {
                 id: contractProp.id,
                 name: 'nameChanged',
                 UserProperty: {  value: 'valueChanged' }
               }
             });
           })
           .should.be.rejectedWith(/No existe relacion/)

    ], runPromise => runPromise()).should.notify(done);
  });

  it('Debe actualizar la asociacion M:N creando una nueva relacion de no existir si opts.checkRelated = false', function(done){
    this.timeout(0);

    this.models.Property.create({name: 'unrelatedProperty'}).then(prop => {
      return this.currUser.updateAssoc({
        model: this.models.Property,
        as: 'properties',
        values: [{
          id: prop.id,
          name: 'propertyRelated', //We can update the property name...
          UserProperty: {  value: 'valueX' } //...and create the relation at once.
        }],
        checkRelated: false //Disabling the check for relation existence
      });
    })
    .then(user => user.getProperties())
    .then(properties => {

      expect(properties).to.have.length(3);

      expect(_.find(properties, {name: 'propertyRelated'})).to.be.ok;
      done();

    }).catch(err => done(err));
  });

  it('Debe fallar al actualizar la asociacion M:N debido a que no existe la relacion si opts.checkRelated = true', function(done){
    this.timeout(0);

    this.models.Property.create({name: 'unrelatedProperty'}).then(prop => {
      return this.currUser.updateAssoc({
        model: this.models.Property,
        as: 'properties',
        values: [{
          id: prop.id,
          name: 'propertyRelated', //We can update the property name...
          UserProperty: {  value: 'valueX' } //...and create the relation at once.
        }],
        checkRelated: true //Enabling the check for relation existence
      })
      .should.be.rejectedWith(/No existe relacion/).notify(done);;
    });
  });

  it('Debe soportar asociaciones con scope', function(done) {
    this.timeout(0);

    this.models.Property.create({name: 'unrelatedProperty'}).then(prop => {
      return this.currUser.updateAssoc({
        model: this.models.Property,
        as: 'properties',
        values: [{
          id: prop.id,
          name: 'propertyRelated', //We can update the property name...
          UserProperty: {  value: 'valueX' } //...and create the relation at once.
        }],
        checkRelated: true //Enabling the check for relation existence
      })
        .should.be.rejectedWith(/No existe relacion/).notify(done);;
    });
  });

});
