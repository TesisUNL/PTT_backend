-- MariaDB dump 10.19  Distrib 10.9.3-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: rtmb
-- ------------------------------------------------------
-- Server version	10.9.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attraction`
--

DROP TABLE IF EXISTS `attraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attraction` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `short_description` varchar(300) NOT NULL,
  `long_description` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `images` text DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `cantonId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5ad76f18db39092c5ab4f2fd3b3` (`cantonId`),
  CONSTRAINT `FK_5ad76f18db39092c5ab4f2fd3b3` FOREIGN KEY (`cantonId`) REFERENCES `canton` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attraction`
--

LOCK TABLES `attraction` WRITE;
/*!40000 ALTER TABLE `attraction` DISABLE KEYS */;
INSERT INTO `attraction` VALUES
('6c6fa523-050f-42f8-856b-1085012f6855','Mangahurco Huayacanes​',-4.15684,-80.4317,'description',NULL,'assets/guayacanes.jpeg',NULL,'2022-11-15 02:22:09.120887','2022-11-15 02:22:09.120887','0a2736f3-4291-4124-a391-412c79424ee8'),
('abbc1efe-2bb4-49cf-aca7-4f48c3a90d09','Bosque Protector Cardo Palto',-4.37245,-79.936,'string','string','assets/protector.jpeg',NULL,'2022-11-15 02:11:02.404386','2022-11-15 02:11:02.404386','8f02e6b9-ffb8-44a7-b8c3-cc9884bcffe4'),
('ea39759e-8992-4be0-b50e-a47c93c8e94b','Cerro Huayrapungo​',-4.07527,-79.9605,'description',NULL,'assets/cerro.jpg',NULL,'2022-11-15 02:17:21.739523','2022-11-15 02:17:21.739523','3957d66d-1bc6-463e-bc28-61073b443fb6');
/*!40000 ALTER TABLE `attraction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canton`
--

DROP TABLE IF EXISTS `canton`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `canton` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `province` varchar(255) NOT NULL DEFAULT 'Loja',
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_86029953a3e2ed6ad0f13a7b94` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canton`
--

LOCK TABLES `canton` WRITE;
/*!40000 ALTER TABLE `canton` DISABLE KEYS */;
INSERT INTO `canton` VALUES
('0a2736f3-4291-4124-a391-412c79424ee8','Zapotillo','https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Bandera_del_Cant%C3%B3n_Zapotillo.png/200px-Bandera_del_Cant%C3%B3n_Zapotillo.png','Loja','2022-11-15 02:00:21.294454','2022-11-15 02:00:21.294454'),
('1825a10d-bb7a-428b-b87e-e408cef7679f','Paltas', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Bandera_de_Paltas.png/800px-Bandera_de_Paltas.png','Loja','2022-11-15 02:00:44.283145','2022-11-15 02:00:44.283145'),
('3957d66d-1bc6-463e-bc28-61073b443fb6','Celica', 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Bandera_de_Celica.png','Loja','2022-11-15 02:00:28.095369','2022-11-15 02:00:28.095369'),
('397b2b92-0f9e-4af3-abed-90be4e7befc7','Puyango', 'https://upload.wikimedia.org/wikipedia/commons/4/40/Bandera_de_Puyango.png','Loja','2022-11-15 02:00:50.971436','2022-11-15 02:00:50.971436'),
('8f02e6b9-ffb8-44a7-b8c3-cc9884bcffe4','Macará','https://upload.wikimedia.org/wikipedia/commons/c/cd/Bandera_de_Macar%C3%A1.png','Loja','2022-11-15 02:00:11.473475','2022-11-15 02:00:11.473475'),
('b4f3beb0-5a8f-495b-b1ea-8ac46470d7b7','Pindal','https://upload.wikimedia.org/wikipedia/commons/2/2b/Bandera_de_Pindal.png','Loja','2022-11-15 02:00:39.829845','2022-11-15 02:00:39.829845');
/*!40000 ALTER TABLE `canton` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(80) NOT NULL,
  `role` enum('Admin','Guest','User','Tourist Admin') NOT NULL DEFAULT 'User',
  `email` varchar(70) NOT NULL,
  `authSocialToken` varchar(255) DEFAULT NULL,
  `password` varchar(1024) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `imageUrl` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
('eef5e0e7-0e99-46c3-954f-0a94ae239fba','Juan','User','darlackwow76@gmail.com',NULL,'$2b$10$ntvBrJRKqaWN1xrVGmEb6u3z6awhQ1nktmETR599yC8UrlaOeE26.',1,NULL,NULL,'2022-11-15 01:40:26.228282','2022-11-15 01:40:26.228282');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-14 21:32:06
