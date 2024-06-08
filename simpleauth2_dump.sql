-- MySQL dump 10.13  Distrib 8.0.33, for macos13.3 (arm64)
--
-- Host: localhost    Database: simpleauth2
-- ------------------------------------------------------
-- Server version	8.0.33
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!50503 SET NAMES utf8mb4 */;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;

/*!40103 SET TIME_ZONE='+00:00' */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jwt_blacklists`
--
DROP TABLE IF EXISTS `jwt_blacklists`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `jwt_blacklists` (
    `id` int NOT NULL AUTO_INCREMENT,
    `jwt_token` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `jwt_token` (`jwt_token`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwt_blacklists`
--
LOCK TABLES `jwt_blacklists` WRITE;

/*!40000 ALTER TABLE `jwt_blacklists` DISABLE KEYS */;

INSERT INTO
  `jwt_blacklists`
VALUES
  (
    6,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InJvbmFsZDEyM0BleGFtcGxlLmNvbSIsImlhdCI6MTcxNzY3NDI4MiwiZXhwIjoxNzE3ODQ3MDgyfQ.LT5dZnZvE381SrKATLOeTeSlwc_jtzqkcZ5ik_8N4ws'
  ),
  (
    10,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InJvbmFsZDEyM0BleGFtcGxlLmNvbSIsImlhdCI6MTcxNzY3NjU0MywiZXhwIjoxNzE3ODQ5MzQzfQ.dAkuveaIw_upEUR5FRGuaS7Pow5KdYJ6eHKlnlZ0Snk'
  ),
  (
    19,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InJvbmFsZDEyM0BleGFtcGxlLmNvbSIsImlhdCI6MTcxNzY3Nzk4MCwiZXhwIjoxNzE3ODUwNzgwfQ.4-4nmWhIH1gcuSq4gb_ybEg7IAS3KPCPD_isZ5eVM3U'
  ),
  (
    11,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InJvbmFsZDEyM0BleGFtcGxlLmNvbSIsImlhdCI6MTcxNzY3NzQ3NiwiZXhwIjoxNzE3ODUwMjc2fQ.pOSMEjn3SDN7SCHeVKeVS3h8UPT5IWKBvhJ1yKEqMTI'
  ),
  (
    2,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InJvbmFsZDEyM0BleGFtcGxlLmNvbSIsImlhdCI6MTcxNzYxODQ5OCwiZXhwIjoxNzE3NzkxMjk4fQ.tShtOZGE3NB0CLAQfUNJ3aZy1RndwrECyBNlJVKiZU8'
  ),
  (
    1,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InJvbmFsZDEyM0BleGFtcGxlLmNvbSIsImlhdCI6MTcxNzYxODQwNCwiZXhwIjoxNzE3NzkxMjA0fQ.qWbtbIwJuHcvGKYk9JDTUx9cWw7FqlP6rJkhPAgZO0U'
  ),
  (9, 'hbdfjvbjd');

/*!40000 ALTER TABLE `jwt_blacklists` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) DEFAULT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `gender` varchar(255) DEFAULT NULL,
    `photo` varchar(255) DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;

/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO
  `users`
VALUES
  (
    1,
    'Ronald',
    NULL,
    'ronald123@example.com',
    '$2a$10$3ecA4mOjvPImVEEtVTgcD.GndiSPR5.28xIz7e8/2xpuDliADr.CS',
    NULL,
    NULL,
    '2024-06-05 11:47:14',
    NULL
  ),
  (
    2,
    'Elena',
    'Rebamova',
    'elena123@example.com',
    '$2a$10$N4VgnWhPUMYRwx6fnCGIOOCjwTwb/QT2ATQQaQgMXTlRMSLcnUb8G',
    'female',
    'assets/IMG/photo-18ff83837342f821.jpg',
    '2024-06-06 12:58:14',
    '2024-06-08 14:19:44'
  ),
  (
    6,
    'Olga',
    NULL,
    'olga123@example.com',
    '$2a$10$g0oi6gCfJmO8BX0Yw68zNOIxGyJS6aDiga4YajPcMmZRe24vrofzC',
    NULL,
    NULL,
    '2024-06-06 12:59:44',
    NULL
  ),
  (
    7,
    'Mike',
    NULL,
    'mike123@example.com',
    '$2a$10$rnU9nR2rdhVwnTuE4jOOLeo..Ic9dTGu4Y466zE0n09xgOt.48jGu',
    NULL,
    NULL,
    '2024-06-06 13:00:19',
    NULL
  ),
  (
    8,
    'Oleg',
    NULL,
    'oleg123@example.com',
    '$2a$10$PTdlrNt..wueTOrdIsXs5umrIR5Qdj3T86BDXWqjt1aqiQp0VGxYu',
    NULL,
    NULL,
    '2024-06-06 13:00:29',
    NULL
  ),
  (
    9,
    'Nikita',
    NULL,
    'nikita123@example.com',
    '$2a$10$X7whLEMVnDLlalCFJE.UOO9wa5YkFd06eLs1T.1YF6Z8WkTckqv0.',
    NULL,
    NULL,
    '2024-06-06 13:00:40',
    NULL
  ),
  (
    10,
    'Bob',
    NULL,
    'bob123@example.com',
    '$2a$10$mHrfUm11EbyDHd.M43h6dO2cGAkl0Rlz5gq5JStmWdQeKV11Bm7YG',
    NULL,
    NULL,
    '2024-06-06 13:00:51',
    NULL
  ),
  (
    11,
    'July',
    NULL,
    'july123@example.com',
    '$2a$10$.yO2FaJrlyX9nV2jfW2Twe8HKZiZDJ7pNKIwZHmfDDhqJvI7Khbh.',
    NULL,
    NULL,
    '2024-06-06 13:01:03',
    NULL
  ),
  (
    12,
    'Nicole',
    NULL,
    'nicole123@example.com',
    '$2a$10$FqNHdZAnPi1gjlGfzhcXoemWw0rbJKuOaXQ75Cnhmq4wLRp3.QC.6',
    NULL,
    NULL,
    '2024-06-06 13:01:19',
    NULL
  ),
  (
    13,
    'Nicolas',
    NULL,
    'nicolas123@example.com',
    '$2a$10$NJ6wcG1BsqoQjkayLbEJBezyipjQ6CU0S7IUHkCRZWFmY/plMxKoK',
    NULL,
    NULL,
    '2024-06-06 13:01:25',
    NULL
  ),
  (
    14,
    'Billy',
    NULL,
    'billy123@example.com',
    '$2a$10$jH55EzxQGs/TcDGRAVCIpOjObKHxbQ9pTl5jm4KUylxyYkpYGy1Xm',
    NULL,
    NULL,
    '2024-06-06 13:01:55',
    NULL
  ),
  (
    15,
    'Ron',
    NULL,
    'ron123@example.com',
    '$2a$10$CeUjS1q.PxmYkVNblFdz8unPUjbkMPLR9HudcYwQ0OjbAwLIKa3R.',
    NULL,
    NULL,
    '2024-06-06 13:02:18',
    NULL
  ),
  (
    16,
    'Lina',
    NULL,
    'lina123@example.com',
    '$2a$10$Cawq9pboYHGzNClzKys6t.L/GeocsrWWL4vgHGpMAdb8nUEh3t6sC',
    NULL,
    NULL,
    '2024-06-06 13:03:13',
    NULL
  ),
  (
    18,
    'Milana',
    NULL,
    'milana123@example.com',
    '$2a$10$sZkkreRg9WchYg2vFOH8SOz67Hs5I/noK.7h3FakdLPb4/LrwKSWi',
    NULL,
    NULL,
    '2024-06-07 14:46:46',
    NULL
  );

/*!40000 ALTER TABLE `users` ENABLE KEYS */;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-08 20:36:19