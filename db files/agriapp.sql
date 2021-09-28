-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 28, 2021 at 11:31 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agriapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(255) NOT NULL,
  `user` int(255) NOT NULL,
  `message` text NOT NULL,
  `dateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `user`, `message`, `dateTime`) VALUES
(1, 1, 'sdfsd', '2021-09-19 14:43:35'),
(2, 1, 'h', '2021-09-19 14:44:58'),
(3, 1, 'ddd', '2021-09-19 14:50:02'),
(4, 1, 'fff', '2021-09-20 14:51:09'),
(5, 1, 'ff', '2021-09-20 14:51:30'),
(6, 1, 'ff', '2021-09-20 14:51:50'),
(7, 1, 'gggggg', '2021-09-20 14:52:03'),
(8, 1, 'hhhhhx tu', '2021-09-20 14:53:58'),
(9, 4, 'fhj', '2021-09-20 14:55:40'),
(10, 1, 'hhssf', '2021-09-20 14:55:56'),
(11, 1, 'jjj', '2021-09-20 14:57:25'),
(12, 1, 'jjjjjjjj', '2021-09-20 14:57:30'),
(13, 1, 'fff', '2021-09-20 14:59:22'),
(14, 1, 'gggggg', '2021-09-20 14:59:33'),
(15, 1, 'fff', '2021-09-20 15:00:20'),
(16, 1, 'ff', '2021-09-20 15:00:25'),
(17, 1, 'hhhh', '2021-09-20 15:13:18'),
(18, 1, 'fgg', '2021-09-20 15:15:11'),
(19, 1, 'ggg', '2021-09-20 15:15:25'),
(20, 1, 'gggggg dfgkdg.  do;\'fgk. \'dg dfgg. gdfdf df\' ; g\'df DG. do;fgdgg.  g \'dfkg;\'dfkg;', '2021-09-20 15:15:49'),
(21, 1, 'cxvcxvcxv', '2021-09-20 15:24:02'),
(22, 1, 'dd', '2021-09-20 15:24:52'),
(23, 1, 'f', '2021-09-20 15:26:03'),
(24, 1, 'hhhh', '2021-09-20 15:26:34'),
(25, 1, 'g', '2021-09-20 15:26:37'),
(26, 1, 'h', '2021-09-20 15:26:44'),
(27, 1, 'hh', '2021-09-20 15:26:56'),
(28, 1, 'ff', '2021-09-20 15:27:04'),
(29, 1, 'uu', '2021-09-20 15:27:06'),
(30, 1, 'hh', '2021-09-20 15:27:07'),
(31, 1, 'u', '2021-09-20 15:27:12'),
(32, 1, '', '2021-09-20 15:27:40'),
(33, 1, '', '2021-09-20 15:27:42'),
(34, 1, '', '2021-09-20 15:27:44'),
(35, 1, '', '2021-09-20 15:27:47'),
(36, 1, '', '2021-09-20 15:27:56'),
(37, 1, '', '2021-09-20 15:28:05'),
(38, 1, '', '2021-09-20 15:28:08'),
(39, 1, '', '2021-09-20 15:28:12'),
(40, 1, '', '2021-09-20 15:29:14'),
(41, 1, '', '2021-09-20 15:29:27'),
(42, 1, '', '2021-09-20 15:29:37'),
(43, 1, '', '2021-09-20 15:29:46'),
(44, 1, 'hhsdg', '2021-09-20 15:30:37'),
(45, 1, 'vb', '2021-09-20 15:30:39'),
(46, 1, 'h', '2021-09-20 15:30:42'),
(47, 1, 'sdfsdfd', '2021-09-20 15:30:56'),
(48, 1, 'hh', '2021-09-20 15:30:58'),
(49, 1, 'hello', '2021-09-20 15:31:09'),
(50, 1, 'hhh', '2021-09-20 17:00:26'),
(51, 1, 'hello', '2021-09-20 17:00:35'),
(52, 1, 'fff', '2021-09-20 17:02:55'),
(53, 1, 'hhh', '2021-09-20 17:04:30'),
(54, 1, 'dfdsf', '2021-09-20 17:05:12'),
(55, 1, 'xxv', '2021-09-20 17:05:32'),
(56, 1, '122', '2021-09-20 17:17:23'),
(57, 1, 'f', '2021-09-20 17:18:20'),
(58, 1, 'sdfdsf', '2021-09-20 17:19:41'),
(59, 1, 'sdf', '2021-09-20 17:20:00'),
(60, 1, 'ga', '2021-09-20 17:22:15'),
(61, 1, 'uu', '2021-09-20 17:23:17'),
(62, 1, 'ghlhfhh', '2021-09-20 17:23:27'),
(63, 1, 'hhh', '2021-09-20 17:23:44'),
(64, 1, 'ttt', '2021-09-20 17:23:47'),
(65, 1, 'hhh\n', '2021-09-20 21:05:28'),
(66, 1, 'gg', '2021-09-20 21:05:42'),
(67, 1, 'hhh', '2021-09-20 21:06:37'),
(68, 1, 'hgjgj', '2021-09-20 21:35:43'),
(69, 1, 'hjk', '2021-09-20 21:39:13'),
(70, 1, 'heee', '2021-09-24 18:04:51');

-- --------------------------------------------------------

--
-- Table structure for table `diseaseInfo`
--

CREATE TABLE `diseaseInfo` (
  `id` int(255) NOT NULL,
  `disease` int(255) NOT NULL,
  `district` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `diseaseInfo`
--

INSERT INTO `diseaseInfo` (`id`, `disease`, `district`) VALUES
(1, 1, 'Idukki'),
(2, 2, 'Idukki'),
(3, 30, 'Ernakulam'),
(4, 30, 'Ernakulam'),
(5, 30, 'Ernakulam'),
(6, 30, 'Ernakulam'),
(7, 30, 'Ernakulam'),
(8, 30, 'Ernakulam');

-- --------------------------------------------------------

--
-- Table structure for table `diseases`
--

CREATE TABLE `diseases` (
  `id` int(255) NOT NULL,
  `disease` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `diseases`
--

INSERT INTO `diseases` (`id`, `disease`) VALUES
(1, 'Apple Scab'),
(2, 'Black Rot'),
(3, 'Cedar Apple Rust'),
(6, 'Powdery Mildew'),
(8, 'Gray Leaf Spot'),
(9, 'Common Rust'),
(10, 'Northern Corn Leaf Blight'),
(12, 'Grape Black Rot'),
(13, 'Grape Esca'),
(14, 'Grape Leaf Blight'),
(16, 'Citrus Greening'),
(17, 'Peach Bacterial Spot'),
(19, 'Pepper Bacterial Spot'),
(21, 'Potato Early Blight'),
(22, 'Potato Late Blight'),
(26, 'Powdery Mildew in Spinach'),
(27, 'Strawberry Leaf Scorch'),
(29, 'Tomato Bacterial Spot'),
(30, 'Tomato Early Blight'),
(31, 'Tomato Late Blight'),
(32, 'Tomato Leaf Mold'),
(33, 'Tomato Septoria Leaf Spot'),
(34, 'Tomato Spider Mite'),
(35, 'Tomato Target Spot'),
(36, 'Tomato Yellow Lea Curl'),
(37, 'Tomato Mosaic Virus');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` varchar(30) NOT NULL,
  `place` text NOT NULL,
  `district` varchar(30) NOT NULL,
  `dateTime` datetime NOT NULL,
  `user` int(255) NOT NULL,
  `pic` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `place`, `district`, `dateTime`, `user`, `pic`) VALUES
(1, 'Tomat10', '15', 'Irinjalakuda', 'Alappuzha', '2021-09-15 00:50:13', 1, 'http://10.0.2.2:3000/itemPics/1_1.jpg'),
(2, 'Tomato', '25', 'Irinjalakuda', 'Thrissur', '2021-09-15 09:24:33', 1, 'http://10.0.2.2:3000/itemPics/6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b1_1.jpg'),
(3, 'Potato', '12', 'Irinjalakuda', 'Irinjalakuda', '2021-09-16 03:40:47', 5, 'http://10.0.2.2:3000/itemPics/undefined30244186-e70d-40a6-9795-13603ba96b2e9154420335646437379.jpg'),
(4, 'Ginger', '300', 'Puthenchira', 'Puthenchira', '2021-09-16 03:53:46', 5, 'http://10.0.2.2:3000/itemPics/12120d0b4fb5-2ef7-4793-95cf-6de787fdc883993541812850590885.jpg'),
(5, 'hsdfdsf', '12', 'dfg', 'dfg', '2021-09-16 03:55:07', 5, 'http://10.0.2.2:3000/itemPics/1212a11d45e4-5ab2-4eac-a0f4-ce516ff982263836378473167278242.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `lands`
--

CREATE TABLE `lands` (
  `id` int(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` varchar(30) NOT NULL,
  `place` text NOT NULL,
  `district` varchar(30) NOT NULL,
  `user` int(255) NOT NULL,
  `pic` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lands`
--

INSERT INTO `lands` (`id`, `name`, `price`, `place`, `district`, `user`, `pic`) VALUES
(1, 'Fertile Land', '120000', 'Avittathur', 'Thrissur', 1, 'http://10.0.2.2:3000/landPics/9567836661c39a00c3-ae4a-4d9e-a7f3-120430ee1da14595456312966411797.jpg'),
(2, 'ghffg', '132', 'dfgdfg', 'dfgdfg', 1, 'http://10.0.2.2:3000/landPics/956783666193724ef4-fcc4-4afd-8028-35f503ddbeab892153243351812989.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(255) NOT NULL,
  `label` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `dateTime` datetime NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `label`, `title`, `content`, `dateTime`, `status`) VALUES
(1, 'Weather', 'Hello', 'hai', '2021-09-25 20:17:37', 'success'),
(2, 'Push', '123123', '12', '2021-09-25 20:35:32', 'success');

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `id` int(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` varchar(30) NOT NULL,
  `place` text NOT NULL,
  `district` varchar(30) NOT NULL,
  `user` int(255) NOT NULL,
  `pic` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id`, `name`, `price`, `place`, `district`, `user`, `pic`) VALUES
(1, 'Harvester', '5000', 'Irinjalakuda', 'Idukki', 1, 'http://10.0.2.2:3000/toolPics/1_1.jpeg'),
(2, 'Tiller0', '2500', 'Irinjalakuda', 'Thrissur', 1, 'http://10.0.2.2:3000/toolPics/6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b1_1.jpg'),
(3, 'Harvester', '5000', 'Ijk', 'Ijk', 5, 'http://10.0.2.2:3000/toolPics/1212cec34d0b-44a3-4bc7-a139-22a6ad6d09aa7555001925506696534.jpg'),
(4, 'Plougher', '200', 'IJK', 'IJK', 5, 'http://10.0.2.2:3000/toolPics/1212c74e3237-c721-4b6e-b9bf-71b80cc1f03a3066167305014958557.jpg'),
(5, 'fdfxgdfg', '45', 'dfgfd', 'dfgfd', 5, 'http://10.0.2.2:3000/toolPics/1212bfdb5794-9b63-4ad4-b8f9-7c2e09e20903601570641905937318.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `place` text NOT NULL,
  `district` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `joinDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `place`, `district`, `password`, `joinDate`) VALUES
(1, 'Vishnu Murali', '9567836661', 'Thevara1', 'Ernakulam', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', '2021-09-15'),
(5, 'n', '1212', 'Vipin', 'Ernakulam', '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', '2021-09-16'),
(7, 'VMVM', '1234567891', 'Cochin-5', 'Ernakulam', '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', '2021-09-17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `diseaseInfo`
--
ALTER TABLE `diseaseInfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `diseases`
--
ALTER TABLE `diseases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lands`
--
ALTER TABLE `lands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `diseaseInfo`
--
ALTER TABLE `diseaseInfo`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `diseases`
--
ALTER TABLE `diseases`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `lands`
--
ALTER TABLE `lands`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
