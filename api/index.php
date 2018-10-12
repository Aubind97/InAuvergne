<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

require __DIR__ . '/../vendor/autoload.php';

//  /!\ TEMPORAIRE  (autorise les requêtes cross-origin) /!\
header("Access-Control-Allow-Origin: *");

// Démarrage de la session
session_start();

// Initialisation de l'application
$config = require 'config.php';
$app = new Slim\App($config);

// Récupère le container
require 'container.php';

// Récupère toutes les routes
$routes = scandir(__DIR__ . '/Routes/');
foreach ($routes as $route) {
  if (strpos($route, '.php')) {
    require __DIR__ . '/Routes/' . $route;
  }
}

$app->run();