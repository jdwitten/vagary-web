CREATE DATABASE IF NOT EXISTS vagarydb;

CREATE TABLE `vagarydb`.`Posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `author` INT NULL,
  `body` VARCHAR(2000) NULL,
  `title` VARCHAR(300) NULL,
  `trip` INT NULL,
  `location` VARCHAR(45) NULL,
  `date_created` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `vagarydb`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NULL,
  `password` VARCHAR(500) NULL,
  `email` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `vagarydb`.`Tokens` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NULL,
    `userId` INT NULL,
    `token` VARCHAR(500) NULL,
    PRIMARY KEY (`id`));
