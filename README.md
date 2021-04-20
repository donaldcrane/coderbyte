# coderbyte

coderbyte is a RESTful API that supports the posts functionality of Facebook..

[![Coverage Status](https://coveralls.io/repos/github/donaldcrane/coderbyte/badge.svg)](https://coveralls.io/github/donaldcrane/coderbyte)
[![Maintainability](https://api.codeclimate.com/v1/badges/b4882362c1bcc9028d24/maintainability)](https://codeclimate.com/github/donaldcrane/coderbyte/maintainability)
[![](https://img.shields.io/badge/Protected_by-Hound-a873d1.svg)](https://houndci.com)
[![NodeJS CI](https://github.com/donaldcrane/coderbyte/actions/workflows/node.js.yml/badge.svg)](https://github.com/donaldcrane/coderbyte/actions/workflows/node.js.yml)

# Documentation

A detailed documentation of the api can be found here: [API Documentation]()

**Run Project Locally**

- Clone the project
- cd into the project's folder and run npm install to install dependencies
- Create a .env file and add PORT value, JWT_KEY, COOKIE_KEY to it
- Run npm run start:dev to start the server

# HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods:

- POST Create a resource
- GET Get a resource or list of resources
- For POST, the body of your request must be a JSON payload.

# HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- 200 OK Successful request
- 400 Bad Request There was a problem with the request
- 500 Server Error Server error
