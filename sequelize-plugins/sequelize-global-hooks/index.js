var fs = require('fs');
var path = require('path');
var cls = require('continuation-local-storage');

const VALERY_NS   = 'valeryweb-ws-ns';
const REQ_KEY     = 'req';
const SESSION_KEY = 'session';

module.exports = function( sequelize ) {
fs.readdirSync(__dirname)
  .filter( file => fs.statSync( path.join(__dirname, file)).isFile()
      && file.slice(-3) == '.js'
      && file.slice(0,-3) != 'index')

  .forEach( file => {
    var _        = sequelize.Sequelize.Utils._;
    var hookName = file.slice(0,-3);
    var hookPath = path.join(__dirname, file);
    var hookFunc = require(hookPath);

    var hookWrapper = _.wrap(hookFunc, function(hookFunc) {
      var ns      = cls.getNamespace( VALERY_NS );
      var req     = ns.get( REQ_KEY );
      var session = ns.get( SESSION_KEY );

      if(!/\w*(Init|Define)/.test(hookName) && ( !session || !req ))
        throw new Error( 'No se encontro session en el espacio de nombres CLS "valeryweb-ws-ns"' );

      return hookFunc.apply( { request: req, session: session }, [].slice.call(arguments, 1) );
    });

    sequelize.addHook( hookName, hookWrapper );
  });
};
