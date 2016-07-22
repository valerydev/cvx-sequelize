/* jshint indent: 2 */
module.exports = function(DataTypes) {
  return [{
    id: {
      field: 'correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contractId: {
      field: 'contrato_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'cfg_contratos',
      //  key: 'correlativo'
      //}
    },
    classifierId1: {
      field: 'clasificacion_1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //}
    },
    classifierId2: {
      field: 'clasificacion_2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //}
    },
    classifierId3: {
      field: 'clasificacion_3_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //}
    },
    branchId: {
      field: 'sucursal_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_sucursales',
      //  key: 'correlativo'
      //}
    },
    code: {
      field: 'codigo',
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    position: {
      field: 'posicion',
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    },
    aliquot: {
      field: 'alicuota',
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 1
    },
    exempt: {
      field: 'exento',
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'F'
    },
    applicableTo: {
      field: 'aplicable_a',
      type: DataTypes.CHAR(3),
      allowNull: true,
      defaultValue: 'BI'
    },
    countryId: {
      field: 'pais_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    stateId: {
      field: 'provincia_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    cityId: {
      field: 'ciudad_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    subLocationId1: {
      field: 'sublocalidad1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    subLocationId2: {
      field: 'sublocalidad2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    originId: {
      field: 'correlativo_origen',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      validate: {

      }
    },
    sessionId: {
      field: 'identificacion_origen',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    }

  }, {
    tableName: 'cfg_impuestos',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
