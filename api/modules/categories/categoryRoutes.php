<?php

require_once __DIR__ . '/CategoryController.php';
require_once __DIR__ . '/../../auth/AuthMiddleware.php';

$controller = new CategoryController();
$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

if ($path[0] === 'categories') {
    if ($requestMethod === 'GET' && count($path) === 1) {
        AuthMiddleware::authorize("admin"); // Only admins can manage categories
        $controller->getCategories();
    } elseif ($requestMethod === 'POST' && count($path) === 1) {
        AuthMiddleware::authorize("admin"); // Only admins can create categories
        $controller->createCategory();
    } elseif ($requestMethod === 'GET' && count($path) === 2) {
        AuthMiddleware::authenticate(); // Both admins & customers can view category details
        $controller->getCategory($path[1]);
    } elseif ($requestMethod === 'PUT' && count($path) === 2) {
        AuthMiddleware::authorize("admin"); // Only admins can update categories
        $controller->updateCategory($path[1]);
    } elseif ($requestMethod === 'DELETE' && count($path) === 2) {
        AuthMiddleware::authorize("admin"); // Only admins can delete categories
        $controller->deleteCategory($path[1]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Route not found"]);
    }
}
