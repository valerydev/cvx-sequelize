/* jshint indent: 2 */
_ = require('lodash');

module.exports = function(sequelize, Sequelize) {

  var fn  = Sequelize.fn;
  var col = Sequelize.col;
  var literal = Sequelize.literal;
  var models = sequelize.models;

  return [{
    id: {},
    contractId: {},
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    code: {},
    password: {},
    fullName: {},
    email: {},
    securityQuestion: {},
    securityAnswer: {},
    type: {},
    profileId: {},
    ocuppationId: {},
    visibilityScope: {},
    active: {},
    securityQuestion2: {},
    securityAnswer2: {},
    allowedIPs: {},
    address: {},
    countryId: {},
    stateId: {},
    cityId: {},
    subLocationId1: {},
    subLocationId2: {},
    photoId: {},
    connectionScheduleId: {},
    disabledMenus: {}
  },{

    getterMethods: {
      cascadeProperties: function() {
        return _.unionBy(this.properties, (this.profile||{}).properties, (this.contract||{}).properties, 'code');
      },

      isRoot: function(){
        return this.id == (this.get('contract') || {}).mainUserId;
      }
    },

    classMethods: {
      associate: function () {
        this.belongsTo(models.Contract, { as: 'contract', foreignKey: 'contrato_correlativo' });
        this.belongsTo(models.Branch,   { as: 'branch',   foreignKey: 'sucursal_correlativo' });
        this.belongsTo(models.Image,    { as: 'photo',    foreignKey: 'foto_correlativo'     });
        this.belongsTo(models.Profile,  { as: 'profile',  foreignKey: 'perfil_correlativo'   });
        this.belongsTo(models.BranchClassifier,   { as: 'classifier1', foreignKey: 'clasificacion_1_correlativo' });
        this.belongsTo(models.BranchClassifier,   { as: 'classifier2', foreignKey: 'clasificacion_2_correlativo' });
        this.belongsTo(models.BranchClassifier,   { as: 'classifier3', foreignKey: 'clasificacion_3_correlativo' });
        this.belongsTo(models.ConnectionSchedule, { as: 'connectionSchedule', foreignKey: 'horario_conexion_correlativo' });
        this.belongsToMany( models.Property, {
          through: models.UserProperty,
          as: 'properties',
          foreignKey: 'usuario_correlativo',
          otherKey: 'propiedad_correlativo'
        });

      },

      findUserWithSessionInfo: function(email) {
        return this.scope( 'sessionInfo2' ).findAll({ where: { email: email }}).then(function(res){
          var user = res[0];
          if(!user) return user;

          user = JSON.parse(JSON.stringify(user));

          user = _.pick(user, ['password', 'code', 'contract', 'contractId', 'branch', 'branchId', 'profile',
            'profileId', 'classifier1', 'classifier2', 'classifier3', 'classifierId1', 'classifierId2',
            'classifierId3', 'email', 'fullName', 'photo', 'cascadeProperties', 'disabledMenus',
            'connectionScheduleId']);

          user.contract    = _.pick(user.contract,    ['logo', 'disabledMenus']);
          user.profile     = _.pick(user.profile,     ['name', 'disabledMenus']);
          user.branch      = _.pick(user.branch,      ['name']);
          user.classifier1 = _.pick(user.classifier1, ['name']);
          user.classifier2 = _.pick(user.classifier2, ['name']);
          user.classifier3 = _.pick(user.classifier3, ['name']);
          user.properties = user.cascadeProperties.map(function(prop){
            return _.pick(prop, ['id', 'code', 'parentCode', 'defaultValue', 'value']);
          });
          delete user.cascadeProperties;

          var currencyId = (_.find(user.properties, {code: 1})||{}).value;

          if(currencyId != undefined) {
              return models.Currency.findById(currencyId).then(function (currency) {
                user.currsym = currency.symbol;
                return user;
              })
          } else {
            return user;
          }
        });
      }
    },

    scopes: {

      cascadingProperties: function() {
        var Property  = sequelize.models.Property;
        var PropertyCategory = sequelize.models.PropertyCategory;
        var Contract  = sequelize.models.Contract;
        var Profile   = sequelize.models.Profile;

        return {
          include: [
            {
              model: Property,
              as: 'properties',
              required: false,
              include: [
                {
                  model: PropertyCategory,
                  as: 'category',
                  required: false
                }
              ]
            },
            {
              model: Contract,
              as: 'contract',
              require: true,
              include: [
                {
                  model: Property,
                  as: 'properties',
                  required: true,
                  include: [
                    {
                      model: PropertyCategory,
                      as: 'category',
                      required: true
                    }
                  ]
                }
              ]
            },
            {
              model: Profile,
              as: 'profile',
              required: true,
              include: [
                {
                  model: Property,
                  as: 'properties',
                  required: false,
                  include: [
                    {
                      model: PropertyCategory,
                      as: 'category',
                      required: false
                    }
                  ]
                }
              ]
            }
          ]
        }
      },

      sessionInfo: function() {

        var Profile =   sequelize.models.Profile;
        var Branch =   sequelize.models.Branch;
        var BranchClassifier = sequelize.models.BranchClassifier;

        return {
          include: [
            {
              model: Profile, as: 'profile',
              required: false,
              attributes: {
                include: [
                  [fn('COALESCE', col('profile.correlativo'), 0), 'id'],
                  [fn('COALESCE', col('profile.nombre'), ''), 'name']
                ],
                exclude: Object.keys(Profile.rawAttributes)
              }
            },
            {
              model: Branch, as: 'branch',
              required: false,
              attributes: {
                include: [
                  [fn('COALESCE', col('branch.correlativo'), 0), 'id'],
                  [fn('COALESCE', col('branch.nombre'), ''), 'name']
                ],
                exclude: Object.keys(Branch.rawAttributes)
              }
            },
            {
              model: BranchClassifier, as: 'classifier1',
              required: false,
              attributes: {
                include: [
                  [fn('COALESCE', col('classifier1.correlativo'), 0), 'id'],
                  [fn('COALESCE', col('classifier1.nombre'), ''), 'name']
                ],
                exclude: Object.keys(BranchClassifier.rawAttributes)
              },
              where: {level: 1}
            },
            {
              model: BranchClassifier, as: 'classifier2',
              required: false,
              attributes: {
                include: [
                  [fn('COALESCE', col('classifier2.correlativo'), 0), 'id'],
                  [fn('COALESCE', col('classifier2.nombre'), ''), 'name']
                ],
                exclude: Object.keys(BranchClassifier.rawAttributes)
              },
              where: {level: 2}
            },
            {
              model: BranchClassifier, as: 'classifier3',
              required: false,
              attributes: {
                include: [
                  [fn('COALESCE', col('classifier3.correlativo'), 0), 'id'],
                  [fn('COALESCE', col('classifier3.nombre'), ''), 'name']
                ],
                exclude: Object.keys(BranchClassifier.rawAttributes)
              },
              where: {level: 3}
            }
          ]
        }
      },

      sessionInfo2: function() {

        var Profile  = models.Profile;
        var Image    = models.Image;
        var Branch   = models.Branch;
        var Property = models.Property;
        var Contract = models.Contract;
        var BranchClassifier = models.BranchClassifier;
        var PropertyCategory = models.PropertyCategory;

        return {
          include: [
            {
              model: Image,
              as: 'photo',
              required: false
            },
            {
              model: Property,
              as: 'properties',
              required: false,
              attributes: ['id', 'code', 'parentCode', 'defaultValue', 'name'],
              include: [
                {
                  model: PropertyCategory,
                  as: 'category',
                  required: false,
                  attributes: ['id', 'name']
                }
              ]
            },
            {
              model: Contract,
              as: 'contract',
              require: true,
              include: [
                {
                  model: Image,
                  as: 'logo',
                  required: false
                },
                {
                  model: Property,
                  as: 'properties',
                  required: true,
                  attributes: ['id', 'code', 'parentCode', 'defaultValue', 'name'],
                  include: [
                    {
                      model: PropertyCategory,
                      as: 'category',
                      required: true,
                      attributes: ['id', 'name']
                    }
                  ]
                }
              ]
            },
            {
              model: Profile,
              as: 'profile',
              required: false,
              attributes: {
                include: ['code',
                  [fn('COALESCE', col('profile.correlativo'), 0), 'id'],
                  [fn('COALESCE', col('profile.nombre'), ''), 'name']
                ]
              },
              include: [
                {
                  model: Property,
                  as: 'properties',
                  required: false,
                  attributes: ['id', 'code', 'parentCode', 'defaultValue', 'name'],
                  include: [
                    {
                      model: PropertyCategory,
                      as: 'category',
                      required: false,
                      attributes: ['id', 'name']
                    }
                  ]
                }
              ]
            },
            {
              model: Branch, as: 'branch',
              required: false,
              attributes: {
                include: [
                  [fn('COALESCE', col('branch.correlativo'), 0), 'id'],
                  [fn('COALESCE', col('branch.nombre'), ''), 'name']
                ]
              }
            },
            {
              model: BranchClassifier, as: 'classifier1',
              required: false,
              attributes: {
                include: [
                  [fn('COALESCE', col('classifier1.correlativo'), 0), 'id'],
                  [fn('COALESCE', col('classifier1.nombre'), ''), 'name']
                ]
              },
              where: {level: 1}
            },
            {
              model: BranchClassifier, as: 'classifier2',
              required: false,
              attributes: {
                include: [
                  [fn('COALESCE', col('classifier2.correlativo'), 0), 'id'],
                  [fn('COALESCE', col('classifier2.nombre'), ''), 'name']
                ]
              },
              where: {level: 2}
            },
            {
              model: BranchClassifier, as: 'classifier3',
              required: false,
              attributes: {
                include: [
                  [fn('COALESCE', col('classifier3.correlativo'), 0), 'id'],
                  [fn('COALESCE', col('classifier3.nombre'), ''), 'name']
                ]
              },
              where: {level: 3}
            }
          ]
        }
      }
    }
  }];
};