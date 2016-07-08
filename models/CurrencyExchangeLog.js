module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    exchangeId: {},
    createdAt: {},
    factor: {},
    value: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo( models.CurrencyExchange, { as: 'exchange', foreignKey: 'conversion_correlativo' });
      },

      /**
       * Crea en BD el registro historico de las "conversiones de moneda" resultantes del calculo de tasas de cambio.
       * Con esta consulta se busca optimizar el procesamiento de conversiones evitando una busqueda por separado
       * para obtener el correlativo de la conversion recien creada (mediante un upsert de sequelize) ya que no es
       * posible (al menos no en MySQL) obtener el correlativo creado o actualizado luego de realizar el upsert.
       * En este caso colocamos en la propia consulta de insercion la subconsulta para obtener el valor del correlativo
       * de la conversion asociada, dejamos asi la optimizacion de esta consulta al SGBD.
       *
       * La desventaja de esta es que al crear una consulta directa se pierde la abstraccion del modelo que tenemos
       * en Sequelize, por lo que un cambio en BD no se soluciona solo actualizando el modelo sino que debemos
       * actualizar tambien esta consulta
       *
       * @param log El registro historico que se quiere insertar.
       * @returns {*}
       */
      insertLog: function (log) {
        var sqlite = sequelize.dialect.name === 'sqlite';
        return sequelize.query([
          "INSERT " + (sqlite?"OR":"") + " IGNORE INTO dat_monedas_conversion_historial(conversion_correlativo, fecha_hora, factor, valor_conversion)",
          "VALUES (",
          "  (",
          "    SELECT b.correlativo",
          "      FROM sys_monedas_conversion b",
          "     WHERE (b.correlativo_moneda_1 = ", log.currencyId1 + ")",
          "       AND (b.correlativo_moneda_2 = ", log.currencyId2 + ")",
          "  ),",
          "'"+log.createdAt+"',",
          log.factor + ",",
          log.value,
          ")"
        ].join(' '));
      }
    }
  }]
};
