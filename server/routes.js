var controllers = require('./controllers');
var router = require('express').Router();

for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post);
}

// router.options('*', function(req, res){
//   res.send("options");
// });

module.exports = router;

