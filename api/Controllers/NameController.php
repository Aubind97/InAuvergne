<?php

namespace Api\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class NameController
{
  // Retourne le contenu de la page index
  public function index(ServerRequestInterface $request, ResponseInterface $response, array $args)
  {
    return $response->withJSON($args);
  }
}