module.exports = function(sq, DataTypes) {
  let models = {
    Target: sq.define('Target', {
      type: DataTypes.STRING,
      threadType: {
        field: 'thread',
        type: DataTypes.STRING,
        allowNull: false
      }
    }),
    Soldier         : sq.define('Soldier'       , { name   : DataTypes.STRING }),
    Tank            : sq.define('Tank'          , { model  : DataTypes.STRING }),
    Aircraft        : sq.define('Aircraft'      , { model  : DataTypes.STRING }),
    AircraftTarget  : sq.define('AircraftTarget', { model  : DataTypes.STRING,
      threadType: {
        field: 'thread',
        type: DataTypes.STRING,
        allowNull: false
      }
    }),
  }
  models.Soldier.hasOne( models.Target  , { as: 'target',  foreignKey: { name: 'threadId'  , allowNull: false }, scope:{ threadType: 'SOLDIER' }})
  models.Tank.hasMany  ( models.Target  , { as: 'targets', foreignKey: { name: 'threadId'  , allowNull: false }, scope:{ threadType: 'TANK'    }})
  models.Aircraft.belongsToMany ( models.Target  , {
    as: 'targets',
    foreignKey: { name: 'aircraftId'     },
    otherKey  : { name: 'targetId'       },
    scope     : { threadType: 'AIRCRAFT' },
    through: {
      model: models.AircraftTarget,
      scope: { threadType: 'AIRCRAFT'    }
    }
  })
  return models
}
