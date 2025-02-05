<?php

require_once __DIR__ . '/../core/jwt.php';
require_once __DIR__ . '/../modules/users/UserModel.php';
require_once __DIR__ . '/../core/Response.php';

class AuthController {
    private $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    public function login() {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input['email'], $input['password'])) {
            Response::json(["message" => "Email and password required"], 400);
        }

        $user = $this->userModel->getUserByEmail($input['email']);
        if (!$user || !password_verify($input['password'], $user['password'])) {
            Response::json(["message" => "Invalid credentials"], 401);
        }

        $token = JWTHandler::generateToken($user);
        Response::json(["token" => $token, "role" => $user['role']]);
    }


    public function signup() {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input['name'], $input['email'], $input['password'], $input['role'])) {
            Response::json(["message" => "All fields (name, email, password, role) are required"], 400);
        }

        if (!in_array($input['role'], ['admin', 'customer'])) {
            Response::json(["message" => "Invalid role. Allowed roles: admin, customer"], 400);
        }

        // Check if email is already taken
        if ($this->userModel->getUserByEmail($input['email'])) {
            Response::json(["message" => "Email already registered"], 409);
        }

        // Hash the password before saving
        $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT);

        $userData = [
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $hashedPassword,
            'role' => $input['role']
        ];

        $userId = $this->userModel->createUser($userData['name'], $userData['email'], $userData['password'], $userData['role']);
        if (!$userId) {
            Response::json(["message" => "User registration failed"], 500);
        }

        Response::json(["message" => "User registered successfully"], 201);
    }
}
