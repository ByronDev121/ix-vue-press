# Deploy Blog App

[[toc]]

## Build Frontend

In `blog-app/frontend/` run the following command:

```bash
npm run build
```

## Serve Frontend from Express Backend

In `blog-app/backend/src/index.js` add the following code:

```js
...

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "..", "..", "frontend", "build", "index.html")
  )
);

...
```

:::tip
Serve your backend and go to http://localhost:8000
:::

## Define Server

In `blog-app/` create a `package.json` file:

```json
{
  "name": "ix-blog-app",
  "version": "1.0.0",
  "description": "This is the backend server for my awesome blog app",
  "main": "./backend/src/index.js",
  "scripts": {
    "start": "node ./backend/src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false cd frontend && npm install && npm run build"
  },
  "author": "Byron de Villiers",
  "license": "ISC",
  "dependencies": {
    "@google-cloud/storage": "^7.11.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.0",
    "multer": "^1.4.5-lts.1"
  }
}
```

## Create Mongo Account

https://www.mongodb.com/products/platform/cloud

## Update backend .env

.env

```bash
# MONGO_URI=mongodb://localhost:27017/blog-app
MONGO_URI=mongodb+srv://<username>:<password>@<db-name>.<project-id>.mongodb.net/
PORT=8000
JWT_SECRET=123abc
```

## Create Heroku Account

https://www.heroku.com/

## Create Heroku Project

![Heroku app create](/ix-vue-press/heroku-app-create.png)
![Heroku app](/ix-vue-press/heroku-app.png)

## Heroku Deploy

![Heroku app deploy](/ix-vue-press/heroku-app-deploy.png)

## Create Heroku Env Vars

![Heroku app vars](/ix-vue-press/heroku-app-vars.png)

## Define .profile

```bash
echo ${GOOGLE_CREDENTIALS} > /gcp_key.json
```
