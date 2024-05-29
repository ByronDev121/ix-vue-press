# Implementing Full Stack Development

[[toc]]

## Frontend

### Service

#### *blogService.js *

Defining the service object with our request functions.
```js
const blogService = {
  createBlog,
  fetchBlogs,
  fetchBlogById,
  fetchBlogsByCategoryId,
  fetchBlogsByAuthorId,
  updateBlog,
  deleteBlogsById,
};
```

##### Request Functions:

###### Create Blog
- Route: *POST - /api/blogs/* 

```js
const createBlog = async (blog) => {
  const response = await fetch("http://localhost:8000/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: blog,
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};
```

###### Fetch All Blogs
- Route: *GET - /api/blogs/* 

```js
const fetchBlogs = async () => {
  const response = await fetch("http://localhost:8000/api/blogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};
```

###### Fetch Blog By ID
- Route: *GET - /api/blogs/:id* 

```js
const fetchBlogById = async (id) => {
  const response = await fetch("http://localhost:8000/api/blogs/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};
```

###### Fetch All Blogs By Category ID
- Route: *GET - /api/blogs/category/:id* 

```js
const fetchBlogsByCategoryId = async (categoryId) => {
  const response = await fetch(
    "http://localhost:8000/api/blogs/category/" + categoryId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};
```

###### Fetch Blogs By Author ID
- Route: *GET - /api/blogs/author/:id* 

```js
const fetchBlogsByAuthorId = async (authorId) => {
  const response = await fetch(
    "http://localhost:8000/api/blogs/author/" + authorId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};
```

###### Update Blog By ID
- Route: *PUT - /api/blogs/:id* 

```js
const updateBlog = async (blog) => {
  const response = await fetch(
    "http://localhost:8000/api/blogs/" + blog.get("id"),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: blog,
    }
  );

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};
```

###### Delete Blog By ID
- Route: *DELETE - /api/blogs/:id* 

```js
const deleteBlogsById = async (id) => {
  const response = await fetch("http://localhost:8000/api/blogs/" + id, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};
```


### Components

#### Common Components
##### Loading
*frontend/src/components/Loading/index.jsx*
```jsx
import React from "react";

export default function Loading() {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="spinner-border algin-self-center" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
```

##### SuccessToast
*frontend/src/components/SuccessToast/index.jsx*
```jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Toast } from "bootstrap";

export default function SuccessToast({ show, message, onClose }) {
  let [successToast, setSuccessToast] = useState(null);

  useEffect(() => {
    const successEl = document.getElementById("successToast");
    const successToast = successEl
      ? new Toast(successEl, {
          autohide: false,
        })
      : null;

    if (show && successToast) {
      successToast?.show();
      setSuccessToast(successToast);
    }
  }, [show]);

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="successToast"
        className="toast bg-success text-white"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Success</strong>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              onClose();
              successToast?.hide();
            }}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}

SuccessToast.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
```

##### ErrorToast
*frontend/src/components/ErrorToast/index.jsx*
```jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Toast } from "bootstrap";

export default function ErrorToast({ show, message, onClose }) {
  let [errorToast, setErrorToast] = useState(null);

  useEffect(() => {
    const errorEl = document.getElementById("errorToast");
    const errorToast = errorEl
      ? new Toast(errorEl, {
          autohide: false,
        })
      : null;
    if (show && errorToast) {
      errorToast?.show();
      setErrorToast(errorToast);
    }
  }, [show]);

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="errorToast"
        className="toast bg-danger text-white"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Error</strong>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              onClose();
              errorToast?.hide();
            }}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}
```

#### Page Components

##### HomePage
*frontend/src/pages/Home/index.jsx*
```jsx
export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const blogs = await blogService.fetchBlogs();
        setBlogs(blogs.data.reverse());
        setIsSuccess(true);
        setMessage(blogs.message);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const resetSuccess = () => {
    setIsSuccess(false);
    setMessage("");
  }

   const resetError = () => {
    setIsError(false);
    setMessage("");
  }

  if (isLoadingBlogs) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <SubHeading subHeading={"Recent Blog Posts"} />
        <BlogGrid blogPosts={blogs}></BlogGrid>
        <SubHeading subHeading={"Categories"} />
        <CategoryList categories={categories}></CategoryList>
        <Footer />
      </div>
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={resetSuccess}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={resetError}
      />
    </>
  );
}
```

##### BlogsPage
*frontend/src/pages/Blogs/index.jsx*
```jsx
export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const blogPosts = await blogService.fetchBlogsByCategoryId(categoryId);
        setBlogPosts(blogPosts.data.reverse());
        setIsSuccess(true);
        setMessage(blogPosts.message);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message || error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  const resetSuccess = () => {
    setIsSuccess(false);
    setMessage("");
  }

  const resetError = () => {
    setIsError(false);
    setMessage("");
  }

  if (isLoadingBlogs) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesList />
        </div>
        <BlogList blogPosts={blogs} />
      </div>
      <Footer />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={resetSuccess}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={resetError}
      />
    </>
  );
}
```

##### BlogPage
*frontend/src/pages/Blog/index.jsx*
```jsx
export default function BlogPage() {
const [blog, setBlog] = useState(null);
const [isError, setIsError] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const blog = await blogService.fetchBlogById(blogId);
        setBlog(blog.data);
        setIsSuccess(true);
        setMessage(blog.message);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message || error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [blogId]);

  const resetSuccess = () => {
    setIsSuccess(false);
    setMessage("");
  }

  const resetError = () => {
    setIsError(false);
    setMessage("");
  }

  if (isLoading || !blog) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <img src={blog.image} className="my-3 cover-img" alt="..." />
        <div className="row g-5">
          <div className="col-md-8">
            <article className="blog-post">
              <div className="my-5">
                <h2 className="blog-post-title">{blog.title}</h2>
                <p className="blog-post-meta">
                  {blog.updatedAt.slice(0, 10)} by{" "}
                  <Link to={"/profile/" + blog.author.id}>
                    {blog.author.firstName} {blog.author.lastName}
                  </Link>
                </p>
                <p>{blog.description}</p>
                <Categories blogPost={blog} />
              </div>
              <hr />
              {blog.content.map((content, index) => {
                return (
                  <div key={index} className="my-5">
                    <h2 className="my-3">{content.sectionHeader}</h2>
                    <p>{content.sectionText}</p>
                  </div>
                );
              })}
            </article>
          </div>
          <div className="author col-md-4" onClick={navigateToAuthorProfile}>
            <div className="position-sticky my-5" style={{ top: "2rem" }}>
              <div className="p-4 mb-3 bg-light rounded">
                <h4 className="fst-italic">About the author</h4>
                <img src={blog.author.image} className="avatar" alt="..." />
                <p>{blog.author.bio.substring(0, 100)}...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={resetSuccess}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={resetError}
      />
    </>
  );
}
```

##### ProfilePage
*frontend/src/pages/Profile/index.jsx
```jsx
export default function ProfilePage() {
  const [blogs, setBlogs] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthorBlogs = async () => {
      try {
        setIsLoading(true);
        const blogs = await blogService.fetchBlogsByAuthorId(authorId);
        setBlogs(blogs.data);
        setIsSuccess(true);
        setMessage(blogs.message);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        setMessage(error.message || error);
      }
    };
    getAuthorBlogs();
  }, [authorId]);

  const resetSuccess = () => {
    setIsSuccess(false);
    setMessage("");
  }

  const resetError = () => {
    setIsError(false);
    setMessage("");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <AuthorDetails />
        <p className="page-subtitle">Author Blog Posts</p>
        <BlogList blogPosts={authorBlogs} />
        <Footer />
      </div>
      <EditProfileModal />
      <AddEditBlogModal />
      <DeleteBlogModal />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={resetSuccess}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={resetError}
      />
    </>
  );
}
```

#### Modal Components

##### AddEditBlogModal
*frontend/src/components/AddEditBlogModal/index.jsx
```jsx
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "bootstrap";

// Components:
import Categories from "../Categories";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";

/**
 * AddEditBlogModal component
 *
 * @description
 * This component is responsible for rendering the AddEditBlogModal component.
 * It displays a modal with a form that allows the user to add a new blog or edit an existing blog.
 *
 * @returns {JSX.Element}
 */
export default function AddEditBlogModal({ addBlog, editBlog , categories, createBlog, updateBlog }) {

  const modalEl = document.getElementById("addEditBlogModal");
  const addEditBlogModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blog, setBlog] = useState({
    image: "",
    title: "",
    description: "",
    categories: [],
    content: [],
    authorId: "",
  });

 useEffect(() => {
    if (addBlog) {
      setBlog(addBlog);
      addEditBlogModal?.show();
    } else if (editBlog) {
      setBlog(editBlog);
      addEditBlogModal?.show();
    }
  }, [addBlog, editBlog, addEditBlogModal]);

  const resetBlog = () => {
    setBlog({
      image: "",
      title: "",
      description: "",
      categories: [],
      content: [],
      authorId: "",
    });
  };

  const onClose = (e) => {
    e.preventDefault();
    resetBlog();
    addEditBlogModal.hide();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      if (editBlog) {
        updateBlog(blog);
      } else {
        createBlog(blog);
      }
      resetBlog();
      addEditBlogModal.hide();
    }
  };

  const isFormValid = () => {
    const form = document.getElementById("blogForm");
    const hasCategories = blog?.categories?.length > 0;
    form?.elements[1].setCustomValidity(hasCategories ? "" : "Invalid");
    form?.classList?.add("was-validated");
    return form?.checkValidity() && hasCategories;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className="modal fade"
      id="addEditBlogModal"
      aria-labelledby="addEditBlogModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addEditBlogModalLabel">
              {(addBlog && "Add Blog") || "Edit Blog"}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form id="blogForm">
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="categoryInputSelect"
                >
                  Categories
                </label>
                <select
                  className="form-select"
                  id="categoryInputSelect"
                  onChange={(e) => {
                    const category = categories?.find(
                      (x) => x.id === e.target.value
                    );
                    if (!category) {
                      return;
                    }
                    if (blog?.categories?.find((x) => x.id === category.id)) {
                      return;
                    }
                    const blogUpdate = {
                      ...blog,
                      categories: [...blog.categories, category],
                    };
                    setBlog(blogUpdate);
                  }}
                  required={editBlog ? false : true}
                >
                  {categories?.map((category, index) => {
                    return (
                      <option key={index} value={category.id}>
                        {category.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <Categories
                  categories={blog?.categories}
                  removeCategory={(category) => {
                    setBlog({
                      ...blog,
                      categories: blog?.categories.filter(
                        (x) => x.id !== category.id
                      ),
                    });
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={blog?.title}
                  onChange={(e) => {
                    setBlog({ ...blog, title: e.target.value });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={blog?.description}
                  onChange={(e) => {
                    setBlog({ ...blog, description: e.target.value });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <label htmlFor="description" className="form-label">
                Content
              </label>
              {blog?.content?.map((section, index) => {
                return (
                  <div className="p-3" key={index}>
                    <div className="mb-3">
                      <label
                        htmlFor={"sectionHeader" + index}
                        className="form-label"
                      >
                        Section Header
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={"sectionHeader" + index}
                        value={section.sectionHeader}
                        onChange={(e) => {
                          const updatedContent = blog.content.map(
                            (section, secIndex) => {
                              if (index === secIndex) {
                                return {
                                  ...section,
                                  sectionHeader: e.target.value,
                                };
                              }
                              return section;
                            }
                          );
                          setBlog({ ...blog, content: updatedContent });
                        }}
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor={"sectionText" + index}
                        className="form-label"
                      >
                        Section Text
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id={"sectionText" + index}
                        value={section.sectionText}
                        onChange={(e) => {
                          const updatedContent = blog.content.map(
                            (section, secIndex) => {
                              if (index === secIndex) {
                                return {
                                  ...section,
                                  sectionText: e.target.value,
                                };
                              }
                              return section;
                            }
                          );
                          setBlog({ ...blog, content: updatedContent });
                        }}
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {blog?.content?.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{
                      position: "absolute",
                      bottom: "45px",
                      right: "10px",
                      zIndex: "1",
                    }}
                    onClick={() => {
                      const blogUpdate = {
                        ...blog,
                        content: blog?.content.slice(0, -1),
                      };
                      setBlog(blogUpdate);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    const blogUpdate = {
                      ...blog,
                      content: [
                        ...blog?.content,
                        { sectionHeader: "", sectionText: "" },
                      ],
                    };
                    setBlog(blogUpdate);
                  }}
                >
                  <i className="bi bi-plus-circle"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={onSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
      <SuccessToast
        show={isBlogSuccess}
        message={blogsMessage}
      />
      <ErrorToast
        show={isBlogsError}
        message={blogsMessage}
      />
    </div>
  );
}

```

###### Embedding on BlogsPage
*frontend/src/pages/Blogs/index,jsx*
```jsx
import AddEditBlogModal from "../../components/AddEditBlogModal";

export default function BlogsPage() {
  const [addBlog, setAddBlog] = useState();
  const [editBlog, setEditBlog] = useState();

  const onAddBlog = () => {
    setAddBlog({
      image: "",
      title: "",
      description: "",
      categories: [],
      content: [],
      authorId: "",
    });
  };

  const AddBlog = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className="page-subtitle">Blog Posts</p>
        <button
          style={{ margin: "16px" }}
          type="button"
          className="btn btn-outline-secondary"
          onClick={onAddBlog}
        >
          Add Blog Post
        </button>
      </div>
    );
  };

  return ( 
    <AddBlog />
    <AddEditBlogModal 
      addBlog={addBlog} 
      editBlog={editBlog} 
      categories={categories} 
      createBlog={createBlog} 
      updateBlog={updateBlog} 
    />
  );
}
```

###### EditButtons 
*frontend/src/components/EditButtons/index.jsx
```jsx
import React from 'react'

export default function EditButtons({onEdit, onDelete}) {
  return (
    <>
    <button
      style={{
        position: "absolute",
        top: "10px",
        right: "60px",
        border: "none",
        zIndex: 1,
      }}
      type="button"
      className="btn"
      onClick={onEdit}
    >
      <i className="bi bi-pencil-fill"></i>
    </button>
    <button
      style={{
        position: "absolute",
        top: "10px",
        right: "35px",
        border: "none",
        zIndex: 1,
      }}
      type="button"
      className="btn"
      onClick={onDelete}
    >
      <i className="bi bi-trash-fill"></i>
    </button>
  </>
  )
}
```

###### BlogItem
*frontend/src/components/BlogItem/index.jsx*
```jsx
import React from "react";

import BlogItemText from "../BlogItemText";
import EditButtons from "../EditButtons";

import "../../App.css";
import "./index.css";

export default function BlogItem({
  index,
  blogPost,
  setBlog,
  imageOrientation,
  setEditBlog,
  setDeleteBlog
}) {


  const EditButtonsContainer = () => {
    <EditButtons
      onEdit={() => setEditBlog(blogPost)}
      onDelete={() => setDeleteBlog(blogPost)}
    />
  };


  if (imageOrientation === "top") {
    return (
      <div
        key={index}
        className="card-1"
        onClick={() => console.log("TODO: nav to blog")}
      >
        <img src={blogPost.image} className="card-img-top" alt="..." />
        <div className="card-text-bottom">
          <BlogItemText
            blogPost={blogPost}
            headerFontSize="20px"
          ></BlogItemText>
          <EditButtonsContainer />
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={index}
        className="card-2"
        onClick={() => console.log("TODO: nav to blog")}
      >
        <img src={blogPost.image} className="card-img-left" alt="..." />
        <div className="card-text-right">
          <BlogItemText
            blogPost={blogPost}
            headerFontSize="20px"
          ></BlogItemText>
        </div>
        <EditButtonsContainer />
      </div>
    );
  }
}
```

###### BlogList 
*frontend/src/components/BlogList/index.jsx*
```jsx
import React from "react";
import PropTypes from "prop-types";

import BlogItem from "../BlogItem";

export default function BlogList({ blogPosts, setEditBlog, setDeleteBlog }) {
  if (!blogPosts && !blogPosts?.length) {
    return null;
  }

  // TODO: Styling
  return (
    <div className="d-flex w-100">
      {blogPosts.map((blog, index) => {
        return (
          <BlogItem
            key={index}
            index={index}
            blogPost={blog}
            setBlog={() => {}}
            imageOrientation={"top"}
            setEditBlog={setEditBlog}
            setDeleteBlog={setDeleteBlog}
          />
        );
      })}
    </div>
  );
}

BlogList.prototype = {
    blogPosts: PropTypes.array.isRequired,
    setEditBlog: PropTypes.func.isRequired,
    setDeleteBlog: PropTypes.func.isRequired,
};
```

###### BlogsPage 
*frontend/src/pages/Blogs/index.jsx*
```jsx
export default function BlogsPage() {
  return ( 
    ...
    <BlogList 
      blogPosts={blogs} 
      onEdit={setEditBlog}
      onDelete={setDeleteBlog}
    />
  );
}
```

##### DeleteBlogModal
*frontend/src/components/DeleteBlogModal/index.jsx*
```jsx
import React, { useMemo, useEffect } from "react";
import { Modal } from "bootstrap";


export default function DeleteBlogModal({
    deleteBlog,
    removeBlog,
}) {

  const [blog, setBlog] = useState({
    image: "",
    title: "",
    description: "",
    categories: [],
    content: [],
    authorId: ""
  });

  const modalEl = document.getElementById("deleteBlogModal");
  const deleteBlogModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  useEffect(() => {
    if (deleteBlog) {
      setBlog(deleteBlog);  
      deleteBlogModal?.show();
    }
  }, [deleteBlog, deleteBlogModal]);

  const resetBlog = () => {
    setBlog({
      image: "",
      title: "",
      description: "",
      categories: [],
      content: [],
      authorId: ""
    });
  };

  const onClose = (e) => {
    e.preventDefault();
    resetBlog();
    deleteBlogModal?.hide();
  };

  const onDelete = (e) => {
    e.preventDefault();
    removeBlog(deleteBlog);
    resetBlog();
    deleteBlogModal?.hide();
  };

  return (
    <div
      className="modal fade"
      id="deleteBlogModal"
      aria-labelledby="deleteBlogModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="deleteBlogModalLabel">
              Delete Blog
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Are You sure you want to delete this Blog Post?</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={blog?.image}
                alt={blog?.title}
                style={{ width: "50px" }}
              />
              <h5 style={{ marginLeft: "8px" }}>{blog?.title}</h5>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

###### BlogsPage 
*frontend/src/pages/Blogs/index.jsx*
```jsx
import DeleteBlogModal from "../../components/DeleteBlogModal";

export default function BlogsPage() {
  const [deleteBlog, setDeleteBlog] = useState();

  const removeBlog = async (blog) => {
    try { 
      setIsLoading(true);
      const blogRes = await blogService.deleteBlogsById(blog.id);
      setBlog(null);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setMessage(error.message || error);
      setIsLoading(false);
    }
  }

  return (
    ...
    <DeleteBlogModal 
      deleteBlog={deleteBlog}
      removeBlog={removeBlog} 
    />
  );
}
```