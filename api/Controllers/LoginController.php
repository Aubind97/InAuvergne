<?php

namespace Api\Controllers;

use Slim\Container;
use Api\Models\Users;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class LoginController
{
    private $users;

    public function __construct(Container $container) {
        $this->users = new Users($container);
    }

    // Regarde si in utilisateur peut se connecter et le connecte
    public function login(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        $params = $request->getParsedBody();
        $username = $request->getParsedBody()['username'];
        $password = password_hash($request->getParsedBody()['password'], PASSWORD_DEFAULT);

        $user = $this->users->getUserBy('username', $username)->get();

        if (!empty($user) && $password = $user[0]->password) {
            $token = 'unSuperToken';
            // On met le token dans la base

            return $response->withJSON([
                'username' => $user[0]->username,
                'token' => $token
            ]);
        }

        return $response->withJSON($user);
    }
}
