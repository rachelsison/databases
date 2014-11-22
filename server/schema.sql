CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  msgID int(6) NOT NULL AUTO_INCREMENT,
  text varchar(140),
  userID int(3),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  roomID int(2),
  PRIMARY KEY(msgID)
  /* Describe your table here.*/
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  userID int(3) NOT NULL AUTO_INCREMENT,
  username varchar(10),
  PRIMARY KEY(userID),
  UNIQUE (username)
);

CREATE TABLE rooms (
  roomID int(2) NOT NULL AUTO_INCREMENT,
  roomname varchar(20),
  PRIMARY KEY(roomID),
  UNIQUE (roomname)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

