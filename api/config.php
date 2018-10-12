<?php

// Récupération des variables d'environnement
$env = new Dotenv\Dotenv(__DIR__ . '/..');
$env->load();

// Configuration de l'application
return [
  'settings' => [
    // Environnement
    'env' => getenv('ENV'),
    'displayErrorDetails' => getenv('ENV') === 'dev' ? true : false,
    // BDD
    'db' => [
      'host' => getenv('DB_HOST'),
      'name' => getenv('DB_NAME'),
      'user' => getenv('DB_USER'),
      'pass' => getenv('DB_PASS'),
      ]
  ]
];
