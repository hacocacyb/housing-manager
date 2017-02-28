module.exports = function(sequelize, DataTypes) {
  return sequelize.define("building", {
    name: DataTypes.STRING,
    addr1: DataTypes.STRING,
    addr2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {
    freezeTableName: true
  })
}
