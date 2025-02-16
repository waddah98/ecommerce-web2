<?php
// require_once __DIR__ . '/../../vendor/autoload.php';
require_once 'C:/xampp1/htdocs/ecommerce-web2/api/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth {
    private static $secretKey = "your_secret_key"; // Change this to a secure key

    public static function getUserId() {
        $headers = getallheaders(); // Get request headers
        
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(["message" => "Authorization header missing"]);
            exit();
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);

        try {
            $decoded = JWT::decode($token, new Key(self::$secretKey, 'HS256'));
            return $decoded->user_id ?? null; // Extract user_id from JWT payload
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(["message" => "Invalid or expired token"]);
            exit();
        }
    }

    public static function authorize($roles = []) {
        $headers = getallheaders();

        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(["message" => "Unauthorized"]);
            exit();
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);

        try {
            $decoded = JWT::decode($token, new Key(self::$secretKey, 'HS256'));

            if (!in_array($decoded->role, $roles)) {
                http_response_code(403);
                echo json_encode(["message" => "Forbidden"]);
                exit();
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(["message" => "Unauthorized"]);
            exit();
        }
    }
}
?>
