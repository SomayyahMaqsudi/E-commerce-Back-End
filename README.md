# E-commerce Back End Starter Code# E-commerce-Back-End

This is a functional Express.js API that allows you to connect to a MySQL database using Sequelize. By following the steps below, you can create a development database with test data, start your server, and interact with your API using Insomnia Core.

## User Story: 
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies

## Acceptance Criteria:
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database


## Installation: 
1) Clone this repository to your local machine.
2) Run 'npm install' to install the dependencies.

## Set up:
1) Create an environment variable file named .env.
2) In the .env file, add the following variables with your database information:
DB_NAME=<your_database_name>
DB_USER=<your_mysql_username>
DB_PASSWORD=<your_mysql_password>
3) Run 'npm run schema' to create the database schema.
4) Run 'npm run seed' to seed the database with test data

## Usage:
1) Run 'npm start' to start your server.
2) Open Insomnia Core and create a new request.
3) Set the request method to GET.
4) Set the request URL to one of the following endpoints:
/api/categories
/api/products
/api/tags
5) Send the request and the data for the endpoint will be displayed in a formatted JSON.
6) To test POST, PUT, and DELETE routes, create a new request and set the request method to one of the following:
POST
PUT
DELETE
7) Set the request URL to one of the following endpoints:
/api/categories
/api/products
/api/tags
8) Set the request body to the data you want to create, update, or delete.
9) Send the request and the data in the database will be updated accordingly.