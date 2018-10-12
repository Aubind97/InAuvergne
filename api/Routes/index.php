<?php

use Api\Controllers\NameController;


$app->group('/api', function () use ($app) {

  $app->get('/{name}', NameController::class . ':index');

});
