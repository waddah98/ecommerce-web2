<?php

class Database {
    private static $pdo = null;
    private static $config;

    public static function connect() {
        if (self::$pdo === null) {
            self::$config = require __DIR__ . '/../config/config.php';
            $host = self::$config['database']['host'];
            $port = self::$config['database']['port'];
            $dbname = self::$config['database']['dbname'];
            $username = self::$config['database']['username'];
            $password = self::$config['database']['password'];

            try {
                // Connect to MySQL without specifying a database
                $pdo = new PDO("mysql:host=$host;port=$port", $username, $password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                ]);

                // Check if database exists, if not, create it
                $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
                
                // Now connect to the newly created database
                self::$pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                ]);

                // Create tables if they do not exist
                self::createTables();
                
            } catch (PDOException $e) {
                die("Database connection failed: " . $e->getMessage());
            }
        }
        return self::$pdo;
    }

    private static function createTables() {
        $queries = [
            "CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",

            "CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            )",

            "CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                published_year INT,
                description TEXT,
                price DECIMAL(10,2) NOT NULL,
                quantity INT NOT NULL DEFAULT 0,
                category_id INT,
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
            )"
        ];

        foreach ($queries as $query) {
            self::$pdo->exec($query);
        }
    }
}