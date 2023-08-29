# Task Manager API

This is a simple Task Manager API built using Fastify, TypeScript, and the IoC design pattern. It also includes JWT authentication for secure access to API endpoints.

## Features

- Create, retrieve, update, and delete tasks
- IoC design pattern for scalable and maintainable code
- JWT authentication for securing API endpoints
- Swagger for API documentation

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- Docker
- Docker Compose

### Installation

1. Clone the repository:

   ```bash
   $ git clone https://github.com/coderoo7/taskmanager-api.git
   $ cd taskmanager-api
   ```
2. Create .env file and copy content of .sample.env
    ```bash
    $ cp .env.sample .env
    ```

3. Build the docker image
    ```bash
    $ docker compose build
    ```

4. Now spin the server by using below command
    ```bash
    $ docker compose up
    ```

    It serve the api on http://localhost:3000

### API Docmentation

Import collection in postman [Via API](https://api.postman.com/collections/10812797-8cfeb9e1-6403-41db-8506-d5fc9a188cc0?access_key=PMAT-01H9056G75CRBHEB0YS7FGAE67) . 

    
### TechStack

- Backend: Fastify, Postgres, typeorm.

### Contribution

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request

