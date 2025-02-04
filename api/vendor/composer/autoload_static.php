<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitc61e969be75494d3c5da3798907405c3
{
    public static $prefixLengthsPsr4 = array (
        'M' => 
        array (
            'MegaPc\\Api\\' => 11,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'MegaPc\\Api\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitc61e969be75494d3c5da3798907405c3::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitc61e969be75494d3c5da3798907405c3::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitc61e969be75494d3c5da3798907405c3::$classMap;

        }, null, ClassLoader::class);
    }
}
