/* jshint indent: 2 */
var md5 = require('md5');

module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;
  var Promise = Sequelize.Promise;

  return [{
    id: {},
    contractId: {},
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    password: {
      get: function(){
        return !this.getDataValue('password') ? '' : this.getDataValue('password');
      },
      set: function(val){
        this.setDataValue('password', md5(val));
      }
    },
    fullName: {},
    email: {},
    securityQuestion1: {},
    securityAnswer1: {
      get: function(){
        return !this.getDataValue('securityAnswer1') ? '' : this.getDataValue('securityAnswer1');
      },
      set: function(val){
        this.setDataValue('securityAnswer1', md5(val));
      }
    },
    securityQuestion2: {},
    securityAnswer2: {
      get: function(){
        return !this.getDataValue('securityAnswer2') ? '' : this.getDataValue('securityAnswer2');
      },
      set: function(val){
        this.setDataValue('securityAnswer2', md5(val));
      }
    },
    type: {},
    profileId: {},
    ocuppationId: {},
    visibilityScope: {},
    active: {},
    allowedIPs: {},
    address: {},
    countryId: {},
    stateId: {},
    cityId: {},
    subLocationId1: {},
    subLocationId2: {},
    photoId: {},
    connectionScheduleId: {},
    disabledMenus: {
      get: function(){
        var value = this.getDataValue('disabledMenus');
        return !value ? [] : JSON.parse('[' + value + ']');
      },
      set: function(val){
        if(val instanceof Array) {
          this.setDataValue('disabledMenus', JSON.stringify(val).slice(1, -1));
        } else {
          this.setDataValue('disabledMenus', val);
        }
      }
    }
  },{

    classMethods: {
      associate: function () {
        this.belongsTo(models.Contract, { as: 'contract', foreignKey: 'contrato_correlativo' });
        this.belongsTo(models.Branch,   { as: 'branch',   foreignKey: 'sucursal_correlativo' });
        this.belongsTo(models.Image,    { as: 'photo',    foreignKey: 'foto_correlativo'     });
        this.belongsTo(models.Profile,  { as: 'profile',  foreignKey: 'perfil_correlativo'   });
        this.belongsTo(models.BranchClassifier,   { as: 'classifier1', foreignKey: 'clasificacion_1_correlativo' });
        this.belongsTo(models.BranchClassifier,   { as: 'classifier2', foreignKey: 'clasificacion_2_correlativo' });
        this.belongsTo(models.BranchClassifier,   { as: 'classifier3', foreignKey: 'clasificacion_3_correlativo' });
        this.belongsTo(models.ConnectionSchedule.scope('includeDetails'), { as: 'connectionSchedule', foreignKey: 'horario_conexion_correlativo' });
        this.belongsToMany(models.Property.scope('includeCategory'), {
          through: models.UserProperty,
          as: 'properties',
          foreignKey: {
            name: 'userId',
            field: 'usuario_correlativo'
          },
          otherKey: {
            name: 'propertyId',
            field: 'propiedad_correlativo'
          }
        });
      },
    },

    getterMethods: {
      cascadeProperties: function() {

        var userProperties = (this.properties||[]).map(prop => {
          return prop.get({plain:true});
        });
        var profileProperties  = ((this.profile||{}).properties||[]).map(prop => {
          prop = prop.get({plain:true});
          prop.UserProperty = prop.ProfileProperty;
          delete prop.ProfileProperty;
          return prop;
        });
        var contractProperties = ((this.contract||{}).properties||[]).map(prop => {
          prop = prop.get({plain:true});
          prop.UserProperty = prop.ContractProperty;
          delete prop.ContractProperty;
          return prop;
        });

        return _.orderBy(_.unionBy(userProperties, profileProperties, contractProperties, 'code'), 'code');
      },

      isRoot: function(){
        var contract = this.getDataValue('contract');
        return contract == undefined ? contract : this.id == contract.mainUserId;
      }
    },

    instanceMethods: {

      loadCRUDInfo: function(){
        return Promise.mapSeries([
          ()=> this.getPhoto(),
          ()=> this.getConnectionSchedule({scope: 'includeDetails'}),
          ()=> this.getProperties(),
          ()=> this.getContract({
                 scope: {
                   method: ['includeProperties', {
                     configurableByUser  : 'T',
                     customConfiguration : 'F'
                   }]
                 }
               }),
          ()=> this.getProfile({
                scope: {
                  method: ['includeProperties', {
                    configurableByUser  : 'T',
                    customConfiguration : 'F'
                  }]
                }
              }),
          ()=> this.getBranch({attributes: ['id', 'name']}),
          ()=> this.getClassifier1({attributes: ['id', 'name']}),
          ()=> this.getClassifier2({attributes: ['id', 'name']}),
          ()=> this.getClassifier3({attributes: ['id', 'name']})
        ],
        runPromise => runPromise() ).return(this);
      }
    },

    scopes: {
      includePhoto: function(where) {
        return {
          include: [{ model: models.Image, as: 'photo', required: false, where: where||{} }]
        }
      },

      includeProperties: function(where) {
        return {
          include: [{ model: models.Property.scope('includeCategory'), as: 'properties', required: false, where: where||{} }]
        }
      },

      includeProfile: function(where) {
        return {
          include: [{ model: models.Profile, as: 'profile', required: true, where: where||{} }]
        }
      },

      includeProfileWithProperties: function(where){
        return {
          include: [{
            model: models.Profile.scope({ method: ['includeProperties', where||{} ]}),
            as: 'profile', required: true
          }]
        }
      },

      includeContract: function(where) {
        return {
          include: [{ model: models.Contract, as: 'contract', required: true, where: where||{} }]
        }
      },

      includeContractWithProperties: function(where){
        return {
          include: [{
            model: models.Contract.scope({ method: ['includeProperties', where||{} ]}) ,
            as: 'contract',
            required: true
          }]
        }
      },

      includeAllProperties: function(where) {
        var self = models.User.options.scopes;
        return {
          include: [
            self.includeProperties(where).include[0],
            self.includeContractWithProperties(where).include[0],
            self.includeProfileWithProperties(where).include[0]
          ]
        }
      },

      sessionInfo: function() {

        var Profile  = models.Profile;
        var Branch   = models.Branch;
        var Contract = models.Contract;
        var BranchClassifier = models.BranchClassifier;
        var self     = models.User.options.scopes;

        return {
          include: [
            self.includePhoto().include[0],
            self.includeProperties().include[0],
            {
              model: Contract.scope('includeProperties', 'includeLogo'),
              as: 'contract',
              require: true
            },
            {
              model: Profile.scope('selectNameNotNull', 'includeProperties'),
              as: 'profile',
              required: false
            },
            {
              model: Branch.scope('selectNameNotNull'),
              as: 'branch',
              required: false
            },
            {
              model: BranchClassifier,//.scope([{ method: ['selectNameNotNull', 1] }]),
              as: 'classifier1',
              required: false
            },
            {
              model: BranchClassifier,//.scope([{ method: ['selectNameNotNull', 2] }]),
              as: 'classifier2',
              required: false
            },
            {
              model: BranchClassifier,//.scope([{ method: ['selectNameNotNull', 3] }]),
              as: 'classifier3',
              required: false
            }
          ]
        }
      }
    }
  }];
};