<?php

function handleCors() {
    // Allow requests from any origin (replace * with specific origins for security)
    header("Access-Control-Allow-Origin: *");

    // Allowed HTTP methods
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    // Allowed headers
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // Handle preflight OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200); // Respond with 200 OK for preflight requests
        exit(); // Exit early since no further processing is needed
    }
}