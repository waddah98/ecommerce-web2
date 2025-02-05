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
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['title'], $data['author'], $data['description'], $data['published_year'], 
                    $data['price'], $data['quantity'], $data['image'], $data['category_id'])) {
            Response::json(["error" => "Missing required fields"], 400);
        }

        $result = $this->model->createProduct($data);
        if ($result) {
            Response::json(["message" => "Product created successfully"]);
        } else {
            Response::json(["error" => "Failed to create product"], 500);
        }
    }

    public function updateProduct($id) {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['title'], $data['author'], $data['description'], $data['published_year'], 
                    $data['price'], $data['quantity'], $data['image'], $data['category_id'])) {
            Response::json(["error" => "Missing required fields"], 400);
        }

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
