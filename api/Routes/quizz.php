<?php

use Api\Controllers\QuizzController;

$app->group('/api', function () use ($app) {

  $app->get('/quizz/{id})', QuizzController::class . ':getQuizz');

});
