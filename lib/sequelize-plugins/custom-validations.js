module.exports = function(sequelize) {

  let _ = sequelize.Utils._
  let validator = sequelize.Validator

  const extensions = {
    gt: (str, val) => {
      const number = parseFloat(str)
      return isNaN(number) || number > val
    },
    lt: (str, val) => {
      const number = parseFloat(str)
      return isNaN(number) || number < val
    },
    gte: this.min,
    gte: this.max
  }

  _.forEach(extensions, (extend, key) => {
    validator[key] = extend
  })
}
