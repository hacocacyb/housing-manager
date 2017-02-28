module.exports = function(sequelize, DataTypes) {
  const dt = DataTypes;

  return sequelize.define("payment", {
    visitId: dt.INTEGER,
    payDate: dt.DATE,
    amount: dt.REAL
  }, {
    freezeTableName: true
  })
}
