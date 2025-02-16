<?php

// Allow cross-origin requests (CORS)
header("Access-Control-Allow-Origin: *"); // You can restrict this to http://localhost:4200 in production
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow headers like 'Authorization' for JWT tokens

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Send a 200 response for OPTIONS request
    exit();
}

require __DIR__ . '/autoload.php';
require __DIR__ . '/routes/api.php';
