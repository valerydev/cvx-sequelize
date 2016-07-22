/* jshint indent: 2 */
module.exports = function(DataTypes) {

  return [{
    id: {
      field: 'correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {

      }
    },
    userId: {
      field: 'usuario_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'cfg_usuarios',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    stationId: {
      field: 'estacion_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      //references: {
      //  model: 'cfg_estaciones',
      //  key: 'correlativo'
      //}
      validate: {

      }
    },
    deviceToken: {
      field: 'identificacion_dispositivo',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    logonAt: {
      field: 'fecha_hora_inicio',
      type: DataTypes.NOW,
      allowNull: false,
      validate: {

      }
    },
    ip: {
      field: 'ip',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    mac: {
      field: 'direccion_mac',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    logoffAt: {
      field: 'fecha_hora_cierre',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }
    },
    status: {
      field: 'estatus',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'A',
      validate: {

      }
    }
  }, {
    tableName: 'sys_sesiones',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
