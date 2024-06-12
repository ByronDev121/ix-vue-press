# Frontend

[[toc]]

## FormData

### Syntax

```jsx
const formData = new FormData();
```

#### FormData Methods

```jsx
// Append a key-value pair to the object
append()
// Delete a key-value pair
delete()
// Returns an iterator object, used to list key value pairs
entries()
// Return the value of a key
get()
// Return all values of a key
getAll()
// Check if key exists
has()
// Returns an iterator object, used to list available keys
keys()
// Add value to a key, replaces the value if key already exits
set()
// Returns an iterator object for the values of the FormData object
value()
```

## Create FormImage Component

In `frontend/src/components` create a `FormImage` dir and add a file called `index.jsx`

![Form Image File Structure](/ix-vue-press/form-image-file-structure.png)

## Define FormImage Component

`frontend/src/components/FormImage/index.jsx`

```jsx
import React, { useRef } from "react";
import PropTypes from "prop-types";

import "./index.css";

export default function FormImage({ image, onChange }) {
  const fileInput = useRef();

  return (
    <div className="mb-3">
      <label htmlFor="image" className="form-label">
        Image
      </label>
      <input
        ref={fileInput}
        style={{ display: "none" }}
        id="fileInput"
        type="file"
        name="img"
        onChange={onChange}
      ></input>
      {image ? (
        <button
          className="image"
          onClick={() => {
            fileInput?.current?.click();
          }}
        >
          <img className="img-upload" src={image} alt="blog.title" />
        </button>
      ) : (
        <button
          className="image add-image"
          title="Add Image"
          onClick={() => {
            fileInput?.current?.click();
          }}
        >
          <i className="bi bi-plus"></i>
        </button>
      )}
    </div>
  );
}

FormImage.propTypes = {
  image: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
```

`frontend/src/components/FormImage/index.css`

```css
.image {
  height: 150px;
  width: 100%;
}

.img-upload {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: auto;
}

.add-image {
  font-size: 2rem;
  line-height: 150px;
  border-style: dashed;
  border-width: 2px;
  text-align: center;
  cursor: pointer;
}
```

## Update AddEditBlogModal

`frontend/src/components/AddEditBlogModal/index.css`

```jsx
...

import FormImage from "../FormImage";

...

const user = JSON.parse(localStorage.getItem("user"));

const [blogImage, setBlogImage] = useState("");

...

const buildFormData = () => {
  const formData = new FormData();
  formData.append("id", blog.id);
  formData.append("image", blog.image);
  formData.append("title", blog.title);
  formData.append("description", blog.description);
  formData.append("categories", JSON.stringify(blog.categories));
  formData.append("content", JSON.stringify(blog.content));
    formData.append("authorId", user?._id);
  return formData;
};

const onSubmit = (e) => {
  e?.preventDefault();
  if (isFormValid()) {
    const blogForm = buildFormData();
    if (addBlog) {
      dispatch(createBlog(blogForm));
    } else if (editBlog) {
      dispatch(updateBlog(blogForm));
    }
    resetBlog();
    addEditModal?.hide();
  }
};

const onImageChange = (e) => {
  if (e?.target?.files?.length) {
    const file = e.target.files[0];
    setBlogImage(URL.createObjectURL(file));
    setBlog({ ...blog, image: file });
  }
};

...

<form id="blogForm">
  <FormImage image={blogImage} onChange={onImageChange} />

...
```

## Update blogService

`frontend/src/services/blogService.js`

```js
const createBlog = async (blog) => {
  const response = await fetch("http://localhost:8000/api/blogs", {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
    body: blog,
  });

  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

...

const updateBlog = async (blog) => {
  const response = await fetch("http://localhost:8000/api/blogs/" + blog.get('id'), {
    method: "PUT",
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
    body: blog,
  });
  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};
```
