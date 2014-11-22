var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

connection.connect();

var queries = {
  'getMessages':"SELECT messages.text, users.username, messages.date, rooms.roomname FROM messages INNER JOIN users ON messages.userID=users.userID INNER JOIN rooms ON messages.roomID=rooms.roomID",
  'fakeQuery': "Select * from rooms where roomname='hahaha'",
  'getUsers': "SELECT * FROM users"

};

var dbAccess = function(query, callback, data){

  connection.query('use chat');


  connection.query(queries[query],function(err, rows, fields) {
    if(rows.length < 1){
    if (err) throw err;
      console.log("ERRORRR");
    }

    callback(rows);
  });

  //connection.end();
}

//dbAccess('fakeQuery', console.log)

var dbInsert = function(data){
  findUserID(data);
};

var findUserID = function(data){
  connection.query('use chat');
  connection.query('SELECT userID FROM users WHERE username="'+ data.username + '"', function(err, rows, field){
      if (err) throw err;
      if (rows < 1){
        connection.query('INSERT INTO users (username) values ("' + data.username + '")', function(){findUserID(data)});
      }
      else {
        data.userID = rows[0].userID
        findRoomID(data);
      }
  });
};

//finish converting to room variables
var findRoomID = function(data){
  connection.query('use chat');
  connection.query('SELECT roomID FROM rooms WHERE roomname="'+ data.roomname + '"', function(err, rows, field){
      if (err) throw err;
      if (rows < 1){
        connection.query('INSERT INTO rooms (roomname) values ("' + data.roomname + '")', function(){findRoomID(data)});
      }
      else {
        data.roomID = rows[0].roomID;
        insertMessage(data);
      }
  });
};

var insertMessage = function(data){
//findUSErid(username)
  connection.query('use chat');
  connection.query('INSERT INTO messages (text, userID, roomID) values ("' + data.text + '",' + data.userID + ',' + data.roomID+')', function(){
    console.log("success!")
  });

};

var postUser = function(username){
  connection.query('use chat');
  connection.query('insert ignore into users (username) values ("'+ username +'")', function(err){
    console.log(err);
  });
};

postUser('peterlady');

dbAccess('getMessages', console.log);

// findUserID({
//   text: "Rachel string",
//   username: "rachel",
//   roomname: "happyTroll"
// });

// insertMessage("trolololo", 5, 1);

module.exports.dbAccess = dbAccess;
module.exports.queries = queries;
module.exports.dbInsert = dbInsert;
module.exports.postUser = postUser;

//insert into yourmom (keys) values(mom, yourmom)
