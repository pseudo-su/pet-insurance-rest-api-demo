### Devstack

## Start the devstack
devstack.start:
	docker-compose -f ./devstack/docker-compose.yml up -d --remove-orphans devstack
.PHONY: devstack.start

## Stop the devstack
devstack.stop:
	docker-compose -f ./devstack/docker-compose.yml down --remove-orphans
.PHONY: devstack.stop

## Clean/reset the devstack
devstack.clean:
	docker-compose -f ./devstack/docker-compose.yml down --remove-orphans --volumes --rmi local
.PHONY: devstack.clean

## Restart the devstack
devstack.restart: devstack.stop devstack.start
.PHONY: devstack.restart

## Clean/reset and restart the devstack
devstack.recreate: devstack.clean devstack.start
.PHONY: devstack.recreate

## show status
devstack.status:
	docker-compose -f ./devstack/docker-compose.yml ps
.PHONY: devstack.status
