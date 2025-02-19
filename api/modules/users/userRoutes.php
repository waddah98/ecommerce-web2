<?php

require_once __DIR__ . '/UserController.php';
require_once __DIR__ . '/../../auth/AuthMiddleware.php';

header("Access-Control-Allow-Origin: http://localhost:4200"); // Allow requests from Angular frontend
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$controller = new UserController();
$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

if (end($path) === 'fetchAllUsers') {
    if ($requestMethod === 'GET') {
        // AuthMiddleware::authorize("admin"); // Only admins can view all users
        $controller->getUsers();
    } 
    // elseif ($requestMethod === 'GET') {
    //     AuthMiddleware::authenticate(); // Both roles can view user profile
    //     $controller->getUser($path[1]);
    // } 
    else {
        http_response_code(404);
        echo json_encode(["message" => "Route not found"]);
    }
} elseif (end($path) === 'register' && $requestMethod === 'POST') {
    // Handle user registration
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->register();
} elseif (end($path) === 'signin' && $requestMethod === 'POST') { 
    $controller->signin();
} // Add this route to your existing routes
elseif (end($path) === 'addToFavorites' && $requestMethod === 'POST') {
    // AuthMiddleware::authenticate(); // Ensure the user is authenticated
    $controller->addToFavorites();
}elseif (end($path) === 'getFavorites' && $requestMethod === 'GET') {
    if (!isset($_GET['user_id'])) {
        Response::json(["message" => "Missing user_id"], 400);
    } else {
        $controller->getFavorites($_GET['user_id']);
    }
}

else {
    http_response_code(404);
    echo json_encode(["message" => "Route not found"]);
}
