.PHONY: install help dev start
.DEFAULT_GOAL = help

##Liste des variables
## PORT: 8000
## HOST: 127.0.0.1
PORT	= 8000
HOST	= 127.0.0.1

##
##Liste des commandes

help: ## Liste les commandes disponible
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-10s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

vendor: composer.json
	composer.phar install

composer.lock: composer.json
	composer.phar update

install: vendor composer.lock ## Installe les dépendances du projet

start: install ## Lance le serveur interne de PHP en production
	php -S $(HOST):$(PORT) -t api/ -d display_errors=1 -d opcache.enable_cli=1

dev: install ## Lance le serveur interne de PHP en developpement
	ENV=dev php -S $(HOST):$(PORT) -t api/ -d display_errors=1
