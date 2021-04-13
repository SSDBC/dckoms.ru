<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitc03ecadef98b8b7330d942d63f598b06
{
    public static $prefixLengthsPsr4 = array (
        'T' => 
        array (
            'Twilio\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Twilio\\' => 
        array (
            0 => __DIR__ . '/..' . '/twilio/sdk/src/Twilio',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitc03ecadef98b8b7330d942d63f598b06::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitc03ecadef98b8b7330d942d63f598b06::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitc03ecadef98b8b7330d942d63f598b06::$classMap;

        }, null, ClassLoader::class);
    }
}
