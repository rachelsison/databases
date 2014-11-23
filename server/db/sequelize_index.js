var db = require('../models/supermodels.js');

db.users.sync();
db.messages.sync();
db.rooms.sync();






var messages = {
  get: function(req, res){
    db.messages.findAll({include: [{model: db.users}, {model: db.rooms}]})
    .success(function(results){
      res.json(parseMessage(results));
    });
  },
  post: function(req, res){
    db.users.findOrCreate({where: {username: req.body.username}})
    .success(function(results){
      req.body.userid = results[0].dataValues.id;

      db.rooms.findOrCreate({where: {roomname: req.body.roomname}}).success(function(results2){
        req.body.roomid = results2[0].dataValues.id;

        db.messages.create({text: req.body.text, userId: req.body.userid, roomId: req.body.roomid}).success(function(){
          res.statusCode(201);
          res.end();
        })
      })
    })
  }
}

var parseMessage = function(dataArray){
  var results = dataArray.map(function(elem){
    return {
      username: elem.dataValues.user.username,
      roomname: elem.dataValues.room.roomname,
      text: elem.dataValues.text,
      createdAt: elem.dataValues.createdAt,
      objectId: elem.dataValues.id
    };
  })
  return {'results': results};

}

// messages.post({body: {username:'dorkypants', roomname:'mamamia', text: "Tralalalalol"}});

messages.get('fake','fake');







module.exports.messages = messages;
      // console.log("id returned as:" + results[0].dataValues.id);
