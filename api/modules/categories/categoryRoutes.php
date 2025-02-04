<?php

require_once __DIR__ . '/CategoryController.php';
require_once __DIR__ . '/../../auth/AuthMiddleware.php';

$controller = new CategoryController();
$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

if ($path[0] === 'categories') {
    if($requestMethod === 'POST' && isset($path[1]) && $path[1] === 'addCategory'){
        AuthMiddleware::authorize("admin"); // Only admins can add a category
        $controller->createCategory();
    }


    // Route: GET /categories/fetchAll
    elseif ($requestMethod === 'GET' && isset($path[1]) && $path[1] === 'fetchAll') {
        AuthMiddleware::authorize("admin"); // Only admins can fetch all categories
        $controller->getCategories();
    }

    // Route: GET /categories/fetchById/{id}
    elseif ($requestMethod === 'GET' && isset($path[1]) && $path[1] === 'fetchById' && isset($path[2])) {
        AuthMiddleware::authorize("admin"); // Only admins can fetch a specific category
        $controller->getCategory($path[2]); // Pass the ID from the URL
    }

    // Route: PUT /categories/updateCategory/{id}
    elseif ($requestMethod === 'PUT' && isset($path[1]) && $path[1] === 'updateCategory' && isset($path[2])) {
        AuthMiddleware::authorize("admin"); // Only admins can update a category
        $controller->updateCategory($path[2]); // Pass the ID from the URL
    }

    // Route: DELETE /categories/deleteCategory/{id}
    elseif ($requestMethod === 'DELETE' && isset($path[1]) && $path[1] === 'deleteCategory' && isset($path[2])) {
        AuthMiddleware::authorize("admin"); // Only admins can delete a category
        $controller->deleteCategory($path[2]); // Pass the ID from the URL
    }

    // Invalid route
    else {
        http_response_code(404);
        echo json_encode(["message" => "Route not found"]);
    }
}