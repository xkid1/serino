## Create a database

- Create a database from local machine MYSQL
- `DATABASE="kitra" USERNAME="kitra" PASSWORD="@kitra"`

## Copy the example.env to .env

- `cp example.env .env`

## Run Migrations and Seeders

- Run the migrations to create the tables in the database:
- `npx sequelize-cli db:migrate`

- Run the seeders to populate the tables with initial data:
- `npx sequelize-cli db:seed:all`

- If needed to rollback the migration
- `npx sequelize-cli db:migrate:undo:all`

## Install the dependencies

- using npm
- `npm i`
- using yarn
- `yarn`

## Start the application

- run the following
- using npm
- `npm start` to run the production
- `npm run dev` to run into develpment
- using yarn
- `yarn start` to run the production
- `yarn run dev` to run into develpment

## API end point

- Optional minPrizeValue maxPrizeValue input
- `http://localhost:8081/api/treasures-boxes?latitude=14.552036595352455&longitude=121.01696118771324&distance=10&minPrizeValue=12&maxPrizeValue=30`
- Required input latitude longitude distance
- `http://localhost:8081/api/treasures-boxes?latitude=14.552036595352455&longitude=121.01696118771324&distance=10&minPrizeValue=&maxPrizeValue=`

## Note

- If you are testing it from postman or other tools, need to add header fro csrf
- `key: X-Requested-With value: XMLHttpRequest`
