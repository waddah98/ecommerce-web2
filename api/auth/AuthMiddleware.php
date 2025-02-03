<?php

require_once __DIR__ . '/../core/jwt.php';

class AuthMiddleware {
    public static function authenticate() {
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(["message" => "Unauthorized"]);
            exit();
        }

        $token = str_replace("Bearer ", "", $headers['Authorization']);
        $decoded = JWTHandler::verifyToken($token);

        if (!$decoded) {
            http_response_code(401);
            echo json_encode(["message" => "Invalid token"]);
            exit();
        }

        return $decoded;
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
