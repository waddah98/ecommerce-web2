<?php

return [
    'app' => [
        'name' => 'My PHP API',
        'env' => 'development', 
        'debug' => true,
        'base_url' => 'http://localhost:80',
    ],
    
    'database' => [
        'host' => '127.0.0.1',
        'port' => 3306,
        'dbname' => 'bookstore',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8mb4',
    ],

    'uploads' => [
        'path' => __DIR__ . '/../uploads/',
        'allowed_types' => ['image/jpeg', 'image/png'],
        'max_size' => 5 * 1024 * 1024,
        ]
    ];
    
