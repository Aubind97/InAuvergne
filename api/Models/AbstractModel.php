<?php

namespace Api\Models;

use Slim\Container;

class AbstractModel
{
  /**
  * @var QueryBuilderHandler
  */
  private $qb;

  public function __construct(Container $container)
  {
    $this->qb = $container->get('qb');
  }

}