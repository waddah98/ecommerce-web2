<?php

require_once __DIR__ . '/AuthController.php';

$controller = new AuthController();
$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

if ($path[0] === 'auth' && $requestMethod === 'POST' && $path[1] === 'login') {
    $controller->login();
}
    elseif ($path[0] === 'auth' && $requestMethod === 'POST' && $path[1] === 'signup') {
        $controller->signup();
    }

else {
    http_response_code(404);
    Response::json(["message" => "Route not found"]);
}