<?php

require_once __DIR__ . '/CategoryController.php';
require_once __DIR__ . '/../../auth/AuthMiddleware.php';
require_once __DIR__ . '/../../core/CorsMiddleware.php';

handleCors();

$controller = new CategoryController();
$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

$beforeLastElement = $path[count($path) - 2];
if (end($path) === 'addCategory' && $requestMethod === 'POST') {
    //AuthMiddleware::authorize("admin"); // Only admins can add a category
    $controller->createCategory();
}

// Route: GET /fetchAll
elseif (end($path) === 'fetchAll' && $requestMethod === 'GET') {
    //AuthMiddleware::authorize("admin"); // Only admins can fetch all categories
    $controller->getCategories();
}

// Route: GET /fetchById/{id}
elseif ($beforeLastElement === 'fetchById' && $requestMethod === 'GET') {
    $id = end($path);
    $controller->getCategory($id); // Pass the ID from the URL
}

// Route: PUT /updateCategory/{id}
elseif ($beforeLastElement === 'updateCategory' && $requestMethod === 'PUT') {
    $id = end($path);
    $controller->updateCategory($id); // Pass the ID from the URL
}

// Route: DELETE /deleteCategory/{id}
elseif ($beforeLastElement === 'deleteCategory' && $requestMethod === 'DELETE') {
    $id = end($path);
    $controller->deleteCategory($id); // Pass the ID from the URL
}

// Invalid route
else {
    http_response_code(404);
    echo json_encode(["message" => "Route not found"]);
}