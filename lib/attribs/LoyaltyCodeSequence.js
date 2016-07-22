module.exports = function(DataTypes) {
  return [{
    id: {
      field: 'correlativo',
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {

      }
    },
    contractId: {
      field: 'contrato_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      roles: {
        client: false
      },
      validate: {

      }
    },
    sequence: {
    field: 'ultimo_numero',
        type: DataTypes.INTEGER(6),
        allowNull: false,
        defaultValue: '0',
        validate: {

    }
  }
  },{
    tableName: 'dat_fid_contratos_consecutivo',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};

