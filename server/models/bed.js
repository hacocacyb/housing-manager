module.exports = function(sequelize, DataTypes) {
  return sequelize.define("bed", {
    name: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    buildingId: DataTypes.INTEGER,
    cost: DataTypes.DECIMAL

  }, {
    freezeTableName: true
  })
}
