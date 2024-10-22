# README For Backend

In order to start the backend. First you need to install all the required packages by running the command `npm run start` or `npm run start:dev` if you wish to run it in dev mode.
This command needs to be executed in the `backend-api` folder.

In order to start the Database, you require `Docker` and you need to run `docker compose up` command to start running the DB image.

The Swagger of the Backend-API can be viewed at `http://localhost:3000/api`.
You can indepdently test the Backend-API.

The following are the steps to execute the entire application in one go.

# Running the Application

1. Run `docker compose up` to start the backend image
2. Install packages for Backend using `npm install`.
3. Run the `npm run prisma:generate` command to generate all the backend interfaces
4. Apply all the database migration using the command `npm run db:migrate-save`. This command will apply all the migrations on the database.
5. Run server using the command `npm run start:dev` or `npm run start` inside the `backend-api` folder.
6. Install packages for the frontend using `npm install` on the main folder level.
7. Run frontend using the command `npm run dev` or `npm run start` on the main folder level.

## Caveats

A flaw that might exist currently is that I have associated a List with all the tasks. Therefore, you may need to create atleast one list item with the `id=1` since all the tasks are dependent on this list item.
