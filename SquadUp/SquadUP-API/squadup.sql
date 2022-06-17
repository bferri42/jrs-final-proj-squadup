CREATE SCHEMA `squadup`;

CREATE TABLE `squadup`.`games` (
  `id` VARCHAR(45) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `gameType` VARCHAR(45) NOT NULL, 
  `platform` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(255),

  PRIMARY KEY (`id`)
);

CREATE TABLE `squadup`.`users` (
  `id` VARCHAR(45) NOT NULL UNIQUE,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `DOB` VARCHAR(45), -- date of birth
  `timeZone` VARCHAR(45) NOT NULL, 
  `skillLevel` VARCHAR(45) NOT NULL,
  `favGameId` VARCHAR(45), NOT NULL,
  `mainGameId` VARCHAR(45), NOT NULL,


  PRIMARY KEY (`id`),

  FOREIGN KEY (`favGameId`) 
    REFERENCES `games`(`id`)
);


CREATE TABLE `squadup`.`matches` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `user1` VARCHAR(45) NOT NULL,
  `user2` VARCHAR(45) NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`user1`) 
    REFERENCES `users`(`id`),
  FOREIGN KEY (`user2`) 
    REFERENCES `users`(`id`)
);

