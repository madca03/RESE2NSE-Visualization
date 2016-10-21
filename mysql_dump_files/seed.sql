-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: graph
-- ------------------------------------------------------
-- Server version	5.7.12-log

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
-- Table structure for table `configurations`
--

DROP TABLE IF EXISTS `configurations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configurations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_browser_width` double DEFAULT NULL,
  `base_graph_container_width` double DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configurations`
--

LOCK TABLES `configurations` WRITE;
/*!40000 ALTER TABLE `configurations` DISABLE KEYS */;
/*!40000 ALTER TABLE `configurations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datetime_archive`
--

DROP TABLE IF EXISTS `datetime_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datetime_archive` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datetime_archive` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datetime_archive`
--

LOCK TABLES `datetime_archive` WRITE;
/*!40000 ALTER TABLE `datetime_archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `datetime_archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datetime_archives`
--

DROP TABLE IF EXISTS `datetime_archives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datetime_archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datetime_archive` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datetime_archives`
--

LOCK TABLES `datetime_archives` WRITE;
/*!40000 ALTER TABLE `datetime_archives` DISABLE KEYS */;
/*!40000 ALTER TABLE `datetime_archives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edge_archives`
--

DROP TABLE IF EXISTS `edge_archives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `edge_archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link_id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `traffic_id` int(11) NOT NULL,
  `floor_id` int(11) NOT NULL,
  `date_created_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edge_archives`
--

LOCK TABLES `edge_archives` WRITE;
/*!40000 ALTER TABLE `edge_archives` DISABLE KEYS */;
/*!40000 ALTER TABLE `edge_archives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edges`
--

DROP TABLE IF EXISTS `edges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `edges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `traffic_id` int(11) NOT NULL,
  `floor_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edges`
--

LOCK TABLES `edges` WRITE;
/*!40000 ALTER TABLE `edges` DISABLE KEYS */;
/*!40000 ALTER TABLE `edges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floors`
--

DROP TABLE IF EXISTS `floors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `floors` (
  `floor_number` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`floor_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floors`
--

LOCK TABLES `floors` WRITE;
/*!40000 ALTER TABLE `floors` DISABLE KEYS */;
INSERT INTO `floors` VALUES (1,'floorplan1','2016-10-12 07:53:02','2016-10-12 07:53:02'),(2,'floorplan2','2016-10-12 07:53:02','2016-10-12 07:53:02'),(3,'floorplan3','2016-10-12 07:53:02','2016-10-12 07:53:02'),(4,'floorplan4','2016-10-12 07:53:02','2016-10-12 07:53:02');
/*!40000 ALTER TABLE `floors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `links_archive`
--

DROP TABLE IF EXISTS `links_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `links_archive` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link_id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `traffic_id` int(11) NOT NULL,
  `floor_id` int(11) NOT NULL,
  `date_created_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `links_archive_date_created_id` (`date_created_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links_archive`
--

LOCK TABLES `links_archive` WRITE;
/*!40000 ALTER TABLE `links_archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `links_archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `links_present`
--

DROP TABLE IF EXISTS `links_present`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `links_present` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `traffic_id` int(11) NOT NULL,
  `floor_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `links_present_source_id_target_id` (`source_id`,`target_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links_present`
--

LOCK TABLES `links_present` WRITE;
/*!40000 ALTER TABLE `links_present` DISABLE KEYS */;
INSERT INTO `links_present` VALUES (1,8,6,3,1,'2016-10-12 07:53:03'),(2,6,3,1,1,'2016-10-12 07:53:03'),(3,4,6,1,1,'2016-10-12 07:53:03'),(4,6,9,3,1,'2016-10-12 07:53:03'),(5,5,8,2,1,'2016-10-12 07:53:03'),(6,10,2,2,1,'2016-10-12 07:53:03'),(7,3,6,3,1,'2016-10-12 07:53:03'),(8,1,7,2,1,'2016-10-12 07:53:03'),(9,9,1,2,1,'2016-10-12 07:53:03'),(10,5,2,1,1,'2016-10-12 07:53:03'),(11,1,3,1,1,'2016-10-12 07:53:03'),(12,4,8,3,1,'2016-10-12 07:53:03'),(13,9,3,3,1,'2016-10-12 07:53:03'),(14,7,10,1,1,'2016-10-12 07:53:03'),(15,5,3,2,1,'2016-10-12 07:53:03'),(16,19,18,1,1,'2016-10-12 07:53:03'),(17,15,11,3,1,'2016-10-12 07:53:03'),(18,18,17,1,1,'2016-10-12 07:53:03'),(19,19,14,3,1,'2016-10-12 07:53:03'),(20,12,14,3,1,'2016-10-12 07:53:03'),(21,15,13,3,1,'2016-10-12 07:53:03'),(22,20,11,3,1,'2016-10-12 07:53:03'),(23,16,20,1,1,'2016-10-12 07:53:03'),(24,13,18,3,1,'2016-10-12 07:53:03'),(25,15,16,2,1,'2016-10-12 07:53:03'),(26,17,11,3,1,'2016-10-12 07:53:03'),(27,20,19,2,1,'2016-10-12 07:53:03'),(28,11,14,2,1,'2016-10-12 07:53:03'),(29,17,15,1,1,'2016-10-12 07:53:03'),(30,17,20,2,1,'2016-10-12 07:53:03'),(31,27,21,3,1,'2016-10-12 07:53:03'),(32,21,30,3,1,'2016-10-12 07:53:03'),(33,23,26,3,1,'2016-10-12 07:53:03'),(34,30,21,3,1,'2016-10-12 07:53:03'),(35,28,25,3,1,'2016-10-12 07:53:03'),(36,24,22,2,1,'2016-10-12 07:53:03'),(37,23,22,3,1,'2016-10-12 07:53:03'),(38,29,27,2,1,'2016-10-12 07:53:03'),(39,22,26,2,1,'2016-10-12 07:53:03'),(40,25,28,2,1,'2016-10-12 07:53:03'),(41,23,25,3,1,'2016-10-12 07:53:03'),(42,26,23,1,1,'2016-10-12 07:53:03'),(43,23,30,3,1,'2016-10-12 07:53:03'),(44,28,30,1,1,'2016-10-12 07:53:03'),(45,30,25,3,1,'2016-10-12 07:53:03'),(46,40,37,2,1,'2016-10-12 07:53:03'),(47,36,34,3,1,'2016-10-12 07:53:03'),(48,38,33,2,1,'2016-10-12 07:53:03'),(49,39,31,1,1,'2016-10-12 07:53:03'),(50,34,37,3,1,'2016-10-12 07:53:03'),(51,32,36,1,1,'2016-10-12 07:53:03'),(52,35,39,1,1,'2016-10-12 07:53:03'),(53,36,32,3,1,'2016-10-12 07:53:03'),(54,40,31,1,1,'2016-10-12 07:53:03'),(55,38,36,1,1,'2016-10-12 07:53:03'),(56,40,32,2,1,'2016-10-12 07:53:03'),(57,39,34,2,1,'2016-10-12 07:53:03'),(58,37,33,1,1,'2016-10-12 07:53:03'),(59,34,32,2,1,'2016-10-12 07:53:03'),(60,31,37,3,1,'2016-10-12 07:53:03');
/*!40000 ALTER TABLE `links_present` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `node_archives`
--

DROP TABLE IF EXISTS `node_archives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `node_archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) NOT NULL,
  `x_coordinate` double DEFAULT NULL,
  `y_coordinate` double DEFAULT NULL,
  `last_transmission` varchar(255) NOT NULL,
  `packets_sent` int(11) NOT NULL,
  `packets_received` int(11) NOT NULL,
  `date_created_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_archives`
--

LOCK TABLES `node_archives` WRITE;
/*!40000 ALTER TABLE `node_archives` DISABLE KEYS */;
/*!40000 ALTER TABLE `node_archives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodes`
--

DROP TABLE IF EXISTS `nodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `mac_address` varchar(255) NOT NULL,
  `floor_id` int(11) NOT NULL,
  `coordinate_set` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodes`
--

LOCK TABLES `nodes` WRITE;
/*!40000 ALTER TABLE `nodes` DISABLE KEYS */;
INSERT INTO `nodes` VALUES (1,'Node 1','WXSKJRDKTVRE',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(2,'Node 2','LKDBPSXJKXNO',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(3,'Node 3','MYQMSOHLIAWQ',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(4,'Node 4','NCRTQXOJWZQH',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(5,'Node 5','TRXJUOCOUXVG',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(6,'Node 6','YFNNSMHZMWYW',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(7,'Node 7','OGUBZIELPPGP',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(8,'Node 8','LKVCPFEJZMVW',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(9,'Node 9','YHTBWJDIJTEZ',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(10,'Node 10','RYNQXXNLTOWK',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(11,'Node 11','OBKUTSZSJGRS',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(12,'Node 12','SBAQGFCFGNTQ',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(13,'Node 13','SNAZMAYNOMCQ',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(14,'Node 14','PQYQJRDZONRC',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(15,'Node 15','ZZPJFQERXVNR',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(16,'Node 16','QIWKIOSIYXOO',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(17,'Node 17','NHCSNITSLTQR',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(18,'Node 18','KUSGQNMEOOUB',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(19,'Node 19','JZKTZGOMJBEE',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(20,'Node 20','HTGMNSURBBHJ',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(21,'Node 21','QUKJKYVYXPLO',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(22,'Node 22','PICKZLIMVHKI',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(23,'Node 23','MROUPJLNDHED',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(24,'Node 24','OBHUJIOSQYMH',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(25,'Node 25','VCMIWDMKZVSZ',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(26,'Node 26','XCRGTOYUGGIQ',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(27,'Node 27','SJHQFUYKDQKH',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(28,'Node 28','QUMXQPTAYCJN',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(29,'Node 29','RDMMFPHNEQNC',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(30,'Node 30','MBAPBPCFCTYF',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(31,'Node 31','JCMWJTWDJLRA',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(32,'Node 32','GWVWSIAZNNYD',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(33,'Node 33','VEESSYSRNRPR',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(34,'Node 34','AKBIQLNULFRF',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(35,'Node 35','COCLWGRORXCM',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(36,'Node 36','MXLSICSZBSAJ',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(37,'Node 37','JFTRYYNESLIL',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(38,'Node 38','UHDYVIZHOLKU',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(39,'Node 39','RPCYCIZJKZUL',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03'),(40,'Node 40','YJDIXYWNEXIN',1,1,'2016-10-12 07:53:03','2016-10-12 07:53:03');
/*!40000 ALTER TABLE `nodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodes_archive`
--

DROP TABLE IF EXISTS `nodes_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodes_archive` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) NOT NULL,
  `x_coordinate` double DEFAULT NULL,
  `y_coordinate` double DEFAULT NULL,
  `last_transmission` varchar(255) NOT NULL,
  `packets_sent` int(11) NOT NULL,
  `packets_received` int(11) NOT NULL,
  `date_created_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nodes_archive_node_id_date_created_id` (`node_id`,`date_created_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodes_archive`
--

LOCK TABLES `nodes_archive` WRITE;
/*!40000 ALTER TABLE `nodes_archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `nodes_archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodes_present`
--

DROP TABLE IF EXISTS `nodes_present`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodes_present` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) NOT NULL,
  `x_coordinate` double NOT NULL,
  `y_coordinate` double NOT NULL,
  `last_transmission` varchar(255) NOT NULL,
  `packets_sent` int(11) NOT NULL,
  `packets_received` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodes_present`
--

LOCK TABLES `nodes_present` WRITE;
/*!40000 ALTER TABLE `nodes_present` DISABLE KEYS */;
INSERT INTO `nodes_present` VALUES (1,1,88.45863856031235,1762.457373378765,'ZIVUDOGMETZE',678,587,'2016-10-12 07:53:03'),(2,2,247.9525671811308,531.5552751603564,'ZGBZBCULAKVU',630,43,'2016-10-12 07:53:03'),(3,3,657.4681418036978,1811.4984417745363,'MGCLTTUFINZG',871,262,'2016-10-12 07:53:03'),(4,4,278.7070143924407,1795.5812956145112,'ACNRXDZNGZIH',538,746,'2016-10-12 07:53:03'),(5,5,265.7088859747505,2409.368402624301,'ANNZXOICNOCE',846,515,'2016-10-12 07:53:03'),(6,6,745.3105445959923,570.253105113803,'OWSBKMRPMQKV',360,979,'2016-10-12 07:53:03'),(7,7,128.48748387100773,349.27462247139783,'BULHYYQGVCDW',846,739,'2016-10-12 07:53:03'),(8,8,86.3525987614039,2358.7219536370394,'JRDPIEUJQFFX',89,90,'2016-10-12 07:53:03'),(9,9,88.35765847010299,1557.535656793177,'FXCGXMREUDNQ',66,730,'2016-10-12 07:53:03'),(10,10,442.34866659347597,540.1246272786564,'FWKKRYXCXHMC',812,526,'2016-10-12 07:53:03'),(11,11,510.99650897641993,1619.1949772736468,'SZLYYVFGMTQS',276,430,'2016-10-12 07:53:03'),(12,12,739.6064083064605,2323.1876687627687,'GIHDDAPFQDWM',15,757,'2016-10-12 07:53:03'),(13,13,70.8009238867105,2194.7215317672726,'BFAQHXFKHKIB',592,333,'2016-10-12 07:53:03'),(14,14,479.3789491884788,888.078720204204,'IUCRCIQJVREF',285,921,'2016-10-12 07:53:03'),(15,15,602.5353380751375,1211.6805343174096,'HUUQADVXUIFL',464,498,'2016-10-12 07:53:03'),(16,16,358.4749086309574,1188.1461923612203,'HTJTTHKPMDDX',934,209,'2016-10-12 07:53:03'),(17,17,236.1681953499791,2266.768184348336,'PSLHSAIBHBDR',627,645,'2016-10-12 07:53:03'),(18,18,546.5676500513938,1066.2245748488199,'GIKNRLKPFVOP',129,530,'2016-10-12 07:53:03'),(19,19,84.2432176783862,551.3908234405735,'KNHCAKHVLPQL',396,268,'2016-10-12 07:53:03'),(20,20,524.749001859084,364.51973325646327,'IQFCBWDECCMS',61,997,'2016-10-12 07:53:03'),(21,21,594.7471943119507,512.5773615499693,'PEUZYSHWUGEJ',540,496,'2016-10-12 07:53:03'),(22,22,439.6579790808299,1870.1062076157282,'TAWFIQXDTDAV',656,818,'2016-10-12 07:53:03'),(23,23,370.7918611696932,1050.2810857643856,'CYGKPKWKGLBG',440,919,'2016-10-12 07:53:03'),(24,24,695.5406824482432,1150.678832170699,'KWQQOWCJLDBQ',934,722,'2016-10-12 07:53:03'),(25,25,674.2972650720684,915.9620592339354,'SGCLYYEXQQCQ',461,283,'2016-10-12 07:53:03'),(26,26,387.04787391831724,2224.523985340973,'PJDJVWAAHGDQ',422,312,'2016-10-12 07:53:03'),(27,27,358.4039746495961,361.9907358818732,'KAXKCETOJPHA',353,679,'2016-10-12 07:53:03'),(28,28,716.7774729924729,385.121109840544,'MVHMPFNGTICY',471,733,'2016-10-12 07:53:03'),(29,29,110.37957285913626,1904.00489015469,'WXWAFNNUVJRR',725,142,'2016-10-12 07:53:03'),(30,30,729.737412072621,1653.5615503415959,'GVFJBLVCDIGG',935,779,'2016-10-12 07:53:03'),(31,31,293.4819504429379,1591.4440320090202,'UXTFBJGVDGTX',877,942,'2016-10-12 07:53:03'),(32,32,116.18695411246455,1214.4994476103793,'WKXLNLLXHPRY',983,967,'2016-10-12 07:53:03'),(33,33,251.54732311270175,376.61258183844006,'LXKZZDAEJEKG',47,801,'2016-10-12 07:53:03'),(34,34,611.6644609025655,2515.5971660075193,'EMADZIYFVQKA',343,642,'2016-10-12 07:53:03'),(35,35,582.1456260734443,2242.4492135712862,'ZDTNZCKFPDRS',363,554,'2016-10-12 07:53:03'),(36,36,93.07606163495387,918.480696796154,'OOLMWTTMFYAH',469,253,'2016-10-12 07:53:03'),(37,37,668.3851138608792,2179.814036863563,'BNRIGXIFRTKL',124,939,'2016-10-12 07:53:03'),(38,38,309.35162463632685,901.5546099421733,'IJJVAXIJZOHE',729,234,'2016-10-12 07:53:03'),(39,39,466.83828236908187,2395.116255812478,'URPHOLWFJDNI',491,861,'2016-10-12 07:53:03'),(40,40,109.33985967022574,1054.2624871931364,'CJKXGTTAIOKH',997,820,'2016-10-12 07:53:03');
/*!40000 ALTER TABLE `nodes_present` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodes_presents`
--

DROP TABLE IF EXISTS `nodes_presents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodes_presents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) NOT NULL,
  `x_coordinate` double NOT NULL,
  `y_coordinate` double NOT NULL,
  `last_transmission` varchar(255) NOT NULL,
  `packets_sent` int(11) NOT NULL,
  `packets_received` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodes_presents`
--

LOCK TABLES `nodes_presents` WRITE;
/*!40000 ALTER TABLE `nodes_presents` DISABLE KEYS */;
/*!40000 ALTER TABLE `nodes_presents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_data`
--

DROP TABLE IF EXISTS `sensor_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensor_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) DEFAULT NULL,
  `sensor_type_id` int(11) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_data`
--

LOCK TABLES `sensor_data` WRITE;
/*!40000 ALTER TABLE `sensor_data` DISABLE KEYS */;
INSERT INTO `sensor_data` VALUES (1,1,1,263.1137843976276,'2016-10-12 07:53:03'),(2,1,2,24.072672068248938,'2016-10-12 07:53:03'),(3,1,3,841.6158863231019,'2016-10-12 07:53:03'),(4,1,4,545.7313420400972,'2016-10-12 07:53:03'),(5,2,1,650.2697584310898,'2016-10-12 07:53:03'),(6,2,2,682.905653466887,'2016-10-12 07:53:03'),(7,2,3,217.9818533258825,'2016-10-12 07:53:03'),(8,2,4,100.77244540763208,'2016-10-12 07:53:03'),(9,3,1,869.0231223661001,'2016-10-12 07:53:03'),(10,3,2,368.05289638722365,'2016-10-12 07:53:03'),(11,3,3,164.3409929137951,'2016-10-12 07:53:03'),(12,3,4,993.6161946511596,'2016-10-12 07:53:03'),(13,4,1,609.5234755176438,'2016-10-12 07:53:03'),(14,4,2,131.77060094140185,'2016-10-12 07:53:03'),(15,4,3,82.60302535161975,'2016-10-12 07:53:03'),(16,4,4,221.04849393520684,'2016-10-12 07:53:03'),(17,5,1,504.94669986486156,'2016-10-12 07:53:03'),(18,5,2,301.9141789617825,'2016-10-12 07:53:03'),(19,5,3,872.5308320711135,'2016-10-12 07:53:03'),(20,5,4,288.45913512129835,'2016-10-12 07:53:03'),(21,6,1,827.6772461115545,'2016-10-12 07:53:03'),(22,6,2,881.6081753278506,'2016-10-12 07:53:03'),(23,6,3,175.24888542843033,'2016-10-12 07:53:03'),(24,6,4,902.1059460635678,'2016-10-12 07:53:03'),(25,7,1,518.9341786929082,'2016-10-12 07:53:03'),(26,7,2,774.0627945764355,'2016-10-12 07:53:03'),(27,7,3,253.97267898951125,'2016-10-12 07:53:03'),(28,7,4,229.5731467379939,'2016-10-12 07:53:03'),(29,8,1,472.1551658298951,'2016-10-12 07:53:03'),(30,8,2,288.06030967333925,'2016-10-12 07:53:03'),(31,8,3,307.7994293469976,'2016-10-12 07:53:03'),(32,8,4,218.82411758971637,'2016-10-12 07:53:03'),(33,9,1,122.86909291324133,'2016-10-12 07:53:03'),(34,9,2,902.772578709445,'2016-10-12 07:53:03'),(35,9,3,551.739945586798,'2016-10-12 07:53:03'),(36,9,4,4.342003334494972,'2016-10-12 07:53:03'),(37,10,1,698.5960867010016,'2016-10-12 07:53:03'),(38,10,2,736.7027865140943,'2016-10-12 07:53:03'),(39,10,3,853.9395589479312,'2016-10-12 07:53:03'),(40,10,4,850.5103945408395,'2016-10-12 07:53:03'),(41,11,1,121.12746196965706,'2016-10-12 07:53:03'),(42,11,2,973.8606051075111,'2016-10-12 07:53:03'),(43,11,3,912.5435149269248,'2016-10-12 07:53:03'),(44,11,4,852.0908738612403,'2016-10-12 07:53:03'),(45,12,1,85.0244881407926,'2016-10-12 07:53:03'),(46,12,2,285.3063637813327,'2016-10-12 07:53:03'),(47,12,3,696.8206282209255,'2016-10-12 07:53:03'),(48,12,4,583.8355564550772,'2016-10-12 07:53:03'),(49,13,1,923.6667270069341,'2016-10-12 07:53:03'),(50,13,2,207.0878894881286,'2016-10-12 07:53:03'),(51,13,3,760.9820875244752,'2016-10-12 07:53:03'),(52,13,4,603.7006989640794,'2016-10-12 07:53:03'),(53,14,1,323.0674812731015,'2016-10-12 07:53:03'),(54,14,2,445.67933159171565,'2016-10-12 07:53:03'),(55,14,3,16.61140254731599,'2016-10-12 07:53:03'),(56,14,4,323.162625918099,'2016-10-12 07:53:03'),(57,15,1,220.9951753259699,'2016-10-12 07:53:03'),(58,15,2,115.36802425413266,'2016-10-12 07:53:03'),(59,15,3,813.3809050237811,'2016-10-12 07:53:03'),(60,15,4,102.89527697426594,'2016-10-12 07:53:03'),(61,16,1,708.8223967107864,'2016-10-12 07:53:03'),(62,16,2,883.9729542777067,'2016-10-12 07:53:03'),(63,16,3,774.0860003316831,'2016-10-12 07:53:03'),(64,16,4,364.4322215815382,'2016-10-12 07:53:03'),(65,17,1,241.29967361268285,'2016-10-12 07:53:03'),(66,17,2,560.5625919615468,'2016-10-12 07:53:03'),(67,17,3,280.7257996335336,'2016-10-12 07:53:03'),(68,17,4,846.1267340624321,'2016-10-12 07:53:03'),(69,18,1,961.3576353031215,'2016-10-12 07:53:03'),(70,18,2,854.8338525147026,'2016-10-12 07:53:03'),(71,18,3,748.1860399107427,'2016-10-12 07:53:03'),(72,18,4,182.32966189236632,'2016-10-12 07:53:03'),(73,19,1,711.09261532357,'2016-10-12 07:53:03'),(74,19,2,793.046782223367,'2016-10-12 07:53:03'),(75,19,3,506.36825446975774,'2016-10-12 07:53:03'),(76,19,4,375.645909475913,'2016-10-12 07:53:03'),(77,20,1,366.22595432395707,'2016-10-12 07:53:03'),(78,20,2,847.8011067252289,'2016-10-12 07:53:03'),(79,20,3,10.199475918180008,'2016-10-12 07:53:03'),(80,20,4,3.746732386945371,'2016-10-12 07:53:03'),(81,21,1,649.9878371916813,'2016-10-12 07:53:03'),(82,21,2,553.6059013111229,'2016-10-12 07:53:03'),(83,21,3,459.20700297524223,'2016-10-12 07:53:03'),(84,21,4,921.4145720575223,'2016-10-12 07:53:03'),(85,22,1,940.5066594895578,'2016-10-12 07:53:03'),(86,22,2,910.422321049196,'2016-10-12 07:53:03'),(87,22,3,28.724857329036794,'2016-10-12 07:53:03'),(88,22,4,434.7013142884102,'2016-10-12 07:53:03'),(89,23,1,137.16423792916072,'2016-10-12 07:53:03'),(90,23,2,410.6292427941728,'2016-10-12 07:53:03'),(91,23,3,233.0258846353985,'2016-10-12 07:53:03'),(92,23,4,181.15190629175484,'2016-10-12 07:53:03'),(93,24,1,446.4340749600504,'2016-10-12 07:53:03'),(94,24,2,784.5359062369081,'2016-10-12 07:53:03'),(95,24,3,562.8342951661001,'2016-10-12 07:53:03'),(96,24,4,638.4138181404903,'2016-10-12 07:53:03'),(97,25,1,967.5185501854559,'2016-10-12 07:53:03'),(98,25,2,264.2081720324943,'2016-10-12 07:53:03'),(99,25,3,108.93367695935333,'2016-10-12 07:53:03'),(100,25,4,938.0786722858003,'2016-10-12 07:53:03'),(101,26,1,215.41019125788117,'2016-10-12 07:53:03'),(102,26,2,463.43777603335093,'2016-10-12 07:53:03'),(103,26,3,55.153319477439645,'2016-10-12 07:53:03'),(104,26,4,346.8833541039768,'2016-10-12 07:53:03'),(105,27,1,776.4415941584458,'2016-10-12 07:53:03'),(106,27,2,176.63552897370232,'2016-10-12 07:53:03'),(107,27,3,173.05417548373404,'2016-10-12 07:53:03'),(108,27,4,553.064513683108,'2016-10-12 07:53:03'),(109,28,1,771.4078278536124,'2016-10-12 07:53:03'),(110,28,2,341.971180761516,'2016-10-12 07:53:03'),(111,28,3,798.2468733311282,'2016-10-12 07:53:03'),(112,28,4,164.73419139304073,'2016-10-12 07:53:03'),(113,29,1,809.836358353022,'2016-10-12 07:53:03'),(114,29,2,615.384816011844,'2016-10-12 07:53:03'),(115,29,3,745.4779028660802,'2016-10-12 07:53:03'),(116,29,4,42.32565840511417,'2016-10-12 07:53:03'),(117,30,1,116.01912585516865,'2016-10-12 07:53:03'),(118,30,2,564.6200096018608,'2016-10-12 07:53:03'),(119,30,3,860.2427183069185,'2016-10-12 07:53:03'),(120,30,4,896.1551329569958,'2016-10-12 07:53:03'),(121,31,1,259.31840190515595,'2016-10-12 07:53:03'),(122,31,2,735.587110208736,'2016-10-12 07:53:03'),(123,31,3,413.46512229828045,'2016-10-12 07:53:03'),(124,31,4,871.299790937726,'2016-10-12 07:53:03'),(125,32,1,514.950689337966,'2016-10-12 07:53:03'),(126,32,2,943.1728001840353,'2016-10-12 07:53:03'),(127,32,3,644.6452878742595,'2016-10-12 07:53:03'),(128,32,4,708.3231487203077,'2016-10-12 07:53:03'),(129,33,1,52.15845099538977,'2016-10-12 07:53:03'),(130,33,2,436.44910181830465,'2016-10-12 07:53:03'),(131,33,3,823.6769553863146,'2016-10-12 07:53:03'),(132,33,4,744.5551478846149,'2016-10-12 07:53:03'),(133,34,1,163.08152043848148,'2016-10-12 07:53:03'),(134,34,2,400.17727386551496,'2016-10-12 07:53:03'),(135,34,3,123.48767098803998,'2016-10-12 07:53:03'),(136,34,4,855.87458590678,'2016-10-12 07:53:03'),(137,35,1,364.30588758330157,'2016-10-12 07:53:03'),(138,35,2,957.9161912254765,'2016-10-12 07:53:03'),(139,35,3,748.312322013022,'2016-10-12 07:53:03'),(140,35,4,244.28649835380887,'2016-10-12 07:53:03'),(141,36,1,898.9531851444156,'2016-10-12 07:53:03'),(142,36,2,716.8606115842324,'2016-10-12 07:53:03'),(143,36,3,375.5122832363589,'2016-10-12 07:53:03'),(144,36,4,472.86926581281267,'2016-10-12 07:53:03'),(145,37,1,664.5761128940838,'2016-10-12 07:53:03'),(146,37,2,38.886518426208625,'2016-10-12 07:53:03'),(147,37,3,128.80283181181034,'2016-10-12 07:53:03'),(148,37,4,439.1263123322228,'2016-10-12 07:53:03'),(149,38,1,465.15573666079234,'2016-10-12 07:53:03'),(150,38,2,722.1319913136263,'2016-10-12 07:53:03'),(151,38,3,183.90591205629678,'2016-10-12 07:53:03'),(152,38,4,886.1664907086328,'2016-10-12 07:53:03'),(153,39,1,730.7819437517734,'2016-10-12 07:53:03'),(154,39,2,638.3123207345496,'2016-10-12 07:53:03'),(155,39,3,443.2471962562086,'2016-10-12 07:53:03'),(156,39,4,515.3652792201243,'2016-10-12 07:53:03'),(157,40,1,219.61698847580652,'2016-10-12 07:53:03'),(158,40,2,724.8488439880703,'2016-10-12 07:53:03'),(159,40,3,298.0425645771248,'2016-10-12 07:53:03'),(160,40,4,25.142453494449043,'2016-10-12 07:53:03');
/*!40000 ALTER TABLE `sensor_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_data_archive`
--

DROP TABLE IF EXISTS `sensor_data_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensor_data_archive` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) DEFAULT NULL,
  `sensor_type_id` int(11) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `date_created_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_data_archive`
--

LOCK TABLES `sensor_data_archive` WRITE;
/*!40000 ALTER TABLE `sensor_data_archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensor_data_archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_data_archives`
--

DROP TABLE IF EXISTS `sensor_data_archives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensor_data_archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) DEFAULT NULL,
  `sensor_type_id` int(11) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `date_created_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_data_archives`
--

LOCK TABLES `sensor_data_archives` WRITE;
/*!40000 ALTER TABLE `sensor_data_archives` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensor_data_archives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_type`
--

DROP TABLE IF EXISTS `sensor_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensor_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_type`
--

LOCK TABLES `sensor_type` WRITE;
/*!40000 ALTER TABLE `sensor_type` DISABLE KEYS */;
INSERT INTO `sensor_type` VALUES (1,'Humidity'),(2,'Temperature'),(3,'Light'),(4,'Pressure');
/*!40000 ALTER TABLE `sensor_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_types`
--

DROP TABLE IF EXISTS `sensor_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensor_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_types`
--

LOCK TABLES `sensor_types` WRITE;
/*!40000 ALTER TABLE `sensor_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensor_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20160202214130-create-node.js'),('20160202214339-create-link.js'),('20160325085050-create-floor.js'),('20160403184634-create-configuration.js'),('20160423225816-create-node-archive.js'),('20160423230137-create-link-archive.js'),('20160424174753-create-datetime-archive.js'),('20160712203253-create-nodes-present.js'),('20160713010633-create-traffic.js'),('20161011131800-create-sensor-data.js'),('20161011133103-create-sensor-type.js'),('20161012062802-create-sensor-data-archive.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traffic`
--

DROP TABLE IF EXISTS `traffic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `traffic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traffic`
--

LOCK TABLES `traffic` WRITE;
/*!40000 ALTER TABLE `traffic` DISABLE KEYS */;
INSERT INTO `traffic` VALUES (1,'light'),(2,'moderate'),(3,'heavy');
/*!40000 ALTER TABLE `traffic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-12 15:58:15
