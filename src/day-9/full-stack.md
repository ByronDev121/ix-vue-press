# Implementing Full Stack Development

[[toc]]

## Frontend

### Service

#### _blogService.js _

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

- Route: _POST - /api/blogs/_

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

- Route: _GET - /api/blogs/_

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

- Route: _GET - /api/blogs/:id_

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

- Route: _GET - /api/blogs/category/:id_

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

- Route: _GET - /api/blogs/author/:id_

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

- Route: _PUT - /api/blogs/:id_

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

- Route: _DELETE - /api/blogs/:id_

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

_frontend/src/components/Loading/index.jsx_

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

_frontend/src/components/SuccessToast/index.jsx_

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

_frontend/src/components/ErrorToast/index.jsx_

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

_frontend/src/pages/Home/index.jsx_

```jsx
import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import SubHeading from "../../components/Subheading";
import BlogGrid from "../../components/BlogGrid";
import CategoriesList from "../../components/CategoriesList";
import Footer from "../../components/Footer";

import blogService from "../../services/blogService";
import categoryService from "../../services/categoryService";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";

export default function Home() {
  const [loading, setLoading] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();
  const [message, setMessage] = useState();
  const [blogs, setBlogs] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const blogsRes = await blogService.getBlogs();
        const categoryRes = await categoryService.getCategories();
        setBlogs(blogsRes.data.reverse());
        setCategories(categoryRes.data);
        setLoading(false);
      } catch (err) {
        setIsError(true);
        setMessage(err);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Heading />
      <div className="container">
        <SubHeading subHeading={"Recent blog posts"} />
        <BlogGrid blogs={blogs} />
        <SubHeading subHeading={"Categories"} />
        <CategoriesList categories={categories} />
        <Footer />
        <SuccessToast
          show={isSuccess}
          message={message}
          onClose={() => {
            setIsSuccess(false);
          }}
        />
        <ErrorToast
          show={isError}
          message={message}
          onClose={() => {
            setIsError(false);
          }}
        />
      </div>
    </>
  );
}
```

##### BlogsPage

_frontend/src/pages/Blogs/index.jsx_

```jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";

import { useParams, Link } from "react-router-dom";

import "./index.css";

import AddEditBlogModal from "../../components/AddEditBlogModal";
import Loading from "../../components/Loading";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import DeleteBlogModal from "../../components/DeleteBlogModal";

import blogService from "../../services/blogService";
import categoryService from "../../services/categoryService";

export default function BlogsPage() {
  const { categoryId } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const blogsRes = await blogService.getBlogsByCategoryId(
          categoryId || null
        );
        const categoriesRes = await categoryService.getCategories();
        setBlogs(blogsRes.data.reverse());
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (err) {
        setIsError(true);
        setMessage(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const CategoriesList = ({ categoryId }) => {
    if (!categories && !categories?.length) {
      return null;
    }

    return categories.map((category) => {
      return categoryId === category.id ? (
        <Link
          className="link"
          key={category.id}
          to={"/blogs/" + category.id}
          style={{ color: "blue" }}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      ) : (
        <Link
          className="link"
          key={category.id}
          to={"/blogs/" + category.id}
          style={{ color: "black" }}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      );
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesList categoryId={categoryId} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Blog Posts</p>
        </div>
        <BlogList blogs={blogs} />
        />
      </div>
      <Footer />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={() => {
          setIsSuccess(false);
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          setIsError(false);
        }}
      />
    </>
  );
}
```

##### BlogPage

_frontend/src/pages/Blog/index.jsx_

```jsx
import React, { useEffect, useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

import Categories from "../../components/Categories";
import Footer from "../../components/Footer";

import blogService from "../../services/blogService";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";

import "./index.css";

export default function BlogPage() {
  const navigate = useNavigate();
  const { blogId } = useParams();

  const [blog, setBlog] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const blog = await blogService.getBlogByID(blogId);
        setBlog(blog.data);
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
  };

  const resetError = () => {
    setIsError(false);
    setMessage("");
  };

  const navigateToAuthorProfile = () => {
    navigate("/profile/" + blog.author.id);
  };

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
      <SuccessToast show={isSuccess} message={message} onClose={resetSuccess} />
      <ErrorToast show={isError} message={message} onClose={resetError} />
    </>
  );
}
```

_frontend/src/pages/Blog/index.css_

```css
.cover-img {
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.author {
}
.author:hover {
  cursor: pointer;
}

.avatar {
  display: block;
  border-radius: 50%;
  width: 50%;
  margin: 16px auto;
}
```

##### ProfilePage

\*frontend/src/pages/Profile/index.jsx

```jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import DeleteBlogModal from "../../components/DeleteBlogModal";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

import blogService from "../../services/blogService";

export default function ProfilePage() {
  const { authorId } = useParams();

  const [author, setAuthor] = useState({
    id: 1,
    firstName: "Byron",
    lastName: "de Villiers",
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://storage.googleapis.com/ix-blog-app/download.png",
  });
  const [blogs, setBlogs] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthorBlogs = async () => {
      try {
        setIsLoading(true);
        const blogs = await blogService.getBlogsByAuthorId(authorId);
        setBlogs(blogs.data);
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
  };

  const resetError = () => {
    setIsError(false);
    setMessage("");
  };

  const AuthorDetails = () => {
    return (
      <div className="col-md-8 col-lg-6 col-xl-4 mx-auto">
        <div className="position-sticky my-5" style={{ top: "2rem" }}>
          <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic">
              {author.firstName} {author.lastName}
            </h4>
            <img src={author.image} className="avatar" alt="..." />
            <p>{author.bio.substring(0, 100)}...</p>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <AuthorDetails />
        <p className="page-subtitle">Author Blog Posts</p>
        <BlogList blogs={blogs} />
        <Footer />
      </div>
      <AddEditBlogModal />
      <DeleteBlogModal />
      <SuccessToast show={isSuccess} message={message} onClose={resetSuccess} />
      <ErrorToast show={isError} message={message} onClose={resetError} />
    </>
  );
}
```

###### Embedding on BlogsPage

_frontend/src/pages/Blogs/index,jsx_

```jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";

import { useParams, Link } from "react-router-dom";

import "./index.css";

import AddEditBlogModal from "../../components/AddEditBlogModal";
import Loading from "../../components/Loading";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

import blogService from "../../services/blogService";
import categoryService from "../../services/categoryService";

export default function BlogsPage() {
  const { categoryId } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [addBlog, setAddBlog] = useState();
  const [editBlog, setEditBlog] = useState();
  const [categories, setCategories] = useState();

  const [loading, setLoading] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const blogsRes = await blogService.getBlogsByCategoryId(
          categoryId || null
        );
        const categoriesRes = await categoryService.getCategories();
        setBlogs(blogsRes.data);
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (err) {
        setIsError(true);
        setMessage(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const onBlogAdd = () => {
    setAddBlog({
      title: "",
      description: "",
      categories: [],
      author: {
        id: 1,
        firstName: "Byron",
        lastName: "de Villiers",
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "https://storage.googleapis.com/ix-blog-app/download.png",
      },
      content: [
        {
          sectionHeader: "",
          sectionText: "",
        },
      ],
    });
  };

  const onBlogUpdate = (blog) => {
    setEditBlog(blog);
  };

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.createBlog(blog);
      setIsSuccess(true);
      setMessage(newBlog.message);
      setBlogs((prev) => {
        return [...prev, newBlog.data];
      });
    } catch (err) {
      setIsError(true);
      setMessage(err);
    }
    setAddBlog(null);
  };

  const updateBlog = async (blog) => {
    try {
      const newBlog = await blogService.updateBlog(blog);
      setIsSuccess(true);
      setMessage(newBlog.message);
      setBlogs((prev) => {
        return prev.map((x) => {
          if (x.id === newBlog.data.id) {
            return newBlog.data;
          }
          return x;
        });
      });
    } catch (err) {
      setIsError(true);
      setMessage(err);
    }
    setEditBlog(null);
  };

  const CategoriesList = ({ categoryId }) => {
    if (!categories && !categories?.length) {
      return null;
    }

    return categories.map((category) => {
      return categoryId === category.id ? (
        <Link
          className="link"
          key={category.id}
          to={"/blogs/" + category.id}
          style={{ color: "blue" }}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      ) : (
        <Link
          className="link"
          key={category.id}
          to={"/blogs/" + category.id}
          style={{ color: "black" }}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      );
    });
  };

  const AddButton = () => {
    return (
      <button className="btn btn-outline-dark h-75" onClick={onBlogAdd}>
        ADD BLOG
      </button>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesList categoryId={categoryId} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Blog Posts</p>
          <AddButton />
        </div>
        <BlogList
          blogs={blogs}
          onBlogEdit={onBlogUpdate}
          onBlogDelete={onBlogDelete}
        />
        <AddEditBlogModal
          categories={categories}
          addBlog={addBlog}
          editBlog={editBlog}
          createBlog={createBlog}
          updateBlog={updateBlog}
          onClose={() => {
            setAddBlog(null);
            setEditBlog(null);
          }}
        />
      </div>
      <Footer />
    </>
  );
}
```

###### EditButtons

\*frontend/src/components/EditButtons/index.jsx

```jsx
import React from "react";

export default function EditButtons({ onEdit, onDelete }) {
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
  );
}
```

###### BlogItem

_frontend/src/components/BlogItem/index.jsx_

```jsx
import React from "react";

import BlogItemText from "../BlogItemText";
import EditButtons from "../EditButtons";

import "../../App.css";
import "./index.css";

export default function BlogItem({
  index,
  blog,
  imageOrientation,
  onBlogEdit,
  onBlogDelete,
}) {
  const EditButtonsContainer = () => {
    return (
      <EditButtons
        onEdit={() => onBlogEdit(blog)}
        onDelete={() => onBlogDelete(blog)}
      />
    );
  };

  if (imageOrientation === "top") {
    return (
      <div
        key={index}
        className="card-1"
        onClick={() => console.log("TODO: nav to blog")}
      >
        <img src={blog.image} className="card-img-top" alt="..." />
        <div className="card-text-bottom">
          <BlogItemText blog={blog} headerFontSize="20px" />
          {onBlogEdit && onBlogDelete ? <EditButtonsContainer /> : null}
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
        <img src={blog.image} className="card-img-left" alt="..." />
        <div style={{ position: "relative" }} className="card-text-right">
          <BlogItemText blog={blog} headerFontSize="20px" />
          {onBlogEdit && onBlogDelete ? <EditButtonsContainer /> : null}
        </div>
      </div>
    );
  }
}
```

###### BlogList

_frontend/src/components/BlogList/index.jsx_

```jsx
import React from "react";
import PropTypes from "prop-types";

import BlogItem from "../BlogItem";

import "./index.css";

export default function BlogList({ blogs, onBlogEdit, onBlogDelete }) {
  if (!blogs && !blogs?.length) {
    return null;
  }

  return (
    <div className="blog-list">
      {blogs.map((blog, index) => {
        return (
          <BlogItem
            key={index}
            index={index}
            blog={blog}
            imageOrientation={"top"}
            onBlogEdit={onBlogEdit}
            onBlogDelete={onBlogDelete}
          />
        );
      })}
    </div>
  );
}

BlogList.prototype = {
  blogs: PropTypes.array.isRequired,
  onBlogEdit: PropTypes.func.isRequired,
  onBlogDelete: PropTypes.func.isRequired,
};
```

##### DeleteBlogModal

_frontend/src/components/DeleteBlogModal/index.jsx_

```jsx
import React, { useMemo, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import PropTypes from "prop-types";

export default function DeleteBlogModal({ deleteBlog, removeBlog, onClose }) {
  const [blog, setBlog] = useState();

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
      authorId: "",
    });
  };

  const onCloseModal = () => {
    resetBlog();
    onClose();
    deleteBlogModal?.hide();
  };

  const onDelete = () => {
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
              aria-label="Close"
              onClick={onCloseModal}
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
              onClick={onCloseModal}
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

DeleteBlogModal.prototype = {
  deleteBlog: PropTypes.object,
  removeBlog: PropTypes.func,
};
```

###### BlogsPage

_frontend/src/pages/Blogs/index.jsx_

```jsx
import DeleteBlogModal from "../../components/DeleteBlogModal";

export default function BlogsPage() {
  const [deleteBlog, setDeleteBlog] = useState();

 const removeBlog = async (blog) => {
    try {
      const newBlog = await blogService.deleteBlog(blog.id);
      setIsSuccess(true);
      setMessage(newBlog.message);
      setBlogs((prev) => {
        return prev.filter((x) => x.id !== blog.id);
      });
    } catch (err) {
      setIsError(true);
      setMessage(err);
    }
    setDeleteBlog(null);
  };

  return (
    ...
    <DeleteBlogModal
      deleteBlog={deleteBlog}
      removeBlog={removeBlog}
      onClose={() => setDeleteBlog(null)}
    />
  );
}
```
