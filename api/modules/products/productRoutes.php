<?php
require_once __DIR__ . "/ProductController.php";
require_once __DIR__ . '/../../core/CorsMiddleware.php';

handleCors();

$controller = new ProductController();

$method = $_SERVER["REQUEST_METHOD"];
$uri = explode("/", trim($_SERVER["REQUEST_URI"], "/"));

if ($uri[0] === "products") {
    if ($method === "GET" && count($uri) === 1) {
        $controller->getAllProducts();
    } elseif ($method === "GET" && isset($uri[1])) {
        $controller->getProductById($uri[1]);
    } elseif ($method === "POST") {
        $controller->createProduct();
    } elseif ($method === "PUT" && isset($uri[1])) {
        $controller->updateProduct($uri[1]);
    } elseif ($method === "DELETE" && isset($uri[1])) {
        $controller->deleteProduct($uri[1]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Route not found"]);
    }
}
?>
