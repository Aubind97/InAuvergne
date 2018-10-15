<?php

use Api\Controllers\LoginController;

$app->group('/api', function () use ($app) {

  $app->post('/login', LoginController::class . ':login');

});
