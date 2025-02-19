<?php
require_once __DIR__ . "/ProductModel.php";
require_once __DIR__ . "/../../core/Response.php";

class ProductController {
    private $model;

    public function __construct() {
        $this->model = new ProductModel();
    }

    public function getAllProducts() {
        $products = $this->model->getAllProducts();
        Response::json($products);
    }

    public function getProductById($id) {
        $product = $this->model->getProductById($id);
        if (!$product) {
            Response::json(["error" => "Product not found"], 404);
        }
        Response::json($product);
    }

    public function createProduct() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_FILES['image'])) {
            Response::json(["error" => "Invalid request or missing image file"], 400);
        }

        $requiredFields = ['title', 'author', 'description', 'published_year', 'price', 'quantity', 'category_id'];

        foreach ($requiredFields as $field) {
            if (!isset($_POST[$field])) {
                Response::json(["error" => "Missing required field: $field"], 400);
            }
        }

        $image = file_get_contents($_FILES['image']['tmp_name']);

        // Prepare data for insertion
        $data = [
            'title' => $_POST['title'],
            'author' => $_POST['author'],
            'description' => $_POST['description'],
            'published_year' => $_POST['published_year'],
            'price' => $_POST['price'],
            'quantity' => $_POST['quantity'],
            'image' => $image, // Binary image data
            'category_id' => $_POST['category_id']
        ];

        $result = $this->model->createProduct($data);
        if ($result) {
            Response::json(["message" => "Product created successfully"]);
        } else {
            Response::json(["error" => "Failed to create product"], 500);
        }
    }

    public function updateProduct($id) {
        // Check if the request contains file uploads
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            Response::json(["error" => "Invalid request"], 400);
        }

        // Validate required fields
        $requiredFields = ['title', 'author', 'description', 'published_year', 'price', 'quantity', 'category_id'];
        foreach ($requiredFields as $field) {
            if (!isset($_POST[$field])) {
                Response::json(["error" => "Missing required field: $field"], 400);
            }
        }

        // Read the image file as binary data (if provided)
        $image = null;
        if (isset($_FILES['image'])) {
            $image = file_get_contents($_FILES['image']['tmp_name']);
        }

        // Prepare data for update
        $data = [
            'title' => $_POST['title'],
            'author' => $_POST['author'],
            'description' => $_POST['description'],
            'published_year' => $_POST['published_year'],
            'price' => $_POST['price'],
            'quantity' => $_POST['quantity'],
            'image' => $image, // Binary image data (or null if not updated)
            'category_id' => $_POST['category_id']
        ];

        // Update the product
        $result = $this->model->updateProduct($id, $data);
        if ($result) {
            Response::json(["message" => "Product updated successfully"]);
        } else {
            Response::json(["error" => "Failed to update product"], 500);
        }
    }

    public function deleteProduct($id) {
        $result = $this->model->deleteProduct($id);
        if ($result) {
            Response::json(["message" => "Product deleted successfully"]);
        } else {
            Response::json(["error" => "Failed to delete product"], 500);
        }
    }
}
?>
