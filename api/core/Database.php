<?php
class Database {
    private static $host = "127.0.0.0";
    private static $db_name = "bookstore";
    private static $username = "root";
    private static $password = "0000";
    private static $conn = null;

    public static function getConnection() {
        if (self::$conn === null) {
            self::$conn = new mysqli(self::$host, self::$username, self::$password, self::$db_name);

            if (self::$conn->connect_error) {
                die("Database connection failed: " . self::$conn->connect_error);
            }
        }

        return self::$conn;
    }
}
?>
