# Pet Insurance REST API Demo

A demo application that runs an API server and database locally.  
Only the health check endpoint has been implemented.  
Other endpoints will be implemented in the Future Associates API session.  

## Project setup

### Global dependencies

- [Homebrew](https://brew.sh/)
- NodeJS and npm installed via [`nvm`](https://github.com/nvm-sh/nvm)
- mongodb-community  

```sh
# Install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install nvm, NodeJS and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install
nvm use

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community
```

Note: If you still have the old mongodb installed from homebrew-core you may have to run the following

```sh
brew services stop mongodb
brew uninstall homebrew/core/mongodb
```

### Development scripts

```sh
# Make sure the correct version of language tooling is active before running any commands
nvm use;

# Install project dependencies
npm install;

# Run code verification (eslint)
npm run verify;

# Start database
brew services start mongodb/brew/mongodb-community

# Run API Server
npm run start
```

The server runs until stopped, by cancelling execution of the command.

Hit the health check endpoint via browser (or postman) at:

[http://localhost:3000/pets](http://localhost:3000/pets)
