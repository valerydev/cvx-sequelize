/**
 * Como su nombre dice, solo convierte en un sentido (hacia la base de datos),
 * convierte de Buffer, cadena en base64, o cadena en hexadecimal, a la sintaxis
 * requerida por MySQL.
 *
 * Nota: Puedes convertir en el otro sentido mediante getters
 *
 * @param sequelize Instancia de sequelize a extender
 */
module.exports = function(sequelize){
  var validator = sequelize.Sequelize.Validator;
  sequelize.Sequelize.BLOB.prototype.stringify = function(value, options) {
    if (!Buffer.isBuffer(value)) {
      if (Array.isArray(value)) {
        value = new Buffer(value);
      } else if(validator.isBase64(value)){
        value = new Buffer(value.toString(), 'base64');
      } else if(validator.isHexadecimal(value)) {
        value = new Buffer(value.toString(), 'hex');
      } else {
        value = new Buffer(value.toString());
      }
    }
    var hex = value.toString('hex');
    return "X'" + hex + "'";
  };
  sequelize.refreshTypes();
};
