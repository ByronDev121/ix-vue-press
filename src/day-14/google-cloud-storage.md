# Google Cloud Upload

## Create Google Cloud Account

https://www.mongodb.com/products/platform/cloud

## Add gcp_key.json to project

Rename the auth.json file gcp_key.json and add it to `backend/`

![Google Cloud Store key File Structure](/ix-vue-press/gcp_key.png)

## Installation

### @google-cloud/storage Installation

```bash
npm install @google-cloud/storage
```

## Create Google Cloud Storage

In `backend/src/services/` create a file called `cloud-storage.js`

![Google Cloud Store File Structure](/ix-vue-press/google-cloud-storage-file-structure.png)

## Define GoogleCloudService

`backend/src/services/cloud-storage.js`

```js
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "your-project-id",
  keyFilename: "./gcp_key.json",
});

const uploadToFirebaseStorage = async (filepath, fileName) => {
  try {
    const gcs = storage.bucket("gs://your-bucket-name");
    const storagepath = `your-bucket-name/${fileName}`;

    const result = await gcs.upload(filepath, {
      destination: storagepath,
      public: true,
      metadata: {
        contentType: "application/plain", //application/csv for excel or csv file upload
      },
    });
    return result[0].metadata.mediaLink;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const GoogleCloudService = {
  uploadToFirebaseStorage,
};

module.exports = GoogleCloudService;
```

## Update Blogs Controller

`backend/src/controllers/blogs.js`

```js
const { uploadToFirebaseStorage } = require("../services/google-cloud");

const createBlogs = async (req, res) => {
  try {
    let imageURL = "";
    if (req?.file?.path) {
      imageURL = await uploadToFirebaseStorage(
        req?.file?.path,
        req?.file?.path
      );
    }
    console.log(req.body);
    const categoryIds = JSON.parse(req?.body?.categories).map((x) => x.id);
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      image: imageURL,
      content: JSON.parse(req?.body?.content),
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
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

...

const updateBlogByID = async (req, res) => {
  try {
    let imageURL = "";
    if (req?.file?.path) {
      imageURL = await uploadToFirebaseStorage(
        req?.file?.path,
        req?.file?.path
      );
    }
    console.log(req.body);
    const blog = await Blog.findById(req.params.id)
      .populate({
        path: "categoryIds",
      })
      .populate({ path: "authorId" });
    if (blog) {
      const categoryIds = JSON.parse(req?.body?.categories).map((x) => x.id);
      blog.image = imageURL ? imageURL : blog.image;
      blog.authorId = req?.body?.authorId || blog.authorId;
      blog.categoryIds = categoryIds ? categoryIds : blog.categoryIds;
      blog.title = req?.body?.title || blog.title;
      blog.description = req?.body?.description || blog.description;
      blog.content = req.body.content
        ? JSON.parse(req.body.content)
        : blog.content;
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
