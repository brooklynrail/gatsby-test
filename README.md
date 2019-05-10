To try out:

1. Install Node.js.
1. Clone the repositories for [the main site](https://github.com/brooklynrail/brooklynrail) and this.
1. From the main site directory, start the database.

   ```sh
   docker-compose up db
   ```

1. From this project directory, start Gatsby.

   ```sh
   npm i
   gatsby develop
   ```

1. Open http://localhost:8000.

The `NUM_ARTICLES` environment variable can be used to scale how much of the site is built.
