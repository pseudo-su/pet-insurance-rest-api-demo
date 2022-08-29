# Pet Insurance REST API Demo

A demo application that runs an API server and database locally.
Only the health check endpoint has been implemented.
Other endpoints will be implemented in the Future Associates API session.

## Project setup

### Global dependencies

- [Homebrew](https://brew.sh/)
- NodeJS and npm installed via [`nvm`](https://github.com/nvm-sh/nvm)
- `docker` and `docker-compose` (Using `qemu`, `lima` and `colima` instead of Docker desktop due to licensing)

```sh
# Install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install nvm, NodeJS and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install
nvm use
```

If you don't have docker installed you can do so using `qemu`, `lima` and `colima`

```sh
# Install docker tools
brew install docker
brew install docker-compose
brew install docker-credential-helper

# Install lima
brew install qemu
brew install lima
limactl start

# Colima
brew install colima
colima start

# List currently running docker containers (should print out an empty list)
docker ps
```

### Development scripts

```sh
# Make sure the correct version of language tooling is active before running any commands
nvm use;

# Install project dependencies
npm install;

# Run code verification (eslint)
npm run verify;

# Start devstack (MongoDB database)
make devstack.start

# Run API Server
npm run start
```

The server runs until stopped, by cancelling execution of the command.

Hit the health check endpoint via browser (or postman) at:

[http://localhost:3000/pets](http://localhost:3000/pets)

Other scripts

```sh
# Stop the devstack
make devstack.stop;

# Delete the devstack and recreate fresh;
make devstack.recreate;
```
