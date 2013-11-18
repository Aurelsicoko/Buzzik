-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mer 13 Novembre 2013 à 18:22
-- Version du serveur: 5.5.33
-- Version de PHP: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données: `buzzik`
--

-- --------------------------------------------------------

--
-- Structure de la table `buzzer`
--

CREATE TABLE `buzzer` (
  `idBuzzer` int(11) NOT NULL AUTO_INCREMENT,
  `nomBuzzer` varchar(150) NOT NULL,
  `imageBuzzer` varchar(300) NOT NULL,
  `sonnerieBuzzer` varchar(300) NOT NULL,
  PRIMARY KEY (`idBuzzer`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `buzzer`
--

INSERT INTO `buzzer` (`idBuzzer`, `nomBuzzer`, `imageBuzzer`, `sonnerieBuzzer`) VALUES
(1, 'default', '', 'default.mp3');

-- --------------------------------------------------------

--
-- Structure de la table `correspondre`
--

CREATE TABLE `correspondre` (
  `idRoom` int(11) NOT NULL,
  `email` text NOT NULL,
  `active` int(11) NOT NULL,
  KEY `idRoom` (`idRoom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `correspondre`
--

INSERT INTO `correspondre` (`idRoom`, `email`, `active`) VALUES
(13, 'aurelsicoko@gmail.com', 0),
(14, 'aurelsicoko@gmail.com', 0),
(15, 'aurelsicoko@gmail.com', 0),
(16, 'aurelsicoko@gmail.com', 0),
(17, 'aurelsicoko@gmail.com', 0),
(18, 'aurelsicoko@gmail.com', 0),
(19, 'aurelsicoko@gmail.com', 0),
(20, 'aurelsicoko@gmail.com', 0),
(21, 'aurelsicoko@gmail.com', 0),
(22, 'aurelsicoko@gmail.com', 0);

-- --------------------------------------------------------

--
-- Structure de la table `jouer`
--

CREATE TABLE `jouer` (
  `idJouer` int(11) NOT NULL AUTO_INCREMENT,
  `idRoom` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `scoreUser` int(11) NOT NULL,
  PRIMARY KEY (`idJouer`),
  KEY `idRoom` (`idRoom`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `jouer`
--

INSERT INTO `jouer` (`idJouer`, `idRoom`, `idUser`, `scoreUser`) VALUES
(1, 20, 2, 0),
(2, 21, 2, 0);

-- --------------------------------------------------------

--
-- Structure de la table `personnaliser`
--

CREATE TABLE `personnaliser` (
  `idUser` int(11) NOT NULL,
  `idBuzzer` int(11) NOT NULL,
  KEY `idUser` (`idUser`),
  KEY `idBuzzer` (`idBuzzer`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `personnaliser`
--

INSERT INTO `personnaliser` (`idUser`, `idBuzzer`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `rooms`
--

CREATE TABLE `rooms` (
  `idRoom` int(11) NOT NULL AUTO_INCREMENT,
  `nomRoom` varchar(50) NOT NULL,
  `dateRoom` int(11) NOT NULL,
  `nbUserRoom` int(11) NOT NULL,
  `nbSongRoom` int(11) NOT NULL,
  PRIMARY KEY (`idRoom`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Contenu de la table `rooms`
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
(17, 'Blind', 1382116630, 3, 20),
(18, 'Jim', 1383143465, 3, 18),
(19, 'Aurelien', 1383749040, 3, 12),
(20, 'Aurelien', 1383750425, 3, 13),
(21, 'Théo', 1383811479, 3, 26),
(22, 'test', 1384281723, 3, 15);

-- --------------------------------------------------------

--
-- Structure de la table `score`
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
-- Structure de la table `users`
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
-- Contenu de la table `users`
--

INSERT INTO `users` (`idUser`, `prenomUser`, `nomUser`, `emailUser`, `avatarUser`, `paysUser`, `ageUser`) VALUES
(2, 'Aurélien', 'Georget', 'ageorget@hotmail.fr', 'http://graph.facebook.com/aurelien.georget.16/picture', ' France', '///');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `correspondre`
--
ALTER TABLE `correspondre`
  ADD CONSTRAINT `correspondre_ibfk_1` FOREIGN KEY (`idRoom`) REFERENCES `rooms` (`idRoom`);

--
-- Contraintes pour la table `jouer`
--
ALTER TABLE `jouer`
  ADD CONSTRAINT `jouer_ibfk_1` FOREIGN KEY (`idRoom`) REFERENCES `rooms` (`idRoom`),
  ADD CONSTRAINT `jouer_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Contraintes pour la table `personnaliser`
--
ALTER TABLE `personnaliser`
  ADD CONSTRAINT `personnaliser_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`),
  ADD CONSTRAINT `personnaliser_ibfk_2` FOREIGN KEY (`idBuzzer`) REFERENCES `buzzer` (`idBuzzer`);

--
-- Contraintes pour la table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);
