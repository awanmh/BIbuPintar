-- SQL Dump Final - Kosong (Hanya Struktur)
-- Proyek: Ibu Pintar
-- Versi: 3.2 (dengan tabel `treatments` + Google Login Support)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

-- DATABASE
CREATE DATABASE IF NOT EXISTS `ibu_hamil` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ibu_hamil`;

-- DROP TABLES (untuk clean start)
DROP TABLE IF EXISTS `answers`;
DROP TABLE IF EXISTS `questions`;
DROP TABLE IF EXISTS `testimonials`;
DROP TABLE IF EXISTS `articles`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `reservations`;
DROP TABLE IF EXISTS `treatments`;
DROP TABLE IF EXISTS `users`;

-- ========================
-- TABLE: users (FINAL untuk login Google + lokal)
-- ========================
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255), -- Nullable kalau login via Google
  `googleId` VARCHAR(255), -- Untuk simpan ID dari Google
  `provider` VARCHAR(50),  -- 'google' atau 'local'
  `role` ENUM('visitor', 'admin') DEFAULT 'visitor',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ========================
-- TABLE: categories
-- ========================
CREATE TABLE `categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- INSERT default categories
INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'Kehamilan', 'Informasi dan tips seputar masa kehamilan.'),
(2, 'Persalinan', 'Panduan persiapan dan tips dalam proses pre dan pasca-persalinan.'),
(3, 'Kesehatan Reproduksi Wanita', 'Tips dan informasi kesehatan reproduksi wanita.');

-- ========================
-- TABLE: articles
-- ========================
CREATE TABLE `articles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `imageUrl` VARCHAR(255),
  `date_posted` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `author_id` INT(11),
  `category_id` INT(11),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================
-- TABLE: questions & answers
-- ========================
CREATE TABLE `questions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `user_id` INT(11),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `answers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `user_id` INT(11),
  `question_id` INT(11),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================
-- TABLE: reservations
-- ========================
CREATE TABLE `reservations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `service_type` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `status` ENUM('pending', 'confirmed', 'canceled') DEFAULT 'pending',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================
-- TABLE: testimonials
-- ========================
CREATE TABLE `testimonials` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `user_id` INT(11),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================
-- TABLE: treatments
-- ========================
CREATE TABLE `treatments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `imageUrl` VARCHAR(255),
  `duration` VARCHAR(100),
  `category` VARCHAR(100),
  `type` ENUM('single', 'package') DEFAULT 'single',
  `slug` VARCHAR(255),
  `price` INT(11),
  `booking_link` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;
