-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 30, 2013 at 02:03 PM
-- Server version: 5.5.33
-- PHP Version: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `buzzik`
--

-- --------------------------------------------------------

--
-- Table structure for table `buzzer`
--

CREATE TABLE `buzzer` (
  `idBuzzer` int(11) NOT NULL AUTO_INCREMENT,
  `nomBuzzer` varchar(150) NOT NULL,
  `imageBuzzer` varchar(300) NOT NULL,
  `sonnerieBuzzer` varchar(300) NOT NULL,
  PRIMARY KEY (`idBuzzer`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `buzzer`
--

INSERT INTO `buzzer` (`idBuzzer`, `nomBuzzer`, `imageBuzzer`, `sonnerieBuzzer`) VALUES
(1, 'default', '', 'default.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `correspondre`
--

CREATE TABLE `correspondre` (
  `idRoom` int(11) NOT NULL,
  `email` text NOT NULL,
  `active` int(11) NOT NULL,
  KEY `idRoom` (`idRoom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `correspondre`
--

INSERT INTO `correspondre` (`idRoom`, `email`, `active`) VALUES
(13, 'aurelsicoko@gmail.com', 0),
(14, 'aurelsicoko@gmail.com', 0),
(15, 'aurelsicoko@gmail.com', 0),
(16, 'aurelsicoko@gmail.com', 0),
(17, 'aurelsicoko@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `jouer`
--

CREATE TABLE `jouer` (
  `idJouer` int(11) NOT NULL AUTO_INCREMENT,
  `idRoom` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `scoreUser` int(11) NOT NULL,
  PRIMARY KEY (`idJouer`),
  KEY `idRoom` (`idRoom`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `personnaliser`
--

CREATE TABLE `personnaliser` (
  `idUser` int(11) NOT NULL,
  `idBuzzer` int(11) NOT NULL,
  KEY `idUser` (`idUser`),
  KEY `idBuzzer` (`idBuzzer`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personnaliser`
--

INSERT INTO `personnaliser` (`idUser`, `idBuzzer`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `idRoom` int(11) NOT NULL AUTO_INCREMENT,
  `nomRoom` varchar(50) NOT NULL,
  `dateRoom` int(11) NOT NULL,
  `nbUserRoom` int(11) NOT NULL,
  `nbSongRoom` int(11) NOT NULL,
  PRIMARY KEY (`idRoom`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`idRoom`, `nomRoom`, `dateRoom`, `nbUserRoom`, `nbSongRoom`) VALUES
(1, 'AurÃ©lien', 0, 3, 31),
(2, 'Aurélien', 0, 2, 23),
(3, 'Aurélien', 0, 3, 23),
(4, 'BlindPote', 1381681011, 4, 31),
(5, 'Bigot', 1381681296, 3, 19),
(6, 'Aurélien', 1381681847, 2, 29),
(7, 'Bigot', 1381681962, 2, 22),
(8, 'BlindTest', 1381741492, 3, 18),
(9, 'test1', 1381753241, 3, 29),
(10, 'Jim', 1381914243, 2, 17),
(11, 'BlindTest', 1382024368, 3, 23),
(12, 'test', 1382105817, 3, 22),
(13, 'Test', 1382107188, 2, 20),
(14, 'sqds', 1382107476, 2, 21),
(15, 'qsqd', 1382107842, 2, 15),
(16, 'qds', 1382110264, 2, 22),
(17, 'Blind', 1382116630, 3, 20);

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `idScore` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `scoreUser` int(11) NOT NULL,
  `dateScoreUser` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idScore`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `prenomUser` varchar(50) NOT NULL,
  `nomUser` varchar(60) NOT NULL,
  `emailUser` varchar(150) NOT NULL,
  `avatarUser` varchar(300) NOT NULL,
  `paysUser` varchar(100) NOT NULL,
  `ageUser` varchar(10) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `prenomUser`, `nomUser`, `emailUser`, `avatarUser`, `paysUser`, `ageUser`) VALUES
(2, 'Aurélien', 'Georget', 'ageorget@hotmail.fr', 'http://graph.facebook.com/aurelien.georget.16/picture', ' France', '///');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `correspondre`
--
ALTER TABLE `correspondre`
  ADD CONSTRAINT `correspondre_ibfk_1` FOREIGN KEY (`idRoom`) REFERENCES `rooms` (`idRoom`);

--
-- Constraints for table `jouer`
--
ALTER TABLE `jouer`
  ADD CONSTRAINT `jouer_ibfk_1` FOREIGN KEY (`idRoom`) REFERENCES `rooms` (`idRoom`),
  ADD CONSTRAINT `jouer_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Constraints for table `personnaliser`
--
ALTER TABLE `personnaliser`
  ADD CONSTRAINT `personnaliser_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`),
  ADD CONSTRAINT `personnaliser_ibfk_2` FOREIGN KEY (`idBuzzer`) REFERENCES `buzzer` (`idBuzzer`);

--
-- Constraints for table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);
