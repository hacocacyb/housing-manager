var moment = require('moment')

module.exports = {
  required: value => value ? undefined : 'Required',
  minAge: function(age) {
    return function(value) {
      let val = moment(value);
      val.hour(0).minute(0).second(1)
      const diff = moment(moment.now()).diff(val);
      const years = moment.duration(diff).asYears();
      return years >= age ? undefined : 'Visitors must be at least ' + age + ' years old';
    }
  }
}
