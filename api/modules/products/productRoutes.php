<?php

require_once __DIR__ . '/ProductController.php';
require_once __DIR__ . '/../../auth/AuthMiddleware.php';
require_once __DIR__ . '/../../core/CorsMiddleware.php';

handleCors();

$controller = new ProductController();
$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

$beforeLastElement = $path[count($path) - 2];

// Route: POST /addProduct
if (end($path) === 'addProduct' && $requestMethod === 'POST') {
    $controller->createProduct();
}

// Route: GET /fetchAllProducts
elseif (end($path) === 'fetchAllProducts' && $requestMethod === 'GET') {
    $controller->getAllProducts();
}

// Route: GET /fetchProductById/{id}
elseif ($beforeLastElement === 'fetchProductById' && $requestMethod === 'GET') {
    $id = end($path);
    $controller->getProductById($id); // Pass the ID from the URL
}

// Route: PUT /updateProduct/{id}
elseif ($beforeLastElement === 'updateProduct' && $requestMethod === 'PUT') {
    $id = end($path);
    $controller->updateProduct($id); // Pass the ID from the URL
}

// Route: DELETE /deleteProduct/{id}
elseif ($beforeLastElement === 'deleteProduct' && $requestMethod === 'DELETE') {
    $id = end($path);
    $controller->deleteProduct($id); // Pass the ID from the URL
}

// Invalid route
else {
    http_response_code(404);
    echo json_encode(["message" => "Route not found"]);
}