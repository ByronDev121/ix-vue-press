# Completing the Blog App - Backend

[[toc]]

<!-- ## Backend -->

## Models

### Category Model

Defining the category model.

`backend/src/models/Category.js`

```js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Add a toJSON method to the schema to control the output of category instances
categorySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Category", categorySchema);
```

### Blog Model

Update the blog model.

`backend/src/models/Blog.js`

```js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
    categoryIds: {
      type: Array,
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
      default: "https://storage.googleapis.com/ix-blog-app/default.jpeg",
    },
    content: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

// Add a toJSON method to the schema to control the output of blog instances
blogSchema.method("toJSON", function () {
  const { __v, _id, categoryIds, ...object } = this.toObject();
  object.id = _id;

  object.categories = categoryIds.map((category) => {
    return {
      id: category._id,
      title: category.title,
      description: category.description,
      color: category.color,
    };
  });

  // Ensure author is included in the returned object
  if (this.author) {
    object.author = this.author;
  }

  return object;
});

module.exports = mongoose.model("Blog", blogSchema);
```

## Controllers

### Blog Controller

Final blog controller.

`backend/src/controllers/blogs.js`

```js
const Blog = require("../models/Blog");

const createBlogs = async (req, res) => {
  try {
    const categoryIds = req?.body?.categories.map((x) => x.id);
    const blog = new Blog({
      author: req?.body?.author,
      categoryIds: categoryIds,
      title: req?.body?.title,
      description: req?.body?.description,
      content: req?.body?.content,
    });
    const newBlog = await blog.save();
    const blogRes = await Blog.findById(newBlog._id).populate({
      path: "categoryIds",
    });
    res.status(201).json({ message: "New blog created!", data: blogRes });
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate({ path: "categoryIds" });
    res.status(200).json({
      message: "Get all blogs!",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const getBlogById = async (req, res) => {
  try {
    console.log(req.params.id);
    const blog = await Blog.findById(req.params.id).populate({
      path: "categoryIds",
    });
    if (blog) {
      res.status(200).json({ message: "Return blog by ID!", data: blog });
    } else {
      res.status(404).json({ message: "Blog not found!", data: {} });
    }
  } catch (err) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const getBlogsByCategoryID = async (req, res) => {
  try {
    console.log(req.params.id);
    let filter = {};
    if (req.params.id != "null" && req.params.id != "undefined") {
      filter = { categoryIds: req.params.id };
    }
    const blogs = await Blog.find(filter).populate({ path: "categoryIds" });
    res.status(200).json({
      message: "Get blogs by categoryID!",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const updateBlogByID = async (req, res) => {
  console.log(req.body);
  try {
    const blog = await Blog.findById(req.params.id).populate({
      path: "categoryIds",
    });
    if (blog) {
      const categoryIds = req?.body?.categories.map((x) => x.id);
      blog.authorId = req?.body?.authorId || blog.authorId;
      blog.categoryIds = req?.body?.categoryIds
        ? categoryIds
        : blog.categoryIds;
      blog.title = req?.body?.title || blog.title;
      blog.description = req?.body?.description || blog.description;
      blog.content = req.body.content ? req.body.content : blog.content;
      const updatedBlog = await blog.save();
      res.status(200).json({ message: "Blog updated!", data: updatedBlog });
    } else {
      res.status(404).json({ message: "Blog not found!", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const deleteBlogByID = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) {
      return res
        .status(200)
        .json({ message: "Blog deleted!", id: req.params.id });
    } else {
      return res.status(404).json({ message: "Blog not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const blogController = {
  createBlogs,
  getBlogs,
  getBlogById,
  getBlogsByCategoryID,
  updateBlogByID,
  deleteBlogByID,
};

module.exports = blogController;
```

### Categories Controller

Final categories controller.

`backend/src/controllers/categories.js`

```js
const Category = require("../models/Categories");

const createCategory = async (req, res) => {
  try {
    const category = new Category({
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
    });
    const newCategory = await category.save();
    const categoryRes = await Category.findById(newCategory._id);
    res
      .status(201)
      .json({ message: "New category created!", data: categoryRes });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .json({ message: "Return all categories!", data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const getCategoryById = async (req, res) => {
  console.log(req.params.id);
  res.status(200).json({
    message: "Get category by ID!",
    data: [],
  });
};

const updateCategoryByID = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.title = req.body.title || category.title;
      category.description = req.body.description || category.description;
      category.color = req.body.color || category.color;
      const updatedCategory = await category.save();
      res
        .status(200)
        .json({ message: "Category updated!", data: updatedCategory });
    } else {
      res.status(404).json({ message: "Category not found!", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const deleteCategoryByID = async (req, res) => {
  try {
    const categoryDB = await Category.findById(req.params.id);
    if (!categoryDB) {
      res
        .status(400)
        .json({ message: "Cannot delete category with existing blogs!" });
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res.status(200).json({ message: "Category deleted!", id: req.params.id });
    } else {
      res.status(404).json({ message: "Category not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const categoryController = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryByID,
  deleteCategoryByID,
};

module.exports = categoryController;
```
