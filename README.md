# Inter IIT Tech Meet 11.0

## Dev Team Selection Task: Securch

Problem statement can be found [here](https://docs.google.com/document/d/12zAY7ysNDx3urRZWoFrQTDXwvo6xUmTtthQsxgDMbNg/edit?usp=sharing)

## Getting Started

A quick introduction of the minimal setup you need to get the development environment setup

- Set up an `.env` file by taking reference from `.env.example`. You can choose the `MEILI_MASTER_KEY` variable as anything as long as you remember it.
- Setup a master key protected `meilisearch` backend instance up and running. Refer to [this](https://docs.meilisearch.com/learn/getting_started/quick_start.html#setup-and-installation) for instructions.
  - Alternatively,  run the `seed` script

  ```shell
  ./seed.sh
  ```

- Add some data to the `meilisearch` server (using cURL).

  ```shell
  curl\
  -X POST 'http://localhost:7700/indexes/links/documents?primaryKey=id' \
  -H 'Content-Type: application/json' -H 'Authorization: Bearer $MEILI_MASTER_KEY'\
  --data-binary @data.json
  ```

- Note the `master key` for testing the frontend.
- Get the frontend up and running

  ```shell
  git clone https://github.com/sneaky-potato/interiit-dev-task
  cd interiit-dev-task
  yarn install
  yarn start
  ```

- The frontend has 2 pages-
  - Home Page (`/`): To search in the given indexes using the API Key (Can use the same `master key` here or use the one mentioned in stats on admin page)
  - Admin Page (`/admin`): To manage the server, stats, add, delete indexes and adding documents (Only the `master key` is accepted here)

## Using Docker

- Make sure `.env` is setup as directed
- For instantly testing the whole application

```shell
docker compose up --build
```

- Or pull up the securch image from docker hub-

```shell
docker pull sneakyp0tat0/securch
docker compose up 
```

## Implementation details / steps

- The given data was first converted into an accepted format (after adding a primary key field: `id`) using a trivial javascript module (`data_process.js`)
- Added this data to the `meiliosearch` instance using cURL
- I developed the dashboard in React and added functionalities for-
  - Changing index right from the home page
  - Protected search route for security
  - Admin portal for checking stats and adding / removing indexes

## Deployment Link

The frontend is deployed [here](http://elcloud.centralindia.cloudapp.azure.com:8080)

## Result?

I made it into the dev team, yay!

## Work

[Grow Simplee Team 11](https://github.com/Grow-Simplee-Team-11)
