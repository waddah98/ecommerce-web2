<?php

require_once __DIR__ . '/../core/jwt.php';

class AuthMiddleware {
    public static function authenticate() {
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(["message" => "Authorization header missing"]);
            exit();
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);
        try {
            $decoded = JWT::decode($token, JWT_SECRET, ['HS256']);
            // Attach the decoded token to the request for later use
            $_SERVER['user'] = $decoded;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(["message" => "Invalid or expired token"]);
            exit();
        }
    }

    public static function authorize($role) {
        $decoded = self::authenticate();
        if ($decoded->role !== $role) {
            http_response_code(403);
            echo json_encode(["message" => "Forbidden"]);
            exit();
        }
    }
}
