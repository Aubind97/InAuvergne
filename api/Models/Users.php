<?php

namespace Api\Models;

use Slim\Container;

class Users extends AbstractModel
{

    public function __construct(Container $container)
    {
        parent::__construct($container);
    }

    public function getUserBy(string $field, string $value)
    {
        return $this->qb->table('users')
            ->where($field, '=', $value);
    }

}
