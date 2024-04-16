-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 12/04/2024 às 03:08
-- Versão do servidor: 8.0.33
-- Versão do PHP: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ford_carro`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `jogador`
--

CREATE TABLE `jogador` (
  `id` int NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `sexo` varchar(25) DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
  `log` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tempos` varchar(2000) DEFAULT NULL,
  `velocidade` varchar(255) DEFAULT NULL,
  `distancia` varchar(255) DEFAULT NULL,
  `forca` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'aguardando',
  `dataCadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `jogador`
--

INSERT INTO `jogador` (`id`, `nome`, `sexo`, `score`, `log`, `tempos`, `velocidade`, `distancia`, `forca`, `status`, `dataCadastro`) VALUES
(3, 'DAVI', 'M', '900', '', NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 11:01:20'),
(4, 'DAVI', 'M', '620', '', NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 11:01:32'),
(5, 'DAVI CARDOSO', 'M', '783', '', NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 11:02:05'),
(6, 'GIAN', 'M', '430', '', NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 11:01:32'),
(7, 'ANDRÉ', 'H', '621', '', NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 11:02:05'),
(8, 'FFF', 'M', '2051', '[69954,69960,69963,69995,69998,70001,70003,70004,70006,70007,70008,70009,70011,70014,70015,70016,70020,70021,70022,70023,70024,70025,70026,70027,70028,70029,70034,70036,70037,70038,70039,70040,70040,70041,70042,70049,70050,70051,70052,70052,70054,70056,70059,70059,70060,70061,70063,70064,70067,70068,70098,70101,70139,70142,70144,70149,70150]', '[69954,69960,69963,69995,69998,70001,70003,70004,70006,70007,70008,70009,70011,70014,70015,70016,70020,70021,70022,70023,70024,70025,70026,70027,70028,70029,70034,70036,70037,70038,70039,70040,70040,70041,70042,70049,70050,70051,70052,70052,70054,70056,70059,70059,70060,70061,70063,70064,70067,70068,70098,70101,70139,70142,70144,70149,70150]', '0.06', '28,50', '28.41', 'finalizado', '2024-04-04 15:50:21'),
(9, 'GGGGG', 'M', NULL, NULL, NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 19:37:47'),
(10, 'GGGGG', 'M', NULL, NULL, NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 19:37:47'),
(11, 'GGGGG', 'M', NULL, NULL, NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 19:37:47'),
(12, 'GGGGG', 'M', NULL, NULL, NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 19:37:47'),
(13, 'GGGGG', 'M', NULL, NULL, NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 19:37:47'),
(14, 'GGG', 'M', NULL, NULL, NULL, NULL, NULL, NULL, 'aguardando', '2024-04-04 19:37:49'),
(15, 'GIAN', 'H', '592', '[]', '[70718,70720,70722,70724,70727,70730]', '0.28', '3,00', '138.89', 'finalizado', '2024-04-04 19:38:19'),
(16, 'LL', 'M', '670', '[71113,71117,71120,71122,71123,71125,71127,71129]', '[71113,71117,71120,71122,71123,71125,71127,71129]', '0.25', '4,00', '125.00', 'finalizado', '2024-04-04 19:39:16'),
(17, 'ggggg', 'M', '541', '[]', '[71113,71117,71120,71122,71123,71125,71127,71129,71157,71159]', '0.25', '5,00', '125.00', 'finalizado', '2024-04-04 19:45:55'),
(18, 'HHYU', 'M', '792', '[]', '[71176,71178,71180,71183,71184,71186,71188,71190,71192,71194]', '0.31', '5,00', '156.25', 'finalizado', '2024-04-04 19:46:13'),
(19, 'GIAN', 'M', '685', '[]', '[71347,71350,71353,71356,71359,71361,71363,71365,71367]', '0.21', '4,50', '104.17', 'finalizado', '2024-04-04 19:49:02'),
(20, 'GIAN', 'M', '662', '[]', '[71455,71457,71459,71462,71464,71467,71469,71473]', '0.28', '4,00', '138.89', 'finalizado', '2024-04-04 19:50:45'),
(21, 'DAVI', 'M', '439', '[]', '[28583,28589,28592,28595]', '0.17', '2,00', '83.33', 'finalizado', '2024-04-05 07:56:05'),
(22, 'DAY', 'M', '454', '[]', '[30703,30705,30709]', '0.30', '1,80', '150.00', 'finalizado', '2024-04-05 08:31:09'),
(23, 'TESTTTT', 'M', '314', '[]', '[32266,32269,32283,32290]', '0.10', '2,40', '50.00', 'finalizado', '2024-04-05 08:57:34'),
(24, 'FFFFFFF', 'M', NULL, '[32412]', NULL, NULL, NULL, NULL, 'aguardando', '2024-04-05 09:00:10'),
(25, 'AAAAA', 'M', '-62', '[]', '[32412,32471,32482,32486,32491,32496,32501]', '0.04', '4,20', '18.99', 'finalizado', '2024-04-05 09:01:03'),
(26, 'BBB', 'M', '666', '[]', '[32534,32539,32542,32546,32549,32552,32554,32557,32559,32562]', '0.20', '6,00', '100.00', 'finalizado', '2024-04-05 09:02:08'),
(27, 'DAY', 'M', '942', '[]', '[32893,32896,32898,32899,32899,32900,32901,32902,32903,32903,32904]', '0.50', '6,60', '250.00', 'finalizado', '2024-04-05 09:07:36'),
(28, 'CASSIA', 'M', '707', '[]', '[33072,33082,33084,33085,33087,33089,33091,33092,33094,33095]', '0.20', '6,00', '100.00', 'finalizado', '2024-04-05 09:10:04'),
(29, 'DAY', 'M', '856', '[]', '[33303,33306,33308,33309,33310,33311,33312,33313,33314,33315]', '0.43', '6,00', '214.29', 'finalizado', '2024-04-05 09:13:29'),
(30, 'DAY', 'M', '890', '[]', '[33376,33379,33380,33381,33382,33383,33384,33384,33385,33386]', '0.50', '6,00', '250.00', 'finalizado', '2024-04-05 09:16:11'),
(31, 'AAAA', 'M', '867', '[]', '[34013,34015,34016,34017,34018,34018,34019,34020,34020,34021,34021,34022,34023,34024]', '0.60', '8,40', '300.00', 'finalizado', '2024-04-05 09:20:06'),
(32, 'FFFF', 'M', '840', '[]', '[34112,34114,34116,34117,34118,34119,34120,34121,34122,34123,34124,34125,34126,34127,34128]', '0.50', '9,00', '250.00', 'finalizado', '2024-04-05 09:28:27'),
(33, 'GIAN', 'M', '849', '[]', '[34463,34466,34467,34468,34469,34470,34470,34471,34472,34473,34474,34474,34476,34477,34478]', '0.50', '9,00', '250.00', 'finalizado', '2024-04-05 09:33:37'),
(34, 'LETICIA', 'M', '857', '[]', '[34792,34795,34796,34797,34798,34799,34800,34800,34801,34802,34803,34804,34805,34805,34806]', '0.50', '9,00', '250.00', 'finalizado', '2024-04-05 09:37:24'),
(35, 'GGGG', 'M', NULL, '[63231]', NULL, NULL, NULL, NULL, 'aguardando', '2024-04-11 17:28:53'),
(36, 'DAVI', 'H', '995', '[]', '[63231,65222,65227,65228]', '0.00', '2,40', '0.60', 'finalizado', '2024-04-11 17:43:59');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `jogador`
--
ALTER TABLE `jogador`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `jogador`
--
ALTER TABLE `jogador`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
