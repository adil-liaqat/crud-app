Typescript and Express.js Api
==============================

An Express.js project implemented using Typescript for api creation:

# Installation

Clone the repository


```
npm install 
```

Using Postgres for this example, but will work with mysql, just change the dialect in `src/config/database.ts`

Build to `./dist`
```
npm run build
```

IMPORTANT:  Make a copy of `.env.default` file and rename it to `.env`, update the values of variables

Run migrations
```
sequelize-cli db:migrate
```

For development:
```
npm run dev
```

Browse to http://localhost:3000/docs


To start in production:
```
npm run start
```

Then run the `launch.json` configuration inside visual studio code `f5`.  You should now be able to set breakpoints in your typescript.


# Folder structure

```
src/
├── config
│   └── database.ts
│   └── swagger.ts
├── controllers
│   └── user.controller.ts
├── helpers
│   └── index.ts
├── interfaces
│   └── express
│       └── index.ts
│   └── models
│       └── user.interface.ts
│       └── contact.interface.ts
│   └── controllers
│       └── user.interface.ts
├── models
│   └── index.ts
│   └── user.model.ts
│   └── contact.model.ts
├── public
│   ├── favicon.ico
│   └── stylesheets
│       └── style.css
├── routes
│   └── index.ts
│   └── user.route.ts
├── validators
│   └── auth.validator.ts
├── server
│   └── index.ts
├── middlewares
│   └── error.middleware.ts
│   └── validator.middleware.ts
│   └── notFound.middleware.ts
│   └── swagger.middleware.ts
├── logger
│   └── index.ts
├── exceptions
│   └── http.exception.ts
├── migrations
│   └── 20201129002122-user-table.ts
│   └── 20210208222334-contact-table.ts
├── tsconfig.json
├── index.ts
```

# Docker

Build the image `sudo docker build -t expressapi/express-api-typescript-starter .`

Run the image `docker-compose up`

Open `http://localhost:8080/api/v1/users`


# License

MIT

