var fs = require('fs');
var path = require('path');
var cls = require('continuation-local-storage');

var context   = 'global-hooks-ns';

module.exports = function( sequelize, opts ) {

  var namespace =  opts.namespace || 'global-hooks-ns';

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

        var ns = {};
        if(!/\w*(Init|Define)/.test(hookName)) {
          //Solo buscar la session en el namespace de valery si el hook no es *Define/*Init
          ns = cls.getNamespace( namespace );
        }

        return hookFunc.apply(ns.active, [].slice.call(arguments, 1));
      });

      sequelize.addHook( hookName, hookWrapper );
    });
};
