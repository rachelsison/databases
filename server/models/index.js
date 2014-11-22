//models
var db = require('../db');




module.exports = {
  messages: {
    get: function (req, res) {
      db.dbAccess('getMessages', function(messages){
        res.json({results: messages});
    })}, // a function which produces all the messages
    post: function (req, res) {
      db.dbInsert(req.body);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (req, res) {
      //get all the users
      db.dbAccess('getUsers', function(users){
        res.json({results: users})
      });
    },
    post: function (req, res) {
      //post new user
      db.postUser(req.body.username);
      res.end();
    }
  }
};
