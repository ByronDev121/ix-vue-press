# JWT Authentication

[[toc]]

## Getting started

### Structure of a JWT

#### Example Encoded JWT:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`.
`eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ`.
`SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

#### Decoded JWT Token:

Header:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Payload:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

Signature:

```scss
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret)
```

## User model

### Create user model

In `backend/src/models` create a file called `userModel.js`

![Express User Model File Structure](/ix-vue-press/express-user-model-file-structure.png)

### Define user model

src/models/userModel.js

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already registered"],
    },
    bio: {
      type: String,
      equired: [true, "Email is required"],
    },
    image: {
      type: String,
      default: "https://storage.googleapis.com/ix-blog-app/download.png",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
```

### Update blog model

src/models/blogModel.js

```js{5-9,41,56-64}
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
  },
  { timeStamp: true }
);

// Add a toJSON method to the schema to control the output of blog instances
blogSchema.method("toJSON", function () {
  const {
    __v,
    _id,
    categoryIds,
    authorId: author,
    ...object
  } = this.toObject();
  object.id = _id;

  // Add category details to the blog object
  object.categories = categoryIds.map((category) => {
    return {
      id: category._id,
      title: category.title,
      description: category.description,
      color: category.color,
    };
  });

  // Add author details to the blog object
  if (authorId && authorId._id) {
    object.author = {
      id: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email,
      image: author.image,
      bio: author.bio,
    }
  }

  return object;
});

module.exports = mongoose.model("Blog", blogSchema);
```

## Auth Routes

### Create auth routes

In `backend/src/routes` create a file called `authRoutes.js`

![Express Auth Routes File Structure](/ix-vue-press/express-auth-routes-file-structure.png)

### Define auth routes

src/routes/authRoutes.js

```js
const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth");

router.post("/login", (req, res) => {
  login(req, res);
});

router.post("/register", (req, res) => {
  register(req, res);
});

module.exports = router;
```

### Update index.js

src/index.js

```js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const blogsRoutes = require("./routes/blogs");
const categoryRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth");

const connectDB = require("./database/db");

connectDB();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/blogs", blogsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

## Auth Controller

### Create auth controller

In `backend/src/contollers` create a file called `auth.js`

![Express Auth Controller File Structure](/ix-vue-press/express-auth-controller-file-structure.png)

### Define auth controller

src/controllers/auth.js

login register

```js
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, bio, password } = req.body;
    //check payload
    if (!firstName || !lastName || !email || !bio || !password) {
      res.status(400).json({ message: "All fields are required", data: [] });
      return;
    }
    // check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists", data: [] });
      return;
    }
    // create new user
    const user = new User({
      firstName,
      lastName,
      email,
      bio,
      password,
    });
    const newUser = await user.save();
    let resUser = newUser.toJSON();
    delete resUser.password;
    res.status(201).json({ message: "New user created!", data: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};
```

login funtion

```js
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check payload
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required", data: [] });
      return;
    }
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist", data: [] });
      return;
    }
    // check if password is correct
    if (user.password !== password) {
      res.status(400).json({ message: "Invalid credentials", data: [] });
      return;
    }
    let resUser = user.toJSON();
    delete resUser.password;
    res.status(200).json({ message: "Login successful!", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

module.exports = {
  register,
  login,
};
```

### Install bcrypt

```bash
npm i bcryptjs
```

### Update auth controller

register function

```js{1,17-19,26}
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, bio, password } = req.body;
    //check payload
    if (!firstName || !lastName || !email || !bio || !password) {
      res.status(400).json({ message: "All fields are required", data: [] });
      return;
    }
    // check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists", data: [] });
      return;
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const user = new User({
      firstName,
      lastName,
      email,
      bio,
      password: hashedPassword,
    });
    const newUser = await user.save();
    let resUser = newUser.toJSON();
    delete resUser.password;
    res.status(201).json({ message: "New user created!", data: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};
```

login funtion

```js{15-17}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check payload
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required", data: [] });
      return;
    }
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist", data: [] });
      return;
    }
    // check hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid credentials", data: [] });
      return;
    }
    let resUser = user.toJSON();
    delete resUser.password;
    res.status(200).json({ message: "Login successful!", data: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};
```

### Install jsonwebtoken

```bash
npm i jsonwebtoken
```

### Update .env

.env

```
PORT=8000
MONGO_URI=mongodb://localhost:27017/blog_app
JWT_SECRET=123abc
```

### Define generate token function

src/controllers.auth.js

```js
const jwt = require("jsonwebtoken");

.
.
.

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // expiresIn: "1d",
  });
};
```

### Update auth controller (Cont.)

register function

```js{27-28}
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, bio, password } = req.body;
    //check payload
    if (!firstName || !lastName || !email || !bio || !password) {
      res.status(400).json({ message: "All fields are required", data: [] });
      return;
    }
    // check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists", data: [] });
      return;
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const user = new User({
      firstName,
      lastName,
      email,
      bio,
      password: hashedPassword,
    });
    const newUser = await user.save();
    let resUser = newUser.toJSON();
    resUser.token = generateToken(resUser._id);
    delete resUser.password;
    res.status(201).json({ message: "New user created!", data: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};
```

login funtion

```js{21-22}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check payload
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required", data: [] });
      return;
    }
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist", data: [] });
      return;
    }
    // check hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid credentials", data: [] });
      return;
    }
    let resUser = user.toJSON();
    resUser.token = generateToken(resUser._id);
    delete resUser.password;
    res.status(200).json({ message: "Login successful!", data: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};
```

## Auth Middleware

### Create Auth Middleware

In `backend/src/middleware` create a file called `authMiddleware.js`

![Express Auth Middleware File Structure](/ix-vue-press/express-auth-middleware-file-structure.png)

### Define auth Middleware

src/middleware/authMiddleware.js

```js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "No user found with this id" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized to access this route" });
  }
};

module.exports = { protect };
```

## Protect Routes

### Update blog routes

src/routes/blogsRoutes.js

```js{6,9,20,24}
const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogs");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, (req, res) => {
  createBlog(req, res);
});

router.get("/", (req, res) => {
  getBlogs(req, res);
});

router.get("/:id", (req, res) => {
  getBlog(req, res);
});

router.put("/:id", protect, (req, res) => {
  updateBlog(req, res);
});

router.delete("/:id", protect, (req, res) => {
  deleteBlog(req, res);
});

module.exports = router;
```
