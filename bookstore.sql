-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 29, 2024 at 11:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `book_name` text NOT NULL,
  `book_category` varchar(255) NOT NULL,
  `book_author` text NOT NULL,
  `book_desc` varchar(1000) NOT NULL,
  `book_img` varchar(255) DEFAULT 'default.jpg',
  `book_price` varchar(20) NOT NULL,
  `book_quantity` int(11) NOT NULL,
  `book_purchase` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `book_name`, `book_category`, `book_author`, `book_desc`, `book_img`, `book_price`, `book_quantity`, `book_purchase`) VALUES
(1, 'The Great Gatsby', 'Thriller', 'F. Scott Fitzgerald', 'The story of the fabulously Wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.', 'default.jpg', '10', 100, 6),
(2, 'To Kill a Mockingbird', 'Thriller', 'Harper Lee', 'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.', 'default.jpg', '12.50', 146, 8),
(3, '1984', 'Horror', 'George Orwell', 'A dystopian novel set in Airstrip One, formerly Great Britain, a province of the superstate Oceania.', 'default.jpg', '9.75', 118, 9),
(4, 'Pride and Prejudice', 'Crime', 'Jane Austen', 'A romantic novel of manners written by Jane Austen in 1813.', 'default.jpg', '8.99', 90, 0),
(5, 'The Catcher in the Rye', 'Mystery', 'J.D. Salinger', 'A story by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.', 'default.jpg', '11.25', 108, 7),
(6, 'Harry Potter and the Philosopher\'s Stone', 'Thriller', 'J.K. Rowling', 'The story of a young boy who discovers that he is a wizard.', 'default.jpg', '14.99', 200, 0),
(7, 'The Hobbit', 'Romance', 'J.R.R. Tolkien', 'A children\'s fantasy novel by English author J. R. R. Tolkien.', 'default.jpg', '13.45', 80, 0),
(8, 'The Lord of the Rings', 'Mystery', 'J.R.R. Tolkien', 'An epic high-fantasy novel by English author and scholar J. R. R. Tolkien.', 'default.jpg', '18.50', 95, 0),
(9, 'The Da Vinci Code', 'Fiction', 'Dan Brown', 'A mystery thriller novel by Dan Brown.', 'default.jpg', '10.75', 130, 0),
(10, 'The Alchemist', 'Young Adult', 'Paulo Coelho', 'The story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.', 'default.jpg', '9.99', 85, 0),
(11, 'c++', 'Science & Technology', 'Saurabh Shukla', 'this is best saurabh shukla book', 'default.jpg', '20', 9, 0),
(15, 'Andriod Developer ', 'Science & Technology', 'Harry', 'Andrid developer', 'default.jpg', '25', 10, 0),
(18, 'Barbie', 'Crime', 'JK Rowling', 'Most girls read this book', 'default.jpg', '10', 10, 0),
(19, 'R.K. Narayan – The Guide', 'Education', 'R.K. Narayan', 'R.K Narayan is best known for stories based in and around the fictional village of Malgudi.', 'default.jpg', '15', 10, 0),
(20, 'Machine Learning', 'Science & Technology', 'Asp', 'ML', 'default.jpg', '10', 11, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_details` varchar(255) NOT NULL,
  `order_quantity` int(11) NOT NULL,
  `order_price` int(11) NOT NULL,
  `order_email` varchar(255) NOT NULL,
  `order_phone` bigint(10) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_details`, `order_quantity`, `order_price`, `order_email`, `order_phone`, `order_date`) VALUES
(1, 6, '1984 (x1)', 1, 10, 'tea@gmail.com', 7821893289, '2024-06-27 17:52:06'),
(2, 10, '1984 (x1)', 1, 10, 'bran@gmail.com', 1234567890, '2024-06-29 07:04:27'),
(3, 11, 'The Catcher in the Rye (x2), c++ (x1)', 3, 43, 'branko@gmail.com', 1234567890, '2024-06-29 07:22:12'),
(5, 11, 'To Kill a Mockingbird (x2)', 2, 25, 'branko@gmail.com', 1234567890, '2024-06-29 07:30:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(20) NOT NULL,
  `city` varchar(255) NOT NULL,
  `phone` bigint(10) NOT NULL,
  `gender` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `city`, `phone`, `gender`) VALUES
(1, 'Yash', 'yash@gmail.com', 'yash', 'Pune', 1234512345, 'M'),
(2, '', 'a@gmail.com', '$2b$10$x9x1gvg6VwFfJ', '', 0, ''),
(3, 'kat', 'kat@gmail.com', '$2b$10$7Q0.h5gcUnFz.', 'mumbai', 1234123412, 'F'),
(5, 'yp', 'yp@gmail.com', '$2b$10$O6Zg25uZl9I2V', 'pune', 3434343434, 'M'),
(6, 'tea', 'tea@gmail.com', '$2b$10$oBEABn8kFNXQg', 'pune', 1234567890, 'male'),
(7, 'Mac', 'mac@gmail.com', '$2b$10$A6sIBt3yqHrlO', 'Bangalore', 8978897861, 'male'),
(10, 'bran', 'bran@gmail.com', '$2b$10$wPauMNsGMJc3a', 'mumbai', 1234567890, 'male'),
(11, 'Branko', 'branko@gmail.com', '$2b$10$3MXOMTJRhEjH2', 'mumbai', 1234123412, 'male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
