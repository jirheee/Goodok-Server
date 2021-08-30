## How to run server

```sh
// install dependencies
yarn
// make create .env file
cp .env.example .env
// start db
docker-compose up
// start server in dev env
yarn dev
```

If the server returns to `GET /status` with code `200`, the server is running successfully.
