This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install bun as the package manager: https://bun.sh/ or just use Node.js, here I use Bun as default.

Then, install the dependencies with bun:

```bash
bun install
# or
yarn install
```

Create a minimal .env file to work with database:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/appdb"
```

If this is the first time you start the app, please run migrate command to populate the database:

```bash
bunx prisma migrate dev --name init
```

It should automatically populate data in file seed.ts

Finally, run the development server:

```bash
bun dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the page.

You can start play around with the restaurant list :)
