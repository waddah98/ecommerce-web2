<?php

require_once __DIR__ . '/CategoryModel.php';

class CategoryController {
    private $categoryModel;

    public function __construct() {
        $this->categoryModel = new CategoryModel();
    }

    public function createCategory() {
        $input = json_decode(file_get_contents("php://input"), true);
        if (!isset($input['name'])) {
            http_response_code(400);
            echo json_encode(["message" => "Category name is required"]);
            return;
        }

        $result = $this->categoryModel->createCategory($input['name']);
        if ($result) {
            echo json_encode(["message" => "Category created successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error creating category"]);
        }
    }

    public function getCategories() {
        $categories = $this->categoryModel->getCategories();
        echo json_encode($categories);
    }

    public function getCategory($id) {
        $category = $this->categoryModel->getCategoryById($id);
        if ($category) {
            echo json_encode($category);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Category not found"]);
        }
    }

    public function updateCategory($id) {
        $input = json_decode(file_get_contents("php://input"), true);
        if (!isset($input['name'])) {
            http_response_code(400);
            echo json_encode(["message" => "Category name is required"]);
            return;
        }

        $result = $this->categoryModel->updateCategory($id, $input['name']);
        if ($result) {
            echo json_encode(["message" => "Category updated successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error updating category"]);
        }
    }

    public function deleteCategory($id) {
        $result = $this->categoryModel->deleteCategory($id);
        if ($result) {
            echo json_encode(["message" => "Category deleted successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error deleting category"]);
        }
    }
}
