<?php

namespace Api\Models;

use Slim\Container;

class AbstractModel
{
  /**
  * @var QueryBuilderHandler
  */
  protected $qb;

  public function __construct(Container $container)
  {
    $this->qb = $container->get('qb');
  }

}
