<?php

namespace Api\Controllers;

use Slim\Container;
use Api\Models\Quizz;
use Api\Models\Users;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class QuizzController
{
    private $users;

    public function __construct(Container $container) {
        $this->users = new Users($container);
        $this->quizz = new Quizz($container);
    }

    // Regarde si in utilisateur peut se connecter et le connecte
    public function getQuizz(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        \var_dump($args); die();
        $questions = $this->quizz->getQuestionQuizz($args['id']);


        return $response->withJSON($questions);
    }
}
