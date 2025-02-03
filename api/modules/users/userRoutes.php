<?php

require_once __DIR__ . '/UserController.php';
require_once __DIR__ . '/../../auth/AuthMiddleware.php';

$controller = new UserController();
$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

if ($path[0] === 'users') {
    if ($requestMethod === 'GET' && count($path) === 1) {
        AuthMiddleware::authorize("admin"); // Only admins can view all users
        $controller->getUsers();
    } elseif ($requestMethod === 'GET' && count($path) === 2) {
        AuthMiddleware::authenticate(); // Both roles can view user profile
        $controller->getUser($path[1]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Route not found"]);
    }
}
