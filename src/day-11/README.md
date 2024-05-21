# JWT Authentication

[[toc]]

## Getting started

### Structure of a JWT

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
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABQYHBAIBA//EADsQAAEDAgIGBgcGBwAAAAAAAAABAgMEEQUGISIxQVGhEhNhcYGRFiRysbLR4RQjJTNT8BU0QkNSYpP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ANSABpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAreZ8wOonLR0Sp9otrv/T7E7fcBNVuI0VAnrdQyNdzb3cvgmkjPSzCelbrJrcepWxQ5Huke58jlc9y3Vzluq+J5Ka1GixGir09UqGSLvbezk8F0nUZMx7o3tfG5Wvat0c1bKniXXLOYXVqpR1zk+0W1H/qdi9oFkABAAAAAAAAAAAAAAAABx4vWph+HTVW1WtsztcuhOZmT3uke573dJ7lVzl4qv7Uuee5FbQ00SLodLdfBPqUopQAFQPUb3Rva9i2e1Uc1eCpsXzseQSrGn4RW/xDDoarYrm6/Y5NC8zsKzkSRXUNTFfQ2XpJ2XT6FmIAAAAAAAAAAAAAAAAKxntl6Olem6RU5fQpZo+ZqN1bg07GNvIy0jETfbbyuZwUoACoAAlWLpkRlqOqfxkRPJPqWci8s0bqLBoGPbaR95Hou6+xPKxKEAAAAAAAAAAAAAAAAApGZMvPppX1dFGr6dyq57G7Y17uHuLuL22AZJdNoNMq8Gw6rd0p6SNXrte3VVfKxx+imFdK/VS93WqUZ/2lky3l6SolZV1sasp2qjmMdtkXu4e8tFJguHUjulBSx9NNj3azk87nfe+0gAAAAAAAAAAAAAAAAAEXjeNU+Ex2d95UOTUiRea8EAkZZY4Y3STPaxjdrnLZCArs3UUCq2mjkqHJvTVb57VKjiOI1WJTdZVSdJEXVYmhre5DkKasM2b8Qf8AkxwRJ7KuXmc/pTi179fH/wAmkMBiLDDm/EGreaOCVPZVq8iYoc3UU6o2pjfTuX+pdZvntQowGDWIpY5o2yQva9jtjmrdD2Zfh2I1WGzdZSydFFXWYulru9C+YJjVPisdm/d1DU14lXmnFCKlAAAAAAAAAAAAPiqiIqqtkTSq8AI7HcVjwqjWRbOmdoiYu9ePchnVRPLUzvmner5Hrdzl3nZjuIrieIvmT8purEi/4p8yPAAAqAAKAAAH6U88tNOyaB6skYt2uTcfmCK0nAsVjxWjSRLNmbolYm5ePcpJGaYFiK4ZiLJv7TtSVP8AVfkaUioqIqLdF0ovEg+gAAAAAAAEPmqrWkwaXoKqPmVIm+O3kikwVHPsv8lDu13r36E+YFSABUAAUAAAAAAAADQ8q1a1eDRdNVV8SrG7w2clQzwtuQpV9dh9h6c0+RFW4AEAAAAAAKVntfxCmTckS/EfABWgAaQAAAAAAAAAAAs2RF/EKlNyxJ8R8BKLsACNAACP/9k=",
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

```js{8}
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

const { login, register } = require("../controllers/authController");

router.post("/login", (req, res) => {
  login(req, res);
});

router.get("/register", (req, res) => {
  register(req, res);
});

module.exports = router;
```

### Update index.js

src/index.js

```js
const express = require("express");
const connectDB = require("./database/db");
require("dotenv").config();

connectDB();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(port, () => {
  console.log(`IX blogging app listening on port ${port}`);
});
```

## Auth Controller

### Create auth controller

In `backend/src/contollers` create a file called `authController.js`

![Express Auth Controller File Structure](/ix-vue-press/express-auth-controller-file-structure.png)

### Define auth controller

src/controller/authController.js

login register

```js
const User = require("../models/userModel");

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
    res.status(201).json({ message: "New user created!", data: newUser });
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

```js{15-17,24}
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
      hashedPassword,
    });
    const newUser = await user.save();
    res.status(201).json({ message: "New user created!", data: newUser });
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
    res.status(200).json({ message: "Login successful!", data: user });
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

src/controllers.authcontroller.js

```js
const jwt = require("jsonwebtoken");

.
.
.

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
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
    newUser.password = undefined;
    newUser.token = generateToken(newUser._id);
    res.status(201).json({ message: "New user created!", data: newUser });
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
    user.password = undefined;
    user.token = generateToken(newUser._id);
    res.status(200).json({ message: "Login successful!", data: user });
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
const User = require("../models/userModel");

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

```js{10,12,24,28}
const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
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
