<?php

// Création du container de l'application
$container = $app->getContainer();

// Ajout Connection a la BDD avec le QueryBuilder
$container['qb'] = function ($container) {
    $settings = $container->get('settings');

    $config = [
        'driver' => 'mysql',
        'host' => $settings['db']['host'],
        'database' => $settings['db']['name'],
        'username' => $settings['db']['user'],
        'password' => $settings['db']['pass'],
        'charset' => 'utf8',
        'options' => [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    ];
    $connection = new \Pixie\Connection('mysql', $config);
    return new \Pixie\QueryBuilder\QueryBuilderHandler($connection);
};