seedRentalPeriods = (db)=>{
  db.RentalPeriod.findOrCreate({
    where: {
      id: 1
    },
    defaults: {
      type:'Weekly',
      duration: 7
    }
  })
  db.RentalPeriod.findOrCreate({
    where: {
      id: 2
    },
    defaults: {
      type:'Bi-Weekly',
      duration: 14
    }
  })
}

seedBedTypes = (db) => {
  const bedTypes = [
    [1, 'Cot'],
    [2, 'Twin'],
    [3, 'Double'],
    [4, 'Full'],
    [5, 'Queen'],
    [6, 'King'],
    [7, 'Bunk'],
  ]
  const bedTypesConfigs = bedTypes.map(bt => ({
    where: {
      id: bt[0]
    },
    defaults: {
      type:bt[1]
    }
  }))

  bedTypesConfigs.forEach((bt) => {
    db.BedType.findOrCreate(bt)
  });
}

module.exports = (db)=>{
  seedBedTypes(db);
  seedRentalPeriods(db);
}
