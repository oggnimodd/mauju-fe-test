## MAUJU FE TEST

### How to run locally

#### Prerequisites
1. You need [Bun](https://bun.sh/) installed on your machine to run this project. If you don't have Bun, you can use GitPod or GitHub Codespaces to run this project.
2. This project uses Clerk as an authentication provider, so you need to create a new project on Clerk, which is free.


#### Setup
1. Clone this repository

```bash 
git clone https://github.com/oggnimodd/mauju-fe-test.git
```


2. Copy `.env.example` to `.env`

```bash 
cp .env.example .env
```

You need to fill in the .env file. If you want to use local SQLite, you can remove the `TURSO_AUTH_TOKEN` and `TURSO_DATABASE_URL` lines.

3. Install dependencies

```bash 
bun install
```

4. Push database with the following command

```bash 
cd packages/db && bun run db-push
```

This will create the required tables in your database.

5. Run the API with the following command

```bash 
cd packages/api && bun run dev
```
By default, this API uses [Elysia.js](https://elysiajs.com/) as the API server.

If you want to use Express, you can

```bash 
cd packages/express-serverless && bun run dev:express
```

With this, you can navigate to `localhost:8080/panel` in your browser to explore the API. The panel uses [trpc-panel](https://github.com/iway1/trpc-panel). On this page, you can create a new account with Clerk and you can sign in and access protected API endpoints.

6. Run the dashboard with the following command

```bash 
cd apps/dashboard && bun dev
```
Now you can open http://localhost:5173 in your browser to explore the dashboard.

This project also uses Ladle as an alternative to Storybook for developing components in isolation. To run it, you can

```bash 
cd apps/dashboard && bun run ladle:dev
```

Now you can open http://localhost:4545 in your browser to explore the stories.

7. Optional, if you want to seed the database
Find the user_id for the account you want to use for testing from the Clerk response, then add the `SEED_USER_ID` to `.env` with this user_id and then run

```bash
cd packages/db && bun run db-seed
```

The seed will add 100 new transactions to the database with a random number of items.