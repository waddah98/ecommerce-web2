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

    public function addToFavorites() {
        $input = json_decode(file_get_contents("php://input"), true);
    
        // Check if the required fields are present
        if (!isset($input['user_id'], $input['product_id'])) {
            Response::json(["message" => "Missing required fields (user_id and product_id)"], 400);
            return;
        }
    
        $user_id = $input['user_id'];
        $product_id = $input['product_id'];
    
        // Check if the product is already in the user's favorites
        $existingFavorite = $this->userModel->getFavorite($user_id, $product_id);
        if ($existingFavorite) {
            Response::json(["message" => "Product is already in favorites"], 400);
            return;
        }
    
        // Add the product to the user's favorites
        if ($this->userModel->addFavorite($user_id, $product_id)) {
            Response::json(["message" => "Product added to favorites successfully"], 201);
        } else {
            Response::json(["message" => "Failed to add product to favorites"], 500);
        }
    }

    public function getFavorites($user_id) {
        $favorites = $this->userModel->getAllFavorites($user_id);
        
        if ($favorites) {
            Response::json($favorites);
        } else {
            Response::json(["message" => "No favorites found"], 404);
        }
    }
    
}
