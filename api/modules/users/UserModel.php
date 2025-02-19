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

    public function getAllUsers() {
        $query = "
        SELECT 
            u.id, 
            u.name, 
            u.email, 
            u.role, 
            u.created_at, 
            COUNT(f.id) AS numberOfFavourites 
        FROM 
            users u 
        LEFT JOIN 
            favourites f ON u.id = f.user_id 
        WHERE 
            u.role = 'customer' 
        GROUP BY 
            u.id
        ";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $totalQuery = "SELECT COUNT(*) as total FROM users WHERE role = 'customer'";
        $totalStmt = $this->db->query($totalQuery);
        $totalFavourites = $totalStmt->fetch()['total'];


        return Response::json($users);
    }

    public function getUserById($id) {
        $stmt = $this->db->prepare("SELECT id, name, email, role FROM users WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAllFavorites($user_id) {
        $query = "
            SELECT p.id, p.title, p.author, p.price, p.image
            FROM favourites f
            JOIN products p ON f.product_id = p.id
            WHERE f.user_id = :user_id
        ";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute(['user_id' => $user_id]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    
    
    
    public function addFavorite($user_id, $product_id) {
        $sql = "INSERT INTO favourites (user_id, product_id) VALUES (:user_id, :product_id)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute(['user_id' => $user_id, 'product_id' => $product_id]);
    }


}
