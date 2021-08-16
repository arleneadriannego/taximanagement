# taximanagement-api

A Taxi Management API that uses the following technologies:

- Apollo Server
- Prisma
- TypeGraphQL
- MySQL

### Instructions:

1. Create .env and fill in necessary configuration.
2. Add firebase service account key file.

3. Create/Migrate database

   ```
   npx prisma migrate dev --name <name>
   ```

4. Generate prisma schema

   ```
   npm run generate
   ```

5. Run app

   ```
   npm run dev
   ```
