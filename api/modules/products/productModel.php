<?php
require_once __DIR__ . "/../../core/Database.php";

class ProductModel {
    private $db;

    public function __construct() {
        $this->db = Database::connect();
    }

    public function getAllProducts() {
        $sql = "SELECT p.*, c.name AS category_name 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($products as &$product) {
            if (!empty($product['image'])) {
                $product['image'] = base64_encode($product['image']);
            } else {
                $product['image'] = null; // Set to null if no image is available
            }
        }
        return Response::json($products);
    }

    public function getProductById($id) {
        $sql = "SELECT p.*, c.name AS category_name 
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createProduct($data) {
        $sql = "INSERT INTO products (title, author, description, published_year, price, quantity, image, category_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            $data['title'], $data['author'], $data['description'], 
            $data['published_year'], $data['price'], $data['quantity'], 
            $data['image'], $data['category_id']
        ]);
        return $this->db->lastInsertId();
    }

    public function updateProduct($id, $data) {
        $sql = "UPDATE products SET title = ?, author = ?, description = ?, published_year = ?, 
                price = ?, quantity = ?, image = ?, category_id = ? WHERE id = ?";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['title'], $data['author'], $data['description'], 
            $data['published_year'], $data['price'], $data['quantity'], 
            $data['image'], $data['category_id'], $id
        ]);
    }

    public function deleteProduct($id) {
        $sql = "DELETE FROM products WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
}
?>
