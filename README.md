## MAUJU FE TEST

### Live demo : https://mauju-fe-test.netlify.app/

### How to run locally

#### Prerequisites
1. You need [Bun](https://bun.sh/) installed on your machine to run this project. If you don't have Bun, you can use [GitPod](https://www.gitpod.io/) or [GitHub Codespaces](https://github.com/features/codespaces) to run this project.
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

8. Testing

Not all features and components have been tested yet. To run the tests, create a test account and add the `TEST_EMAIL` and `TEST_PASSWORD` credentials in the `.env` file. Then, execute the following command:

```bash
cd apps/dashboard && bun run cy:e2e
```


### Tech stack
- [React](https://react.dev/) as the UI library.
- [TypeScript](https://www.typescriptlang.org/).
- [Vite](https://vitejs.dev/) as the bundler.
- [Mantine UI](https://mantine.dev/) for UI components.
- [Mantine React Table](https://www.mantine-react-table.com/) for tabular data representation.
- [Tabler Icons](https://tabler.io/icons) for icons.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [Ladle JS](https://ladle.dev/) for developing components in isolation.
- [React Query](https://react-query.tanstack.com/) for data fetching.
- [Bun](https://github.com/lukeed/bundt) as the package manager.
- [TRPC](https://trpc.io/) for creating type-safe API.
- [Prisma](https://www.prisma.io/) as the ORM.
- [Turso](https://github.com/vercel/turso) as the database.
- [Biome](https://biome.sh/) as the linter and formatter.
- [TRPC Panel](https://trpc.io/docs/introduction) for managing TRPC procedures.
- [Clerk](https://clerk.dev/) for authentication.
- [Cypress](https://www.cypress.io/) for testing.
- [Netlify Functions](https://www.netlify.com/products/functions/) as the server for production.
- [Netlify](https://www.netlify.com/) for client deployment.

### Screenshots

- Sign in
![Sign in](/sc/sign-in.png)

- Sign up
![Sign up](/sc/sign-up.png)

- Forgot password
![Forgot password](/sc/forgot-password.png)

- Transaction list
![Transaction list](/sc/transaction-list.png)

- Sign in
![Sign in](/sc/sign-in.png)

- Create transaction
![Create transaction](/sc/create-transaction.png)

- Edit transaction
![Edit transaction](/sc/edit-transaction.png)

- Search transaction
![Search transaction](/sc/search-transaction.png)

- Select transaction
![Select transaction](/sc/select-transaction.png)

- Ladle stories
![Ladle stories](/sc/ladle.png)

- TRPC panel
![Trpc Panel](/sc/trpc-panel.png)

