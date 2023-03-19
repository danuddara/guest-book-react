# Guest-book

This Guest book has been built using
`Symfony 6.0.20` and `React`. 
It requires `PHP 8.0.2` or higher

Please follow this document to install the mimum requirements for this app https://symfony.com/doc/6.0/setup.html

Please run by edting the `.env` file to match your local database.
Use `mysql` for this build.

default `DATABASE_URL`
`DATABASE_URL="mysql://127.0.0.1:3306/guest_book"`

And run `composer install` this will build up the modules needed for this app.

You can use the same name above or use a differnt one. 

# Migrations

Please run database migrations

`./bin/console doctrine:migrations:migrate` 

choose `Yes` and hit enter and that should run and create the database tables.

# Build front end
run the following command
- `Yarn install`
- `Yarn build`

# Running the App
Please install the symfony cli
`symfony server:start`

Enjoy the app.


