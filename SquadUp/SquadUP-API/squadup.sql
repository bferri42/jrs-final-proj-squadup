CREATE SCHEMA `squadup`;

CREATE TABLE `squadup`.`games` (
  `id` VARCHAR(45) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `gameType` VARCHAR(45) NOT NULL, 
  `platform` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(255),
  `pc` BOOLEAN,
  `xBox` BOOLEAN,
  `playStation` BOOLEAN,
  `crossPlatform` BOOLEAN,

  PRIMARY KEY (`id`)
);

CREATE TABLE `squadup`.`users` (
  `id` VARCHAR(45) NOT NULL UNIQUE,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `DOB` DATE NOT NULL, -- date of birth
  `timeZone` VARCHAR(45) NOT NULL, 
  `skillLevel` VARCHAR(45) NOT NULL,
  `favGameId` VARCHAR(45),
  `mainGameId` VARCHAR(45)


  PRIMARY KEY (`id`),

  FOREIGN KEY (`favGameId`) 
    REFERENCES `games`(`id`)
);


CREATE TABLE `squadup`.`matches` (
  `id` VARCHAR(45) UNIQUE NOT NULL AUTO_INCREMENT,
  `user1` VARCHAR(45) NOT NULL,
  `user2` VARCHAR(45) NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`user1`) 
    REFERENCES `users`(`id`),
  FOREIGN KEY (`user2`) 
    REFERENCES `users`(`id`)
);



INSERT INTO `users`
(`id`, `username`, `password`, `firstName`, `DOB`)
VALUES 
(uuid(), 'XKillaChrisX', '$2b$10$y1DbGuZf.QSoGP008WyShe0uY/1SeHnR1OhGd4qwl10aEOEFfbK/6', 'Chris', '1987-07-20'),
(uuid(), 'CargoShortKiller', '$2b$10$RJXyHjJow6U46doRY7O8MuIzsO3SFlDNXyha.QmOMebIYehHy7Qv2', 'Todd', '1984-03-10'),
(uuid(), 'bferri42', '$2b$10$fUbPP5.JQ./49EhMCmAUQeOx.pfuIw1MBUMabpTGqrMxptPivT.g6', 'Brian', '1987-07-20'),
(uuid(), 'KelOwnedYou', '$2b$10$J4iiMA.2AodKCS/M2g4oje4T0fgaSe2Z9Bz/wCKhNZl3tIFE0firO', 'Kelly', '1988-10-17'),
(uuid(), 'TommyBahama', '$2b$10$rWI9fp6cNgbf802gx5nqq.ZzufPKR8DGZ/UUY0TMzmBsm6IMMxSjm', 'Tommy', '1993-04-06'),
(uuid(), 'Crackstar42', '$2b$10$kEyayEiTMxnQCQUnx6zdieWnZ6ELysSO2hJ8c9X54AOf1ZKFzmufC', 'Nick', '1986-12-20'),
(uuid(), 'picNick', '$2b$10$sZ/Q1hE.1gFtDTysyjb00.CJi9vXYIeRLfnNt7JXq74izeENeTj2S', 'Nick', '1990-08-19'),
(uuid(), 'DrLizardLover', '$2b$10$WJDck/e1p0Dw8Q33pwzfRe78y7LrGnBruFWNAWQsMl0fn/gM.dLby', 'Blake', '1994-11-04'),
(uuid(), 'DemonSlayer124', '$2b$10$.NMn4tZOULJzbcdhQ39MDu4Y7cgTyIQRPr3plqzqknMMZ3gIWbMTq', 'JP', '1990-01-11'),
(uuid(), 'breadman', '$2b$10$iMyX37WXI.irjujp5qB1U.DEVLcpeud00gr05hcPWmdCl8Uowm.Ye', 'Bobby', '1982-03-04'),
(uuid(), 'Zandoss', '$2b$10$yVw07CW9keupUvXAUh5YauPHQBy0mbCOSycbUC53zSV2bXCpYXVj2', 'Blaine', '1999-05-29'),
(uuid(), 'RonJonSilver', '$2b$10$4OXTOhN8qteaACqsoAuMZ.a0n7kWwpNHVX/gmr/PRuYD6bUc0z/mC', 'Ronald', '1989-10-07');
