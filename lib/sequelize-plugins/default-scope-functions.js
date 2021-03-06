let EventEmitter = require('events')

module.exports = function(sequelize) {
  if(sequelize instanceof EventEmitter) {
    sequelize.on('afterDefineAll', function(models){
      for(let modelName in models) {
        let model = models[modelName]
        if(!(model instanceof sequelize.Model)) continue

        //Sequelize no soporta funciones como defaultScope, pero son necesarias en
        //algunos casos, asi que solucionamos reemplazando los defaultScope tipo funcion por
        //el resultado de su ejecucion
        if (typeof model.options.defaultScope == 'function') {
          model.addScope('defaultScope', model.options.defaultScope(), {override: true})
        }
      }
    })
  }
}
