<div align="center">
  <img src="public/images/favi.ico">
  <h1>COFFEE SHOP</h1>

<br/>

## BUILT WITH

<br/>

[![cors](https://img.shields.io/badge/cors-2.8.5-blue)](https://www.npmjs.com/package/cors) [![dotenv](https://img.shields.io/badge/dotenv-16.0.0-brightgreen)](https://www.npmjs.com/package/dotenv)[![bcrypt](https://img.shields.io/badge/bcrypt-5.0.1-purple)](https://www.npmjs.com/package/bcrypt) [![express](https://img.shields.io/badge/Express-4.18.0-green)](https://www.npmjs.com/package/express) [![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-8.5.1-yellowgreen)](https://www.npmjs.com/package/jsonwebtoken) [![multer](https://img.shields.io/badge/multer-1.4.4-purple)](https://www.npmjs.com/package/multer) [![pg](https://img.shields.io/badge/pg-8.7.3-orange)](https://www.npmjs.com/package/pg)

<br/>

</div>

## Description

Coffee shop databased is a backend for order coffe, food and beverages. You can register, login, see products, order, edit their profile, etc by postman app.

## How To Install?

- Clone This Repo

```shell
$ git clone https://github.com/ghofarasnanto/coffeshop-node
```

- Go To Folder Repo

```shell
$ cd coffeshop-node
```

- Install Module

```shell
$ npm install
```

- Set up .env

| KEYWORD          | VALUE               |
| ---------------- | ------------------- |
| CLOUD_API_KEY    | "YOUR API KEY"      |
| CLOUD_API_SECRET | "YOUR API SECRET"   |
| CLOUD_NAME       | "YOUR CLOUD NAME"   |
| DATABASE_URL     | "YOUR DATABASE URL" |
| SECRET_KEY       | "YOUR SECRET KEY"   |

- Run The Project

```shell
$ npm run nodemon
```

<br/>

## Route

| Endpoint          |         Method         | Info         | Remark                         |
| ----------------- | :--------------------: | :----------- | :----------------------------- |
| /auth             |         `POST`         | Auth         | Signup, login, Verification    |
| /users/:id        |     `GET` `PATCH`      | Profile      | Access profile page by User Id |
| /transactions     |      `POST` `GET`      | Transactions | History of Orders              |
| /transactions/:id | `GET` `PATCH` `DELETE` | Transactions | History of Orders              |
| /products         |      `GET` `POST`      | Products     | Products manage                |
| /products/:id     | `GET` `PATCH` `DELETE` | Products     | Products manage                |
| /promos           | `GET` `POST` `DELETE`  | Promos       | Promos manage                  |

## Documentation Postman

Click here [POSTMAN](https://documenter.getpostman.com/view/18740291/UzBnrSrc)

<br/>

## Related Project

[COFFESHOP](https://github.com/ghofarasnanto/React-Commerce)
