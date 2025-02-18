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
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAllUsers($page = 1, $perPage = 5) {
        $offset = ($page - 1) * $perPage;
        $query = "SELECT name, email, role, created_at FROM users LIMIT :limit OFFSET :offset";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        

        $totalQuery = "SELECT COUNT(*) as total FROM users";
        $totalStmt = $this->db->query($totalQuery);
        $total = $totalStmt->fetch()['total'];

        $totalPages = ceil($total / $perPage);

        return Response::json([
            'users' => $users,
            'pagination' => [
                'total' => $total,
                'per_page' => $perPage,
                'current_page' => $page,
                'total_pages' => $totalPages,
            ],
        ]);
    }

    public function getUserById($id) {
        $stmt = $this->db->prepare("SELECT id, name, email, role FROM users WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
