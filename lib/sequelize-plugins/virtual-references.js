let EventEmitter = require('events')

module.exports = function(sequelize) {
  let _ = sequelize.Sequelize.Utils._
  if (sequelize instanceof EventEmitter) {
    sequelize.on('afterDefineAll', function (models) {
      for (let modelName in models) {
        let model = models[modelName]
        for (let attrName in model.rawAttributes) {
          let attr = model.rawAttributes[attrName]
          if (attr.references && typeof attr.references.virtual) {
            delete attr.references
          }
        }
      }
    })
  }
}
