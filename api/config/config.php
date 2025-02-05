<?php

return [
    'app' => [
        'name' => 'My PHP API',
        'env' => 'development', 
        'debug' => true,
        'base_url' => 'http://localhost:80',
    ],
    
    'database' => [
        'host' => 'localhost',
        'port' => 3306,
        'dbname' => 'your_database_name',
        'username' => 'your_db_user',
        'password' => 'your_db_password',
        'charset' => 'utf8mb4',
    ],

    'uploads' => [
        'path' => __DIR__ . '/../uploads/',
        'allowed_types' => ['image/jpeg', 'image/png'],
        'max_size' => 5 * 1024 * 1024,
    ]
];
