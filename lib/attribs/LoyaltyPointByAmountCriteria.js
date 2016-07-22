/* jshint indent: 2 */
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
    criteriaId: {
      field: 'criterio_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_fid_criterios_puntos',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    countryId: {
      field: 'pais_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'sys_paises',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    currencyId: {
      field: 'moneda_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'monedas',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    amount: {
      field: 'monto',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    points: {
      field: 'puntos',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    }
  },{
    tableName: 'dat_fid_criterios_puntos_monto',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
