CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  msgID int(6),
  text varchar(140),
  userID int(3),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  roomID int(2)

  /* Describe your table here.*/
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  userID int(3),
  username varchar(10)
);

CREATE TABLE rooms (
  roomID int(2),
  roomname varchar(20)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

