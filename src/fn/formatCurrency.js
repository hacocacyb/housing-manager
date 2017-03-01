var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});
var currency = function(v) {
  return formatter.format(v);
}

export default currency
