# Express JS

[[toc]]

## Getting started

### Install NodeJS

Download and install [nodeJS](https://nodejs.org/en/download)

### Install Express

Create a new directory adjacent to your front end app called "backend":

![Full Stack App File Structure](/ix-vue-press/fronend-backend-file-structure.png)

cd into you blog-backend directory and run the following command. Press enter to skip through the set up prompts using the default set up. \*_Note: when asked for entry file specify_ `src/index.js`:

```bash
npm init
```

Run the following command to install [Express JS](https://expressjs.com/)

```bash
npm install express --save
```

### Set up basic express server

Create a `src/` directory and create a `src/index.js` file in your backend work space directory and add the following ExpressJS code:

```js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

### Run express server

Run the following command to run basic [express server](https://expressjs.com/en/starter/hello-world.html)

```bash
node .
```

Go to [http://localhost:3000](http://localhost:3000) in your browser and you should see "Hello World!" text on the screen.

### Install nodemon

Install [nodemon](https://www.npmjs.com/package/nodemon) to reload the server if a code change is made.

```bash
npm install nodemon --save-dev
```

Update your project scripts to run nodemon is dev.

```json
...
"scripts": {
    "dev": "nodemon .",
    "start": "node .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```

Re-run server with nodemon

```bash
npm run dev
```

## Middleware

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

### CORS

Cross-Origin Resource Sharing:

Cross-origin resource sharing is a mechanism that allows a web page to access restricted resources from a server on a domain different than the domain that served the web page.

```bash
npm i cors
```

```js
const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();

// Enabling CORS for any unknown origin
app.use(cors());

app.listen(port, () => {
  console.log(`IX blogging app listening on port ${port}`);
});
```

### Parsing JSON payload

The express.json() middleware is used to parse incoming requests with JSON payloads and make the parsed data available in req.body.

```js
const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();

// Enabling CORS for any unknown origin
app.use(cors());

// Enabling the use of JSON for the body of the request
app.use(express.json());

app.listen(port, () => {
  console.log(`IX blogging app listening on port ${port}`);
});
```

## Routes

### Create routes directory

In `backend/src/` create a routes directory and add a file called blogs.js

![Express App File Structure](/ix-vue-press/express-routes-file-structure.png)

### Basic routing in express

Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

Route definition takes the following structure:

```js
app.METHOD(PATH, HANDLER);
```

> Where:
>
> - **_app_** is an instance of express.
> - **_METHOD_** is an HTTP request method, in lowercase.
> - **_PATH_** is a path on the server.
> - **_HANDLER_** is the function executed when the route is matched.

### Setup blog routes

Add the following boiler plate router code to `src/routes/blogs.js`:

```js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Return all blogs!");
});

module.exports = router;
```

Update `src/index.js` with the following code:

```js
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/blogs", require("./routes/blogs"));

app.listen(port, () => {
  console.log(`IX blogging app listening on port ${port}`);
});
```

\*_Notice how index.js, the entry point file of the backend app, routes all requests with the route `/api/blogs` to the `src/routes/blogs.js` file._

## CRUD

CRUD stands for create, read, update and delete. CRUD operations are foundational to most web and software applications, as they allow for the management and manipulation of data. This concept is widely used in programming and database management to ensure that software can interact with and manipulate the data layer within an application effectively.

### Create

```js
router.post("/", (req, res) => {
  res.status(200).json({ message: "Create new blog!" });
});
```

### Read

```js
// GET ALL
router.get("/", (req, res) => {
  res.status(200).json({ message: "Return all blogs!" });
});

// GET BY ID
router.get("/:id", (req, res) => {
  res.status(200).json({ message: "Return blog by ID!" });
});
```

### Update

```js
router.put("/:id", (req, res) => {
  res.status(200).json({ message: "Update blog by ID!" });
});
```

### Delete

```js
router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "Delete blog by ID!" });
});
```

Example of function component

## Controllers

Controllers are the Controller part of the MVC software architectural pattern.

Acts as an interface between Model and View components. It processes all the business logic and incoming requests, manipulates data using the Model component, and interacts with the Views to render the final output. The controller receives input, optionally validates it, and then passes the input to the model.

![MVC](/ix-vue-press/MVC.png)

### Create controllers directory

In `backend/src/` create a controllers directory and add a file called blogs.js

![Express App File Structure](/ix-vue-press/express-controllers-file-structure.png)

### Setup blog controller

Move routes code to `src/controllers/blogs.js`:

```js
const createBlog = (req, res) => {
  res.status(200).json({ message: "Create new blog!", data: [] });
};

const getBlogs = (req, res) => {
  res.status(200).json({ message: "Return all blogs!", data: [] });
};

const getBlog = (req, res) => {
  res.status(200).json({ message: "Return blog by ID!", data: [] });
};

const updateBlog = (req, res) => {
  res.status(200).json({ message: "Update blog by ID!", data: [] });
};

const deleteBlog = (req, res) => {
  res.status(200).json({ message: "Delete blog by ID!", data: [] });
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
```

Update `src/routes/index.js` with the following code:

```js
const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs");

router.post("/", (req, res) => {
  createBlog(req, res);
});

router.get("/", (req, res) => {
  getBlogs(req, res);
});

router.get("/:id", (req, res) => {
  getBlog(req, res);
});

router.put("/:id", (req, res) => {
  updateBlog(req, res);
});

router.delete("/:id", (req, res) => {
  deleteBlog(req, res);
});

module.exports = router;
```
