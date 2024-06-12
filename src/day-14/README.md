# Multer

[[toc]]

## Installation

### Multer Installation

```bash
npm install multer
```

## Usage

### Create Multer Middleware

In `backend/src/middleware` create a file called `multer.js`

![Multer File Structure](/ix-vue-press/multer-middleware-file-structure.png)

### Define Multer Middleware

`backend/src/middleware/multer.js`

```jsx
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    switch (req.baseUrl) {
      case "/api/blogs":
        cb(null, "uploads/blogs/");
        break;
      case "/api/auth":
        cb(null, "uploads/users/");
        break;
      default:
        cb(null, "uploads/");
        break;
    }
  },
  filename: function (req, file, cb) {
    let fileExt = file.originalname.split(".").pop();
    let fileName = Date.now() + "." + fileExt;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB max file size
  },
});

module.exports = { upload };
```

## Add multer middleware to specific route for file/image upload

`backend/src/routes/blogs.js`

```jsx
...
const { upload } = require("../middleware/multer");

...

/**
 * POST /api/blogs
 */
router.post("/", protect, upload.single("image"), (req, res) => {
  blogController.createBlogs(req, res);
});

...

/**
 * Put /api/blogs/
 */
router.put("/:id", protect, upload.single("image"), (req, res) => {
  blogController.updateBlogByID(req, res);
});
```

## Update Blogs Controller

```jsx
...

const createBlogs = async (req, res) => {
  try {
    console.log(req.body);
    const categoryIds = JSON.parse(req?.body?.categories).map((x) => x.id);
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      image: req?.file?.path
        ? req?.protocol + "://" + req?.headers?.host + "/" + req.file.path
        : "",
      content: JSON.parse(req.body.content),
      authorId: req.body.authorId,
      categoryIds: categoryIds,
    });

    const newBlog = await blog.save();

    const blogRes = await Blog.findById(newBlog._id)
      .populate({
        path: "categoryIds",
      })
      .populate({ path: "authorId" });

    res.status(201).json({
      message: "Blog created!",
      data: blogRes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

...

const updateBlogByID = async (req, res) => {
  console.log(req.body);
  try {
    const blog = await Blog.findById(req.params.id)
      .populate({
        path: "categoryIds",
      })
      .populate({ path: "authorId" });
    if (blog) {
      const categoryIds = JSON.parse(req?.body?.categories).map((x) => x.id);
      blog.authorId = req?.body?.authorId || blog.authorId;
      blog.categoryIds = categoryIds ? categoryIds : blog.categoryIds;
      (blog.image = req?.file?.path
        ? req?.protocol + "://" + req?.headers?.host + "/" + req.file.path
        : blog.image),
        (blog.title = req?.body?.title || blog.title);
      blog.description = req?.body?.description || blog.description;
      blog.content = req.body.content ? JSON.parse(req.body.content) : blog.content;
      const updatedBlog = await blog.save();
      const blogRes = await updatedBlog.populate({
        path: "categoryIds",
      });
      res.status(200).json({ message: "Blog updated!", data: blogRes });
    } else {
      res.status(404).json({ message: "Blog not found!", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });
  }
};
```

## Update index.js

`backend/src/index.js`

```jsx
...
const path = require("path");

...

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
```
