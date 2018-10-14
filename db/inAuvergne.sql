-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Dim 14 Octobre 2018 à 09:28
-- Version du serveur :  5.7.22-0ubuntu0.16.04.1
-- Version de PHP :  7.1.18-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `inAuvergne`
--

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `id_quizz` int(11) NOT NULL,
  `visual_src` varchar(255) DEFAULT NULL,
  `oral_src` varchar(255) DEFAULT NULL,
  `other_src` varchar(255) DEFAULT NULL,
  `question` text NOT NULL,
  `answer1` text,
  `answer2` text,
  `answer3` text,
  `answer4` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `questions`
--

INSERT INTO `questions` (`id`, `id_quizz`, `visual_src`, `oral_src`, `other_src`, `question`, `answer1`, `answer2`, `answer3`, `answer4`) VALUES
(1, 1, NULL, NULL, NULL, 'Le terme "pompiers" vous évoque en priorité ?', 'La sirène', 'Le camion rouge avec tout le matériel : la lance, les tuyaux, l\'échelle, etc.', 'Le feu, l\'incendie, le brûlé', NULL),
(2, 1, NULL, NULL, NULL, 'Imaginez que vous avez très envie de manger une pomme, vous vous la représentez ?', 'Croquante sous la dent', 'Brillante, d\'une belle couleur', 'D\'une jolie forme ronde, agréable dans la main', NULL),
(3, 1, NULL, NULL, NULL, 'Ce que vous appréciez le plus, lorsque vous prenez votre petit-déjeuner dans un café, c\'est', 'L\'ambiance des gens qui discutent', 'Le cadre, le décor', 'L\'odeur du café', NULL),
(4, 1, NULL, NULL, NULL, 'Chez un bébé, le plus "délicieux", c\'est', 'Ses gazouillis', 'Sa douceur', 'Son sourire', NULL),
(5, 1, NULL, NULL, NULL, 'Lorsque vous pensez à la mer, qu\'est -ce qui est le plus évocateur pour vous ?', 'Le bruit des vagues', 'Le vent, l\'iode', 'Le contact de l\'eau sur votre corps', NULL),
(6, 1, NULL, NULL, NULL, '\r\nLorsque vous évoquez la campagne au printemps, vous pensez surtout', 'Au chant des oiseaux', 'À la végétation, aux arbres en fleurs', 'Aux grandes balades à pied et à la saine fatigue physique', NULL),
(7, 1, NULL, NULL, NULL, 'Lorsque vous flânez dans une librairie, le plus agréable :', 'Écouter les conversations, discuter avec le libraire', 'Lire quelques lignes, regarder les couvertures', 'Feuilleter les livres, les prendre dans vos mains', NULL),
(8, 1, NULL, NULL, NULL, 'Lorsque vous êtes d\'humeur mélancolique, qu\'est-ce qui vous tire le plus facilement une larme?', 'Écouter de la musique classique', 'Regarder de vieilles photos', 'Vous promener sous la pluie', NULL),
(9, 1, NULL, NULL, NULL, 'Parmi ces critères, lequel est prioritaire dans le choix d\'un nouvel appartement', 'Un endroit silencieux, un environnement agréable', 'Une cuisine spacieuse, pratique', 'Une vue imprenable', NULL),
(10, 1, NULL, NULL, NULL, 'Votre gâteau préféré, lorsque vous y pensez', 'Vous en sentez la texture', 'Vous le visualisez', 'Vous voyez déjà votre cuillère plongée à l\'intérieur…', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `quizz`
--

CREATE TABLE `quizz` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `quizz`
--

INSERT INTO `quizz` (`id`, `name`, `description`) VALUES
(1, 'Qui est tu ?', 'Ce test est destiné à meiux cerner tes capacités');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `login_token` varchar(255) DEFAULT NULL,
  `first_connection` date DEFAULT NULL,
  `visual_skill` int(11) DEFAULT NULL,
  `auditive_skill` int(11) DEFAULT NULL,
  `other_skill` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `firstname`, `lastname`, `login_token`, `first_connection`, `visual_skill`, `auditive_skill`, `other_skill`) VALUES
(1, 'Aubind97', '$2y$10$Rvw7aKCkjzvNRdidD/RFM.7uKNwCs1erNATLwCVP1UphhHWQh71CW', 'Aubin', 'DETERNE', 'unSuperToken', '2018-10-13', 60, 20, 20);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `quizz`
--
ALTER TABLE `quizz`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT pour la table `quizz`
--
ALTER TABLE `quizz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
