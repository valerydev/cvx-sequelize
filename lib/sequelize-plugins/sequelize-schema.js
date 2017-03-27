module.exports = function( sequelize ) {

  var _ = sequelize.Utils._;

  Object.defineProperty(sequelize, 'definitions', {
    get: function(){
      let definitions = {}
      for(let model of sequelize.models){
        definitions[model.name] = model.definition
      }
      return definitions
    }
  });

  sequelize.addHook('afterDefine', function(model) {

    Object.defineProperty(model, 'definition', {
      get: function() {
        if(!this.__definition__) {
          var modelDef = { attributes: {} };

          _.values(model.rawAttributes).forEach( attr => {

            var type = attr.type;
            var typeName = attr.type.key;
            typeName = typeName.replace(/DOUBLE PRECISION/, 'DOUBLE');

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

            modelDef.attributes[attr.fieldName] = { type: typeName };
            if(attr.primaryKey) {
              modelDef.pk = attr.fieldName;
              modelDef.attributes[attr.fieldName].primaryKey = true;
            }

            modelDef.attributes[attr.fieldName].allowNull = !!attr.allowNull;

            if(attr.defaultValue !== undefined)
              modelDef.attributes[attr.fieldName].defaultValue = attr.defaultValue;

            var validations = modelDef.attributes[attr.fieldName].validate = (_.clone(attr.validate)||{});

            if(attr.allowNull === false && validations.notNull === undefined)
              validations.notNull = true

            if(/^(STRING|CHAR)$/.test(attr.type.key) && attr.type._length && validations.len === undefined){
              validations.len = [0, attr.type._length];
            }

            for (var vName in validations) {
              var vArgs = validations[vName];
              var vObj = {
                arg: vArgs,
                msg: '',
                kind: 'error'
              };

              if(_.isObject(vArgs) && !_.isUndefined(vArgs.arg)) {
                vObj.arg = vArgs.arg;
                vObj.msg  = vArgs.msg||'';
                vObj.kind = vArgs.kind||'error';
              }

              if (_.isRegExp(vArgs)) {
                //Llevamos la expresion regular a su formato en arreglo
                var regExp = vArgs.source;
                var mods = vArgs.global ? 'g' : '' + vArgs.ignoreCase ? 'i' : '' + vArgs.multiline ? 'm' : '';
                vObj.arg = [regExp, mods];

              } else if (_.isFunction(vArgs)) {
                //Enviamos la implementacion de funcion para evaluar en el front
                //TODO: Evaluar si esto es un problema de seguridad
                vObj.arg = 'var __evalfunc' + (''+Math.random()).slice(2) + '__=' + vArgs.toString();
              }

              validations[vName] = vObj;
            }
          });

          if(model.options.validate && !_.isEmpty(_.keys(model.options.validate))) {
            modelDef.postValidate = _.clone(model.options.validate);
            for( var vName in modelDef.postValidate ) {
              var func = modelDef.postValidate[vName];
              if (_.isFunction(func)) {
                //Enviamos la implementacion de funcion para evaluar en el front
                //TODO: Evaluar si esto es un problema de seguridad
                modelDef.postValidate[vName] = 'var __evalfunc' + (''+Math.random()).slice(2) + '__=' + func.toString();
              }
            }
          }

          if(!_.isEmpty(model.associations)) {
            modelDef.associations = _.fromPairs(
              _.values(model.associations).map(assoc => {
                return [assoc.as, {
                  model  : assoc.target.name,
                  kind   : assoc.associationType,
                  allowNull: !!assoc.foreignKeyAttribute.allowNull,
                  through: _.get(assoc, 'through.model.name')
                }]
              })
            );
          }
          this.__definition__ = modelDef
        }
        return this.__definition__;
      }
    });
  });
};