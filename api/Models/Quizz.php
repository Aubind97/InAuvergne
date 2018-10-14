<?php

namespace Api\Models;

use Slim\Container;

class Quizz extends AbstractModel
{

    public function __construct(Container $container)
    {
        parent::__construct($container);
    }

    // retourne la liste des questions
    public function getQuestionsQuizz(int $id)
    {
        return $this->table('quizz')
            ->join('questions', 'questions.id_quizz', '=', 'quizz.id')
            ->where('quizz.id', '=', $id);
    }

}
