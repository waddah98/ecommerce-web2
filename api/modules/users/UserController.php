<?php

require_once __DIR__ . '/UserModel.php';

class UserController {
    private $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    public function register() {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input['name'], $input['email'], $input['password'], $input['role'])) {
            http_response_code(400);
            echo json_encode(["message" => "Missing required fields"]);
            return;
        }

        $existingUser = $this->userModel->getUserByEmail($input['email']);
        if ($existingUser) {
            http_response_code(400);
            echo json_encode(["message" => "Email already in use"]);
            return;
        }

        $this->userModel->createUser($input['name'], $input['email'], $input['password'], $input['role']);
        echo json_encode(["message" => "User registered successfully"]);
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
            echo json_encode(["message" => "User not found"]);
        }
    }
}
