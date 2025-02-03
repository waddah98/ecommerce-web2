<?php

require_once __DIR__ . '/../core/jwt.php';
require_once __DIR__ . '/../modules/users/UserModel.php';

class AuthController {
    private $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    public function login() {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input['email'], $input['password'])) {
            http_response_code(400);
            echo json_encode(["message" => "Email and password required"]);
            return;
        }

        $user = $this->userModel->getUserByEmail($input['email']);
        if (!$user || !password_verify($input['password'], $user['password'])) {
            http_response_code(401);
            echo json_encode(["message" => "Invalid credentials"]);
            return;
        }

        $token = JWTHandler::generateToken($user);
        echo json_encode(["token" => $token, "role" => $user['role']]);
    }
}
