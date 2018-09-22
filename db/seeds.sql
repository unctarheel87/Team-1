use penpal_db;

INSERT INTO users (firstName, lastName, userName, password, image, createdAt, updatedAt) VALUES ('Joe', 'Smith', 'cooljoe', '1234', 'image', '2018-09-20 13:19:39', '2018-09-20 13:19:39');

-- In order to be able to view BLOB column for messages, please change this setting in SQL Workbench
-- Go to Edit > Preferences
-- Choose SQL Editor
-- Under SQL Execution, check Treat BINARY/VARBINARY as nonbinary character string
-- Restart MySQL Workbench (you will not be prompted or informed of this requirement).

INSERT INTO messages (message, createdAt, updatedAt, userId) VALUES ('Hello, this is the first message.', '2018-09-20 13:19:39', '2018-09-20 13:19:39',1);

INSERT INTO interests (interest, createdAt, updatedAt, userId) VALUES ('Coding', '2018-09-20 13:19:39', '2018-09-20 13:19:39',1);

select * from users;

-- You must use SUBSTRING for message column because it is a BLOB datatype
select id, SUBSTRING(message,1,2500), createdAt, updatedAt, userId from messages;

select * from interests;