var fs = require('fs');
var path = require('path');

module.exports = function(DataTypes, Sequelize){
  var modelAttribs = {};

  fs.readdirSync(__dirname)
    .filter(function(file) {
      return fs.statSync(path.join(__dirname,file)).isFile() &&
        file.slice(-3) == '.js' &&
        file.slice(0,-3) != 'index';
    })
    .forEach(function(file) {
      modelAttribs[file.slice(0,-3)] =
        require(path.join(__dirname, file))(DataTypes, Sequelize);
    });

  return modelAttribs;
};

