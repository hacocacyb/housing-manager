module.exports = function(sequelize, DataTypes) {
  const dt = DataTypes;

  return sequelize.define("person", {
    first: dt.STRING,
    middle: dt.STRING,
    last: dt.STRING,
    phone: dt.STRING,
    dob: dt.DATE
  }, {
    freezeTableName: true
  })
}
