let EventEmitter = require('events')

module.exports = function(sequelize) {

  let _ = sequelize.Sequelize.Utils._
  let Promise = sequelize.Sequelize.Promise

  let emitterProto = new EventEmitter()

  emitterProto.emit = function(type) {
    let er, handler, len, args, i, events, domain
    let needDomainExit = false
    let doError = (type === 'error')

    events = this._events
    if (events)
      doError = (doError && events.error == null)
    else if (!doError)
      return false

    domain = this.domain

    // If there is no 'error' event listener then throw.
    if (doError) {
      er = arguments[1]
      if (domain) {
        if (!er)
          er = new Error('Uncaught, unspecified "error" event')
        er.domainEmitter = this
        er.domain = domain
        er.domainThrown = false
        domain.emit('error', er)
      } else if (er instanceof Error) {
        throw er // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        let err = new Error('Uncaught, unspecified "error" event. (' + er + ')')
        err.context = er
        throw err
      }
      return false
    }

    handler = events[type]

    if (!handler)
      return false

    if (domain && this !== process) {
      domain.enter()
      needDomainExit = true
    }

    let isFn = typeof handler === 'function'
    len = arguments.length
    args = new Array(len - 1)
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i]

    let results = []
    if (isFn)
      results = handler.apply(this, args)
    else {
      let len = handler.length
      let listeners = _.clone(handler, len)
      for (let i = 0; i < len; ++i)
        results.push(listeners[i].apply(this, args))
    }

    if (needDomainExit)
      domain.exit()

    return _.flatten([results])
  }

  let hookFunc = function( event ) {
    return function(...args) {
      let results = sequelize.emit(event, ...args)
      if(Array.isArray(results)) {
        return Promise.mapSeries(results, runPromise => _.isFunction(runPromise) ? runPromise() : runPromise)
      }
    }
  }

  sequelize.addHook('beforeValidate',    hookFunc( 'beforeValidate'    ))
  sequelize.addHook('afterValidate',     hookFunc( 'afterValidate'     ))
  sequelize.addHook('beforeCreate',      hookFunc( 'beforeCreate'      ))
  sequelize.addHook('afterCreate',       hookFunc( 'afterCreate'       ))
  sequelize.addHook('beforeDestroy',     hookFunc( 'beforeDestroy'     ))
  sequelize.addHook('afterDestroy',      hookFunc( 'afterDestroy'      ))
  sequelize.addHook('beforeRestore',     hookFunc( 'beforeRestore'     ))
  sequelize.addHook('afterRestore',      hookFunc( 'afterRestore'      ))
  sequelize.addHook('beforeUpdate',      hookFunc( 'beforeUpdate'      ))
  sequelize.addHook('afterUpdate',       hookFunc( 'afterUpdate'       ))
  sequelize.addHook('beforeBulkCreate',  hookFunc( 'beforeBulkCreate'  ))
  sequelize.addHook('afterBulkCreate',   hookFunc( 'afterBulkCreate'   ))
  sequelize.addHook('beforeBulkDestroy', hookFunc( 'beforeBulkDestroy' ))
  sequelize.addHook('afterBulkDestroy',  hookFunc( 'afterBulkDestroy'  ))
  sequelize.addHook('beforeBulkRestore', hookFunc( 'beforeBulkRestore' ))
  sequelize.addHook('afterBulkRestore',  hookFunc( 'afterBulkRestore'  ))
  sequelize.addHook('beforeBulkUpdate',  hookFunc( 'beforeBulkUpdate'  ))
  sequelize.addHook('afterBulkUpdate',   hookFunc( 'afterBulkUpdate'   ))
  sequelize.addHook('beforeFindAfterExpandIncludeAll', hookFunc( 'beforeFindAfterExpandIncludeAll'))
  sequelize.addHook('beforeFindAfterOptions',          hookFunc( 'beforeFindAfterOptions'         ))
  sequelize.addHook('afterFind',         hookFunc( 'afterFind'         ))
  sequelize.addHook('afterDefine',       hookFunc( 'afterDefine'       ))
  sequelize.addHook('beforeInit',        hookFunc( 'beforeInit'        ))
  sequelize.addHook('afterInit',         hookFunc( 'afterInit'         ))
  sequelize.addHook('beforeSync',        hookFunc( 'beforeSync'        ))
  sequelize.addHook('afterSync',         hookFunc( 'afterSync'         ))
  sequelize.addHook('beforeBulkSync',    hookFunc( 'beforeBulkSync'    ))
  sequelize.addHook('afterBulkSync',     hookFunc( 'afterBulkSync'     ))

  Object.setPrototypeOf(sequelize.constructor.prototype, emitterProto)
}

