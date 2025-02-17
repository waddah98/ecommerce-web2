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
        $query = "SELECT id, name FROM categories LIMIT :limit OFFSET :offset";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $categories = $stmt->fetchAll();

        $totalQuery = "SELECT COUNT(*) as total FROM categories";
        $totalStmt = $this->db->query($totalQuery);
        $total = $totalStmt->fetch()['total'];

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
        return $stmt->fetch();
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
