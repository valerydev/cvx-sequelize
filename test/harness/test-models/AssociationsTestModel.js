module.exports = function( sq, DataTypes ){
  let models = {
    Address: sq.define('Address', {
      street: DataTypes.STRING,
      entity: {
        field: 'entidad',
        type: DataTypes.STRING,
        allowNull: false
      }
    }),
    User            : sq.define('User'            , { name  : DataTypes.STRING  }),
    Contract        : sq.define('Contract'        , { name  : DataTypes.STRING  }),
    ContractDet     : sq.define('ContractDet'     , { desc  : DataTypes.STRING  }),
    Profile         : sq.define('Profile'         , { name  : DataTypes.STRING  }),
    UserProperty    : sq.define('UserProperty'    , { value : DataTypes.STRING  }),
    ProfileProperty : sq.define('ProfileProperty' , { value : DataTypes.STRING  }),
    ContractProperty: sq.define('ContractProperty', { value : DataTypes.STRING  }),
    Property        : sq.define('Property', {
      name  : DataTypes.STRING,
      internal: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    })
  }

  //M:1
  models.User.belongsTo    ( models.Contract    , { as: 'contract', foreignKey: { name: 'contractId', allowNull: true  }})
  models.Contract.hasOne   ( models.ContractDet , { as: 'details' , foreignKey: { name: 'contractId', allowNull: false }})
  models.Profile.belongsTo ( models.Contract    , { as: 'contract', foreignKey: { name: 'contractId', allowNull: true  }})
  models.User.belongsTo    ( models.Profile     , { as: 'profile' , foreignKey: { name: 'profileId' , allowNull: true  }})

  //1:M
  models.User.hasMany      ( models.Address     , { as: 'addresses',foreignKey: { name: 'entityId'  , allowNull: false }, scope:{ entity: 'USER' }})

  //M:N
  models.User.belongsToMany    ( models.Property, {
    through: models.UserProperty,
    as: 'properties',
    foreignKey: { name: 'userId'     },
    otherKey  : { name: 'propertyId' }
  })
  models.Profile.belongsToMany ( models.Property, {
    through: models.ProfileProperty,
    as: 'properties',
    foreignKey: { name: 'profileId'  },
    otherKey  : { name: 'propertyId' }
  })
  models.Contract.belongsToMany( models.Property, {
    through: models.ContractProperty,
    as: 'properties',
    foreignKey: { name: 'contractId' },
    otherKey  : { name: 'propertyId' }
  })
  return models
}
