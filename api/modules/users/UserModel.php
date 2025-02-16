<?php

require_once __DIR__ . '/../../core/Database.php';

class UserModel {
    private $db;

    public function __construct() {
        $this->db = Database::connect();
    }

    public function createUser($name, $email, $password, $role) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $query = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)";
        
        $stmt = $this->db->prepare($query);
        return $stmt->execute([
            'name' => $name,
            'email' => $email,
            'password' => $hashedPassword,
            'role' => $role
        ]);
    }

    public function getUserByEmail($email) {
        $stmt = $this->db->prepare("SELECT id, name, email, password, role FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch();
    }

    public function getAllUsers() {
        $stmt = $this->db->query("SELECT id, name, email, role FROM users");
        return $stmt->fetchAll();
    }

    public function getUserById($id) {
        $stmt = $this->db->prepare("SELECT id, name, email, role FROM users WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }
}
