module.exports = function(sequelize, DataTypes) {
  return sequelize.define("rentalPeriod", {
    type: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {
    freezeTableName: true
  })
}
