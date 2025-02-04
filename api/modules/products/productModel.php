<?php
require_once __DIR__ . "/../../core/Database.php";

class ProductModel {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getAllProducts() {
        $sql = "SELECT p.*, c.name AS category_name FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id";
        return $this->db->fetchAll($sql);
    }

    public function getProductById($id) {
        $sql = "SELECT p.*, c.name AS category_name FROM products p
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.id = ?";
        return $this->db->fetchOne($sql, [$id]);
    }

    public function createProduct($data) {
        $sql = "INSERT INTO products (title, author, description, published_year, price, quantity, image, category_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return $this->db->execute($sql, [
            $data['title'], $data['author'], $data['description'], 
            $data['published_year'], $data['price'], $data['quantity'], 
            $data['image'], $data['category_id']
        ]);
    }

    public function updateProduct($id, $data) {
        $sql = "UPDATE products SET title = ?, author = ?, description = ?, published_year = ?, 
                price = ?, quantity = ?, image = ?, category_id = ? WHERE id = ?";
        return $this->db->execute($sql, [
            $data['title'], $data['author'], $data['description'], 
            $data['published_year'], $data['price'], $data['quantity'], 
            $data['image'], $data['category_id'], $id
        ]);
    }

    public function deleteProduct($id) {
        $sql = "DELETE FROM products WHERE id = ?";
        return $this->db->execute($sql, [$id]);
    }
}
?>
