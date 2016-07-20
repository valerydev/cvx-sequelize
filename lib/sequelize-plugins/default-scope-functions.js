var EventEmitter = require('events');

module.exports = function(sequelize) {
  if(sequelize instanceof EventEmitter) {
    sequelize.on('afterDefineAll', function(models){
      for(var modelName in models) {
        var model = models[modelName];

        //Sequelize no soporta funciones como defaultScope, pero son necesarias en
        //algunos casos, asi que solucionamos reemplazando los defaultScope tipo funcion por
        //el resultado de su ejecucion
        if (typeof model.options.defaultScope == 'function') {
          model.addScope('defaultScope', model.options.defaultScope(), {override: true});
        }
      }
    });
  }
};
