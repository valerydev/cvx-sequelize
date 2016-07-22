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
    scheduleId: {
      field: 'horario_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    weekDay: {
      field: 'dia_semana',
      type: DataTypes.INTEGER(6),
      allowNull: true,
      validate: {

      }
    },
    startTime: {
      field: 'hora_desde',
      type: DataTypes.TIME,
      allowNull: true,
      validate: {

      }
    },
    endTime: {
      field: 'hora_hasta',
      type: DataTypes.TIME,
      allowNull: true,
      validate: {

      }
    }
  },{
    tableName: 'cfg_horario_conexion_detalles',
    validate: {

    }
  }];
};
