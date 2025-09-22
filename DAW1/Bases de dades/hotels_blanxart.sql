-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: hotels_blanxart
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `idHotel` int NOT NULL AUTO_INCREMENT,
  `nomHotel` varchar(45) DEFAULT NULL,
  `estrelles` int DEFAULT NULL,
  `idPais` int NOT NULL,
  `idProvincia` int NOT NULL,
  `ciutat` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idHotel`),
  KEY `fk2_idx` (`idPais`,`idProvincia`),
  CONSTRAINT `fk1` FOREIGN KEY (`idHotel`) REFERENCES `paisos` (`idPais`),
  CONSTRAINT `fk2` FOREIGN KEY (`idPais`, `idProvincia`) REFERENCES `provincies` (`idPais`, `idProvincia`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,'Hotel Barcelona Central',5,1,4,'Barcelona'),(2,'Hotel Relax Madrid',4,1,26,'Madrid'),(3,'Hotel Sevilla Comfort',4,1,35,'Sevilla'),(4,'Hotel Bilbao Plaza',3,1,5,'Bilbao'),(5,'Gran Hotel Costa del Sol',5,1,27,'Málaga'),(6,'The Manhattan Hotel',5,2,76,'New York'),(7,'Miami Beach Resort',4,2,53,'Miami'),(8,'Hollywood Hills Inn',3,2,49,'Los Angeles'),(9,'Chicago River Hotel',4,2,57,'Chicago'),(10,'Orlando Family Suites',3,2,53,'Orlando'),(11,'Hotel Eiffel Paris',5,3,162,'Paris'),(12,'Marseille Sea View',4,3,106,'Marseille'),(13,'Lyon City Hotel',3,3,157,'Lyon'),(14,'Nice Beach Hotel',4,3,99,'Nice'),(15,'Toulouse Business Hotel',4,3,123,'Toulouse'),(16,'Berlin Grand Hotel',5,5,278,'Berlin'),(17,'Munich City Center Hotel',4,5,277,'Munich'),(18,'Frankfurt Skyline Inn',4,5,282,'Frankfurt'),(19,'Hamburg Port Hotel',3,5,281,'Hamburg'),(20,'Düsseldorf Airport Hotel',4,5,284,'Düsseldorf'),(21,'Rome Historic Hotel',5,4,253,'Rome'),(22,'Venice Grand Canal Hotel',5,4,270,'Venice'),(23,'Milan Fashion District Hotel',4,4,229,'Milan'),(24,'Florence Art Hotel',4,4,210,'Florence'),(25,'Napoles Bay Resort',4,4,231,'Napoles'),(26,'Hotel W Barcelona',5,1,4,'Barcelona'),(27,'Hotel Arts Barcelona',5,1,4,'Barcelona'),(28,'Hotel Eurostars Grand Marina',5,1,4,'Barcelona'),(29,'Gran Hotel Calderón',4,1,4,'Barcelona'),(30,'Hotel Majestic Barcelona',5,1,4,'Barcelona'),(31,'The Plaza Hotel',5,2,76,'New York'),(32,'The Langham New York',5,2,76,'New York'),(33,'The Standard, High Line',4,2,76,'New York'),(34,'The New Yorker, A Wyndham Hotel',4,2,76,'New York'),(35,'Marriott Marquis',5,2,76,'New York'),(36,'Le Meurice',5,3,162,'Paris'),(37,'Shangri-La Hotel Paris',5,3,162,'Paris'),(38,'Hotel Plaza Athénée',5,3,162,'Paris'),(39,'The Peninsula Paris',5,3,162,'Paris'),(40,'Hotel La Comtesse',4,3,162,'Paris'),(41,'Hotel Eden',5,4,253,'Roma'),(42,'Rome Cavalieri, A Waldorf Astoria Hotel',5,4,253,'Roma'),(43,'Hotel Hassler Roma',5,4,253,'Roma'),(44,'NH Collection Roma Fori Imperiali',4,4,253,'Roma'),(45,'Hotel de Russie',5,4,253,'Roma'),(46,'Hotel Adlon Kempinski',5,5,278,'Berlín'),(47,'The Ritz-Carlton, Berlin',5,5,278,'Berlín'),(48,'NH Collection Berlin Friedrichstrasse',4,5,278,'Berlín'),(49,'Hotel Bristol Berlin',4,5,278,'Berlín'),(50,'Steigenberger Hotel Berlin',5,5,278,'Berlín'),(56,'Hotel Ritz Madrid',5,1,26,'Madrid'),(57,'The Westin Palace Madrid',5,1,26,'Madrid'),(58,'Hotel Urban Madrid',5,1,26,'Madrid'),(59,'NH Collection Madrid Suecia',4,1,26,'Madrid'),(60,'Gran Meliá Palacio de los Duques',5,1,26,'Madrid');
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paisos`
--

DROP TABLE IF EXISTS `paisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paisos` (
  `idPais` int NOT NULL AUTO_INCREMENT,
  `pais` varchar(50) NOT NULL,
  `pais_original` varchar(50) NOT NULL,
  PRIMARY KEY (`idPais`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paisos`
--

LOCK TABLES `paisos` WRITE;
/*!40000 ALTER TABLE `paisos` DISABLE KEYS */;
INSERT INTO `paisos` VALUES (1,'Espanya','España'),(2,'Estats Units','United States'),(3,'Francia','France'),(4,'Italia','Italia'),(5,'Alemania','Deutschland'),(6,'Afganistán','Afghanistan'),(7,'Islas Aland','Aland Islands'),(8,'Albania','Shqipëri'),(9,'Argelia','Algeria'),(10,'Andorra','Andorra'),(11,'Angola','Angola'),(12,'Antártida','Antarctica'),(13,'Argentina','Argentina'),(14,'Armenia','Armenia'),(15,'Australia','Australia'),(16,'Austria','Osterreich'),(17,'Azerbaiyán','Azerbaijan'),(18,'Bahamas','The Bahamas'),(19,'Baréin','Bahrain'),(20,'Bangladesh','Bangladesh'),(21,'Barbados','Barbados'),(22,'Bielorrusia','Belarus'),(23,'Bélgica','Belgium'),(24,'Belice','Belize'),(25,'Benín','Benin'),(26,'Bután','Bhutan'),(27,'Bolivia','Bolivia'),(28,'Bosnia y Herzegovina','Bosnia and Herzegovina'),(29,'Botsuana','Botswana'),(30,'Brasil','Brazil'),(31,'Brunéi','Brunei'),(32,'Bulgaria','Bulgaria'),(33,'Burkina Faso','Burkina Faso'),(34,'Burundi','Burundi'),(35,'Camboya','Cambodia'),(36,'Camerún','Cameroon'),(37,'Canadá','Canada'),(38,'Cabo Verde','Cape Verde'),(39,'República Centroafricana','Central African Republic'),(40,'Chad','Chad'),(41,'Chile','Chile'),(42,'China','China'),(43,'Colombia','Colombia'),(44,'Comoras','Comoros'),(45,'Congo (Brazzaville)','Congo-Brazzaville'),(46,'Congo (Kinshasa)','Congo-Kinshasa'),(47,'Costa Rica','Costa Rica'),(48,'Croacia','Croatia'),(49,'Cuba','Cuba'),(50,'Chipre','Cyprus'),(51,'República Checa','Czech Republic'),(52,'Dinamarca','Denmark'),(53,'Yibuti','Djibouti'),(54,'Dominica','Dominica'),(55,'República Dominicana','Dominican Republic'),(56,'Ecuador','Ecuador'),(57,'Egipto','Egypt'),(58,'El Salvador','El Salvador'),(59,'Guinea Ecuatorial','Equatorial Guinea'),(60,'Eritrea','Eritrea'),(61,'Estonia','Estonia'),(62,'Etiopía','Ethiopia'),(63,'Fiyi','Fiji'),(64,'Finlandia','Finland'),(65,'Gabón','Gabon'),(66,'Gambia','Gambia'),(67,'Georgia','Georgia'),(68,'Ghana','Ghana'),(69,'Grecia','Greece'),(70,'Granada','Grenada'),(71,'Guatemala','Guatemala'),(72,'Guinea','Guinea'),(73,'Guinea-Bissau','Guinea-Bissau'),(74,'Guyana','Guyana'),(75,'Haití','Haiti'),(76,'Honduras','Honduras'),(77,'Hungría','Hungary'),(78,'Islandia','Iceland'),(79,'India','India'),(80,'Indonesia','Indonesia'),(81,'Irán','Iran'),(82,'Irak','Iraq'),(83,'Irlanda','Ireland'),(84,'Israel','Israel'),(85,'Jamaica','Jamaica'),(86,'Japón','Japan'),(87,'Jordania','Jordan'),(88,'Kazajistán','Kazakhstan'),(89,'Kenia','Kenya'),(90,'Kiribati','Kiribati'),(91,'Corea del Norte','North Korea'),(92,'Corea del Sur','South Korea'),(93,'Kuwait','Kuwait'),(94,'Kirguistán','Kyrgyzstan'),(95,'Laos','Laos'),(96,'Letonia','Latvia'),(97,'Libia','Libya'),(98,'Liechtenstein','Liechtenstein'),(99,'Luxemburgo','Luxembourg'),(100,'Madagascar','Madagascar'),(101,'Malasia','Malaysia'),(102,'Malawi','Malawi'),(103,'Maldivas','Maldives'),(104,'Mali','Mali'),(105,'Malta','Malta'),(106,'Islas Marshall','Marshall Islands'),(107,'Mauritania','Mauritania'),(108,'Mauricio','Mauritius'),(109,'México','Mexico'),(110,'Micronesia','Micronesia'),(111,'Moldavia','Moldova'),(112,'Mónaco','Monaco'),(113,'Mongolia','Mongolia'),(114,'Montenegro','Montenegro'),(115,'Marruecos','Morocco'),(116,'Mozambique','Mozambique'),(117,'Myanmar','Myanmar'),(118,'Namibia','Namibia'),(119,'Nauru','Nauru'),(120,'Nepal','Nepal'),(121,'Países Bajos','Netherlands'),(122,'Nueva Zelanda','New Zealand'),(123,'Nicaragua','Nicaragua'),(124,'Níger','Niger'),(125,'Nigeria','Nigeria'),(126,'Noruega','Norway'),(127,'Omán','Oman'),(128,'Pakistán','Pakistan'),(129,'Palau','Palau'),(130,'Panamá','Panama'),(131,'Papúa Nueva Guinea','Papua New Guinea'),(132,'Paraguay','Paraguay'),(133,'Perú','Peru'),(134,'Filipinas','Philippines'),(135,'Polonia','Poland'),(136,'Portugal','Portugal'),(137,'Qatar','Qatar'),(138,'Rumania','Romania'),(139,'Rusia','Russia'),(140,'Ruanda','Rwanda'),(141,'Saint Kitts y Nevis','Saint Kitts and Nevis'),(142,'Santa Lucía','Saint Lucia'),(143,'San Vicente y las Granadinas','Saint Vincent and the Grenadines'),(144,'Samoa','Samoa'),(145,'San Marino','San Marino'),(146,'Sao Tomé y Príncipe','Sao Tomé and Príncipe'),(147,'Arabia Saudita','Saudi Arabia'),(148,'Senegal','Senegal'),(149,'Serbia','Serbia'),(150,'Seychelles','Seychelles'),(151,'Sierra Leona','Sierra Leone'),(152,'Singapur','Singapore'),(153,'Eslovaquia','Slovakia'),(154,'Eslovenia','Slovenia'),(155,'Islas Salomón','Solomon Islands'),(156,'Somalia','Somalia'),(157,'Sudáfrica','South Africa'),(158,'Sudán','Sudan');
/*!40000 ALTER TABLE `paisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincies`
--

DROP TABLE IF EXISTS `provincies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincies` (
  `idProvincia` int NOT NULL AUTO_INCREMENT,
  `idPais` int NOT NULL,
  `provincia` varchar(100) NOT NULL,
  PRIMARY KEY (`idProvincia`,`idPais`),
  KEY `idPais` (`idPais`),
  CONSTRAINT `provincies_ibfk_1` FOREIGN KEY (`idPais`) REFERENCES `paisos` (`idPais`)
) ENGINE=InnoDB AUTO_INCREMENT=292 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincies`
--

LOCK TABLES `provincies` WRITE;
/*!40000 ALTER TABLE `provincies` DISABLE KEYS */;
INSERT INTO `provincies` VALUES (1,1,'Ávila'),(2,1,'Badajoz'),(3,1,'Baleares'),(4,1,'Barcelona'),(5,1,'Bilbao'),(6,1,'Burgos'),(7,1,'Cáceres'),(8,1,'Cádiz'),(9,1,'Castellón'),(10,1,'Ciudad Real'),(11,1,'Córdoba'),(12,1,'La Coruña'),(13,1,'Cuenca'),(14,1,'Girona'),(15,1,'Granada'),(16,1,'Guadalajara'),(17,1,'Gipuzkoa'),(18,1,'Huelva'),(19,1,'Huesca'),(20,1,'Jaén'),(21,1,'La Rioja'),(22,1,'Las Palmas'),(23,1,'León'),(24,1,'Lleida'),(25,1,'Lugo'),(26,1,'Madrid'),(27,1,'Málaga'),(28,1,'Murcia'),(29,1,'Navarra'),(30,1,'Ourense'),(31,1,'Palencia'),(32,1,'Salamanca'),(33,1,'Santa Cruz de Tenerife'),(34,1,'Segovia'),(35,1,'Sevilla'),(36,1,'Soria'),(37,1,'Tarragona'),(38,1,'Teruel'),(39,1,'Toledo'),(40,1,'Valencia'),(41,1,'Valladolid'),(42,1,'Vizcaya'),(43,1,'Zamora'),(44,1,'Zaragoza'),(45,2,'Alabama'),(46,2,'Alaska'),(47,2,'Arizona'),(48,2,'Arkansas'),(49,2,'California'),(50,2,'Colorado'),(51,2,'Connecticut'),(52,2,'Delaware'),(53,2,'Florida'),(54,2,'Georgia'),(55,2,'Hawái'),(56,2,'Idaho'),(57,2,'Illinois'),(58,2,'Indiana'),(59,2,'Iowa'),(60,2,'Kansas'),(61,2,'Kentucky'),(62,2,'Luisiana'),(63,2,'Maine'),(64,2,'Maryland'),(65,2,'Massachusetts'),(66,2,'Michigan'),(67,2,'Minnesota'),(68,2,'Misisipi'),(69,2,'Misuri'),(70,2,'Montana'),(71,2,'Nebraska'),(72,2,'Nevada'),(73,2,'Nueva Hampshire'),(74,2,'Nueva Jersey'),(75,2,'Nuevo México'),(76,2,'New York'),(77,2,'Carolina del Norte'),(78,2,'Dakota del Norte'),(79,2,'Ohio'),(80,2,'Oklahoma'),(81,2,'Oregón'),(82,2,'Pensilvania'),(83,2,'Rhode Island'),(84,2,'Carolina del Sur'),(85,2,'Dakota del Sur'),(86,2,'Tennessee'),(87,2,'Texas'),(88,2,'Utah'),(89,2,'Vermont'),(90,2,'Virginia'),(91,2,'Washington'),(92,2,'Virginia Occidental'),(93,2,'Wisconsin'),(94,2,'Wyoming'),(95,3,'Ain'),(96,3,'Aisne'),(97,3,'Allier'),(98,3,'Alpes-de-Haute-Provence'),(99,3,'Alpes-Maritimes'),(100,3,'Ardèche'),(101,3,'Ardennes'),(102,3,'Ariège'),(103,3,'Aube'),(104,3,'Aude'),(105,3,'Aveyron'),(106,3,'Bouches-du-Rhône'),(107,3,'Calvados'),(108,3,'Cantal'),(109,3,'Charente'),(110,3,'Charente-Maritime'),(111,3,'Cher'),(112,3,'Corrèze'),(113,3,'Côte-d\'Or'),(114,3,'Côtes-d\'Armor'),(115,3,'Creuse'),(116,3,'Dordogne'),(117,3,'Doubs'),(118,3,'Drôme'),(119,3,'Eure'),(120,3,'Eure-et-Loir'),(121,3,'Finistère'),(122,3,'Gard'),(123,3,'Haute-Garonne'),(124,3,'Gers'),(125,3,'Gironde'),(126,3,'Hérault'),(127,3,'Ille-et-Vilaine'),(128,3,'Indre'),(129,3,'Indre-et-Loire'),(130,3,'Isère'),(131,3,'Jura'),(132,3,'Landes'),(133,3,'Loir-et-Cher'),(134,3,'Loire'),(135,3,'Loire-Atlantique'),(136,3,'Loiret'),(137,3,'Lot'),(138,3,'Lot-et-Garonne'),(139,3,'Luxemburgo'),(140,3,'Maine-et-Loire'),(141,3,'Manche'),(142,3,'Marne'),(143,3,'Haute-Marne'),(144,3,'Mayenne'),(145,3,'Meurthe-et-Moselle'),(146,3,'Meuse'),(147,3,'Morbihan'),(148,3,'Moselle'),(149,3,'Nièvre'),(150,3,'Nord'),(151,3,'Oise'),(152,3,'Orne'),(153,3,'Pas-de-Calais'),(154,3,'Puy-de-Dôme'),(155,3,'Pyrénées-Atlantiques'),(156,3,'Pyrénées-Orientales'),(157,3,'Rhône'),(158,3,'Saône-et-Loire'),(159,3,'Sarthe'),(160,3,'Savoie'),(161,3,'Haute-Savoie'),(162,3,'Paris'),(163,3,'Seine-Maritime'),(164,3,'Seine-et-Marne'),(165,3,'Yvelines'),(166,3,'Deux-Sèvres'),(167,3,'Somme'),(168,3,'Tarn'),(169,3,'Tarn-et-Garonne'),(170,3,'Var'),(171,3,'Vaucluse'),(172,3,'Vendée'),(173,3,'Vienne'),(174,3,'Haute-Vienne'),(175,3,'Vosges'),(176,3,'Yonne'),(177,3,'Territorio de Belfort'),(178,3,'Guayana Francesa'),(179,3,'Reunión'),(180,3,'San Martín'),(181,3,'San Bartolomé'),(182,3,'Mayotte'),(183,4,'Agrigento'),(184,4,'Alessandria'),(185,4,'Ancona'),(186,4,'Arezzo'),(187,4,'Ascoli Piceno'),(188,4,'Asti'),(189,4,'Bari'),(190,4,'Barletta-Andria-Trani'),(191,4,'Bologna'),(192,4,'Bolzano'),(193,4,'Brescia'),(194,4,'Brindisi'),(195,4,'Cagliari'),(196,4,'Caltanissetta'),(197,4,'Campobasso'),(198,4,'Caserta'),(199,4,'Catania'),(200,4,'Catanzaro'),(201,4,'Chieti'),(202,4,'Como'),(203,4,'Cosenza'),(204,4,'Cremona'),(205,4,'Crotone'),(206,4,'Como'),(207,4,'Enna'),(208,4,'Fermo'),(209,4,'Ferrara'),(210,4,'Firenze'),(211,4,'Foggia'),(212,4,'Forlì-Cesena'),(213,4,'Genova'),(214,4,'Gorizia'),(215,4,'Grosseto'),(216,4,'Imperia'),(217,4,'Isernia'),(218,4,'L’Aquila'),(219,4,'Latina'),(220,4,'Lecce'),(221,4,'Lecco'),(222,4,'Livorno'),(223,4,'Lodi'),(224,4,'Lucca'),(225,4,'Macerata'),(226,4,'Mantova'),(227,4,'Massa-Carrara'),(228,4,'Matera'),(229,4,'Milano'),(230,4,'Modena'),(231,4,'Napoli'),(232,4,'Novara'),(233,4,'Nuoro'),(234,4,'Oristano'),(235,4,'Padova'),(236,4,'Palermo'),(237,4,'Parma'),(238,4,'Pavia'),(239,4,'Perugia'),(240,4,'Pesaro e Urbino'),(241,4,'Pescara'),(242,4,'Piacenza'),(243,4,'Pisa'),(244,4,'Pistoia'),(245,4,'Pordenone'),(246,4,'Potenza'),(247,4,'Prato'),(248,4,'Ragusa'),(249,4,'Ravenna'),(250,4,'Reggio Calabria'),(251,4,'Reggio Emilia'),(252,4,'Rimini'),(253,4,'Roma'),(254,4,'Rovigo'),(255,4,'Salerno'),(256,4,'Sassari'),(257,4,'Savona'),(258,4,'Siena'),(259,4,'Sondrio'),(260,4,'Taranto'),(261,4,'Teramo'),(262,4,'Terni'),(263,4,'Torino'),(264,4,'Trapani'),(265,4,'Trento'),(266,4,'Treviso'),(267,4,'Trieste'),(268,4,'Udine'),(269,4,'Varese'),(270,4,'Venezia'),(271,4,'Verbania'),(272,4,'Vercelli'),(273,4,'Verona'),(274,4,'Vicenza'),(275,4,'Viterbo'),(276,5,'Baden-Württemberg'),(277,5,'Baviera (Bayern)'),(278,5,'Berlín (Berlin)'),(279,5,'Brandenburgo (Brandenburg)'),(280,5,'Bremen'),(281,5,'Hamburgo (Hamburg)'),(282,5,'Hesse (Hessen)'),(283,5,'Mecklenburg-Pomerania Occidental (Mecklenburg-Vorpommern)'),(284,5,'Renania del Norte-Westfalia (Nordrhein-Westfalen)'),(285,5,'Renania-Palatinado (Rheinland-Pfalz)'),(286,5,'Sajonia (Sachsen)'),(287,5,'Sajonia-Anhalt (Sachsen-Anhalt)'),(288,5,'Schleswig-Holstein'),(289,5,'Turingia (Thüringen)'),(290,5,'Brandenburg'),(291,5,'Bremen');
/*!40000 ALTER TABLE `provincies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-09 16:25:24
