<?php

namespace Api\Models;

use Slim\Container;

class Users extends AbstractModel
{

    public function __construct(Container $container)
    {
        parent::__construct($container);
    }

    // retourne un utilisateur selon un champ et une valeur
    public function getUserBy(string $field, string $value)
    {
        return $this->qb->table('users')
            ->where($field, '=', $value);
    }

    // initialise le token de connexion
    public function setConnectionToken(string $token, int $userId)
    {
        $data = ['login_token' => $token];

        if ($this->getFirstConnection($userId)->get()[0]->first_connection === null) {
            $data['first_connection'] = date('Y-m-d');
        }

        $this->qb->table('users')
            ->where('id', '=', $userId)
            ->update($data);
    }

    // retourne la première date de connexion d'un utilsateur
    private function getFirstConnection(int $userId)
    {
        return $this->qb->table('users')
            ->select('first_connection')
            ->where('id', '=', $userId);
    }

}
