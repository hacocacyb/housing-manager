module.exports = function(sequelize, DataTypes) {
  const dt = DataTypes;

  return sequelize.define("visit", {
    personId: dt.INTEGER,
    buildingId: dt.INTEGER,
    bedId: dt.INTEGER,
    intake: dt.DATE,
    outtake: dt.DATE,
    rentalPeriodId: dt.INTEGER,
    cost: dt.REAL
  }, {
    freezeTableName: true
  })
}
