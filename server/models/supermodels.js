var Sequelize = require("sequelize");
var connection = new Sequelize("meow2", "root", "");

var users = connection.define('users', {
  username: {type: Sequelize.STRING, unique: true}
});

var messages = connection.define('messages', {
  text: Sequelize.STRING,
  username: Sequelize.STRING
});

var rooms = connection.define('rooms', {
  roomname: Sequelize.STRING
});

rooms.hasMany(messages);
users.hasMany(messages);
messages.belongsTo(users);
messages.belongsTo(rooms);

users.sync();
messages.sync();
rooms.sync();

module.exports.users = users;
module.exports.messages = messages;
module.exports.rooms = rooms;
