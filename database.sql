-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: pmyscrum
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `records_juegos`
--

DROP TABLE IF EXISTS `records_juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `records_juegos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(10) NOT NULL,
  `juego_id` int NOT NULL,
  `tipo` tinyint NOT NULL,
  `resultado` tinyint NOT NULL,
  `tiempo` int NOT NULL,
  `costos` int NOT NULL,
  `calidad` int NOT NULL,
  `motivacion` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `records_juegos`
--

LOCK TABLES `records_juegos` WRITE;
/*!40000 ALTER TABLE `records_juegos` DISABLE KEYS */;
INSERT INTO `records_juegos` VALUES (2,'fco',1,1,1,39,71,100,85),(5,'fco',1,0,1,30,57,72,90);
/*!40000 ALTER TABLE `records_juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teoria_pmbok`
--

DROP TABLE IF EXISTS `teoria_pmbok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teoria_pmbok` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(10) NOT NULL,
  `progreso` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teoria_pmbok`
--

LOCK TABLES `teoria_pmbok` WRITE;
/*!40000 ALTER TABLE `teoria_pmbok` DISABLE KEYS */;
INSERT INTO `teoria_pmbok` VALUES (4,'fco',100);
/*!40000 ALTER TABLE `teoria_pmbok` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teoria_scrum`
--

DROP TABLE IF EXISTS `teoria_scrum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teoria_scrum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(10) NOT NULL,
  `progreso` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teoria_scrum`
--

LOCK TABLES `teoria_scrum` WRITE;
/*!40000 ALTER TABLE `teoria_scrum` DISABLE KEYS */;
INSERT INTO `teoria_scrum` VALUES (1,'fco',100);
/*!40000 ALTER TABLE `teoria_scrum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(10) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (5,'fco','$2y$10$CFUUoV4WdLiAse5GAg/s5e24poma3MI1sCp2crynxvib7VP7P67ni'),(8,'fco2','$2y$10$o4r7X7tNNs3QzYes5wzTPOqABKhfAt11HwdvFTh8QuJIXlUl8TGeK');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-09  0:51:07
