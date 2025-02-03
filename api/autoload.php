<?php

spl_autoload_register(function ($class) {
    $paths = [
        __DIR__ . "/core/$class.php",
        __DIR__ . "/modules/users/$class.php",
        __DIR__ . "/modules/products/$class.php",
        __DIR__ . "/modules/categories/$class.php"
    ];

    foreach ($paths as $file) {
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});