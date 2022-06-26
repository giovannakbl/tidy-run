all: build

build:
	docker compose build api
	docker compose build app

migrate:
	docker compose run api php bin/console doctrine:migrations:migrate

jwt:
	docker compose run api php bin/console lexik:jwt:generate-keypair

start:
	docker compose  up --renew-anon-volumes
