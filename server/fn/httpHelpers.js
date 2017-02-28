module.exports = {
  parseRequest: function(req, callback, scope) {
    let body = '';
    req.on('data', function(data) {
      body += data.toString();
    });

    req.on('end', function() {
      let params = JSON.parse(body);
      callback.apply(scope, [params]);
    });
  }
}
