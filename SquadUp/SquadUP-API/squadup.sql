CREATE SCHEMA `squadup`;

CREATE TABLE `user` (
  `id` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`));
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `squadup`.`game` (
  `id` VARCHAR(45) NOT NULL,
  `favGame` VARCHAR(45) NOT NULL,
  `skillLevel` VARCHAR(45) NOT NULL,
  `DOB` DATE NOT NULL,
  `time` TIME NOT NULL,
  `platform` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `squadup`.`matches` (
  `id` VARCHAR(45) NOT NULL,
  `user1` VARCHAR(45) NOT NULL,
  `user2` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

