let shimmer = require('shimmer')

module.exports = function(sequelize) {
  let Promise = sequelize.Sequelize.Promise

  // functionName: The Promise function that should be shimmed
  // fnArgs: The arguments index that should be CLS enabled (typically all callbacks). Offset from last if negative
  function shimCLS(object, functionName, fnArgs){
    shimmer.wrap(object, functionName, function(fn) {
      return function () {
        if (Promise.Sequelize && Promise.Sequelize.cls) {
          let ns = Promise.Sequelize.cls
          for(let x=0; x<fnArgs.length; x++) {
            let argIndex = fnArgs[x] < 0 ? arguments.length + fnArgs[x] : fnArgs[x]
            if ( argIndex < arguments.length && typeof arguments[argIndex] === 'function' ) {
              arguments[argIndex] = ns.bind( arguments[argIndex] )
            }
          }
        }

        return fn.apply(this, arguments)
      }
    })
  }

  shimCLS(Promise, 'mapSeries', [1])
  shimCLS(Promise.prototype, 'mapSeries', [0])
}
