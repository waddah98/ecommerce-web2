<?php

require_once __DIR__ . '/UserModel.php';
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../core/jwt.php';
require_once __DIR__ . '/../../core/Response.php';

use Firebase\JWT\JWT;


class UserController {
    private $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }
    
    

    public function register() {
        $input = json_decode(file_get_contents("php://input"), true);
    
        if (!isset($input['name'], $input['email'], $input['password'])) {
            Response::json(["message" => "Missing required fields"], 400);
            return;
        }
        $role = $input['role'] ?? "customer";
        $validRoles = ["admin", "customer"];
        
        if (!in_array($role, $validRoles)) {
            Response::json(["message" => "Invalid role."], 400);
            return;
        }

        $existingUser = $this->userModel->getUserByEmail($input['email']);
        if ($existingUser) {
            Response::json(["message" => "Email already in use"], 400);
            return;
        }
    
        if ($this->userModel->createUser($input['name'], $input['email'], $input['password'], $role)) {
            Response::json(["message" => "User registered successfully"], 201);
        } else {
            Response::json(["message" => "Registration failed"], 500);
        }
    }

    public function signin() {
        $input = json_decode(file_get_contents("php://input"), true);
    
        if (!isset($input['email'], $input['password'])) {
            Response::json(["message" => "Email and password required"], 400);
            return;
        }
    
        $user = $this->userModel->getUserByEmail($input['email']);
        if (!$user || !password_verify($input['password'], $user['password'])) {
            Response::json(["message" => "Invalid credentials"], 401);
            return;
        }
    
        $token = JWTHandler::generateToken($user);
        Response::json([
            "message" => "Login successful",
            "token" => $token,
            "role" => $user['role']
        ]);
    }
    

    public function getUsers() {
        echo json_encode($this->userModel->getAllUsers());
    }

    public function getUser($id) {
        $user = $this->userModel->getUserById($id);
        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            Response::json(["error" => "User not found"], 404);
        }
    }
}
