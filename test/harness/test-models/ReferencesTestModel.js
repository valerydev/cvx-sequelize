module.exports = function( sq, DataTypes ){
  let models = {
    User: sq.define('User' , {
      name       : DataTypes.STRING,
      contractId : {
        type     : DataTypes.INTEGER,
        references: {
          model: 'Contract',
          key  : 'id'
        }
      }
    }),
    Contract: sq.define('Contract', {
      id: {
        type      : DataTypes.INTEGER,
        field     : 'correlative',
        primaryKey: true
      },
      name: DataTypes.STRING
    }, {
      tableName: 'dat_contract'
    })
  }

  models.User.belongsTo( models.Contract, { as: 'contract', foreignKey: { name: 'contractId', allowNull: true  }})
  return models
}
