module.exports = function( sequelize ) {

  var _ = sequelize.Utils._
  var models = sequelize.models

  models.sync = function (options) {
    options = options || {}
    if (!options.force) options.force = true
    if (!options.match) options.match = /^test|test$/i
    if (_.isUndefined(options.logging))
      options.logging = false
    else if (options.logging === true) {
      options.logging = console.log.bind(console)
    }
    return sequelize.sync(options)
  }

  models[Symbol.iterator] = function * ()
  {
    for (let modelName in this) {
      let model = this[modelName]
      if (model instanceof sequelize.Model) {
        yield model
      }
    }
  }
}