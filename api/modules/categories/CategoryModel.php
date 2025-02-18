<?php

require_once __DIR__ . '/../../core/Database.php';


class CategoryModel {
    private $db;

    public function __construct() {
        $this->db = Database::connect();
    }

    public function createCategory($name) {
        $query = "INSERT INTO categories (name) VALUES (:name)";
        $stmt = $this->db->prepare($query);
        return $stmt->execute(['name' => $name]);
    }

    public function getCategories($page = 1, $perPage = 5) {
        $offset = ($page - 1) * $perPage;
        $query = "SELECT id, name FROM categories";
        $stmt = $this->db->prepare($query);
        
        $stmt->execute();
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $totalQuery = "SELECT COUNT(*) as total FROM categories";
        $totalStmt = $this->db->query($totalQuery);
        $total = $totalStmt->fetch(PDO::FETCH_ASSOC)['total'];

        $totalPages = ceil($total / $perPage);

        return Response::json([
            'categories' => $categories,
            'pagination' => [
                'total' => $total,
                'per_page' => $perPage,
                'current_page' => $page,
                'total_pages' => $totalPages,
            ],
        ]);
    }

    public function getCategoryById($id) {
        $stmt = $this->db->prepare("SELECT id, name FROM categories WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateCategory($id, $name) {
        $query = "UPDATE categories SET name = :name WHERE id = :id";
        $stmt = $this->db->prepare($query);
        return $stmt->execute(['id' => $id, 'name' => $name]);
    }

    public function deleteCategory($id) {
        $query = "DELETE FROM categories WHERE id = :id";
        $stmt = $this->db->prepare($query);
        return $stmt->execute(['id' => $id]);
    }
}
