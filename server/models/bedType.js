module.exports = function(sequelize, DataTypes) {
  return sequelize.define("bedType", {
    type: DataTypes.STRING
  }, {
    freezeTableName: true
  })
}
