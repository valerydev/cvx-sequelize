module.exports = function( sequelize ) {

  sequelize.addHook('afterDefine', function(model) {

    var _ = sequelize.Utils._;

    var modelDef = {};
    _.values(model.rawAttributes).forEach(attr => {

      var type = attr.type;
      var typeName = attr.type.key;
      typeName = typeName.replace(/DOUBLE PRECISION/, 'DOUBLE');

      modelDef[attr.fieldName] = {type: typeName};


      switch (typeName) {
        case 'INTEGER':
        case 'BIGINT':
        case 'BLOB':
          typeName += type._length >= 0 ? '(' + type._length + ')' : '';
          break;

        case 'DOUBLE':
        case 'FLOAT':
        case 'REAL':
          if (type._length >= 0) {
            typeName += '(' + type._length;
            typeName += type._decimals > 0 ? ',' + type._decimals : '';
            typeName += ')'
          }
          break;

        case 'DECIMAL':
          if (type._precision >= 0) {
            typeName += '(' + type._precision;
            typeName += type._scale > 0 ? ',' + type._scale : '';
            typeName += ')'
          }
          break;

        case 'STRING':
        case 'CHAR':
        case 'DATE':
          if (type._length >= 0) {
            typeName += '(' + type._length;
            typeName += type._binary !== undefined ? ',' + type._binary : '';
            typeName += ')'
          }
          break;

      }

      modelDef[attr.fieldName].type = typeName;

      _.extend(modelDef[attr.fieldName], _.pick(attr, 'allowNull', 'defaultValue'));

      var validations = _.clone(attr.validate) || {};
      for (var vName in validations) {
        var vArgs = validations[vName];

        if (_.isRegExp(vArgs)) {
          //Llevamos la expresion regular a su formato en arreglo
          var regExp = vArgs.source;
          var mods = vArgs.global ? 'g' : '' + vArgs.ignoreCase ? 'i' : '' + vArgs.multiline ? 'm' : '';
          validations[vName] = [regExp, mods];

        } else if (_.isFunction(vArgs)) {
          //No podemos enviar funciones al front
          delete validations[vName];

        }
      }
      modelDef[attr.fieldName].validate = validations;
    });

    sequelize.definitions = sequelize.definitions || {};
    sequelize.definitions[model.name] = modelDef;
    model.definition = modelDef;

  });
};