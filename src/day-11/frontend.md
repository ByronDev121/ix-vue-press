# Frontend auth

## Auth Service

Create a new file `frontend/src/services/authService.js`

### Register

`frontend/src/services/authService.js`

```js
const register = async (userData) => {
  const response = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  localStorage.setItem("user", JSON.stringify(responseData.data));
  return responseData;
};

const authService = {
  register,
};

export default authService;
```

### Login

`frontend/src/services/authService.js`

```js
...

const login = async (userData) => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  localStorage.setItem("user", JSON.stringify(responseData.data));
  return responseData;
};

const authService = {
  register,
  login
};

export default authService;
```

### Get User

`frontend/src/services/authService.js`

```js
...

const getUser = async (authorId) => {
  const response = await fetch(
    `http://localhost:8000/api/auth/user/${authorId}`
  );

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};

const authService = {
  register,
  login,
  getUser
};

export default authService;
```

### Update User

`frontend/src/services/authService.js`

```js
...

const updateUser = async (userId, userData) => {
  const response = await fetch(
    `http://localhost:8000/api/auth/user/${userId}`,
    {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
      body: userData,
    }
  );

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};

const authService = {
  register,
  login,
  getUser,
  updateUser
};

export default authService;
```

## Register Page

`frontend/src/pages/Register/index.jsx`

```jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./index.css";

import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";
import authService from "../../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, bio, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authService.register(formData);
      setMessage(res.message);
      setIsSuccess(true);
      navigate("/home");
      setLoading(false);
    } catch (err) {
      setMessage(err);
      setIsError(true);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="html-body">
        <main className="form-signin">
          <form onSubmit={onSubmit}>
            <h1 className="h3 mb-3 fw-normal">Author registration</h1>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Joe"
                value={firstName}
                onChange={onChange}
              />
              <label htmlFor="firstName">First name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Soap"
                value={lastName}
                onChange={onChange}
              />
              <label htmlFor="lastName">Last name</label>
            </div>
            <div className="form-floating">
              <textarea
                type="text"
                className="form-control"
                id="bio"
                name="bio"
                placeholder="name@example.com"
                value={bio}
                onChange={onChange}
              />
              <label htmlFor="bio">Bio</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="..."
                value={email}
                onChange={onChange}
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Register
            </button>
            <Link to="/login" className="my-5">
              Login
            </Link>
            <p className="mt-5 mb-3 text-muted text-center">
              The Blog App &copy; 2024
            </p>
          </form>
        </main>
      </div>
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

`frontend/src/pages/Register/index.css`

```css
.html-body {
  height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
```

## Login Page

`frontend/src/pages/Login/index.jsx`

```jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";

import "./index.css";

import authService from "../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authService.login(formData);
      setMessage(res.message);
      setIsSuccess(true);
      navigate("/home");
      setLoading(false);
    } catch (err) {
      setMessage(err);
      setIsError(true);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="html-body">
        <main className="form-signin">
          <form onSubmit={onSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please login</h1>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={onChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>

            <Link to="/register" className="my-5">
              Register
            </Link>
            <p className="mt-5 mb-3 text-muted text-center">
              The Blog App &copy; 2024
            </p>
          </form>
        </main>
      </div>
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

`frontend/src/pages/Login/index.css`

```css
.html-body {
  height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
```

## Authenticate Routes

### Authenticate Blog Routes

`frontend/src/services/blogsService.js`

```jsx{6}
const createBlog = async (blog) => {
  const response = await fetch(baseURL + "/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
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

```jsx{6}
const updateBlog = async (blog) => {
  const response = await fetch("http://localhost:8000/api/blogs/" + blog.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
       Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
    body: JSON.stringify(blog),
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

```jsx{6}
const deleteBlog = async (id) => {
  const response = await fetch("http://localhost:8000/api/blogs/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
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

### Authenticate Category Routes

`frontend/src/services/categoryService.js`

```jsx{6}
const createCategory = async (category) => {
  const response = await fetch("http://localhost:8000/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
    body: JSON.stringify(category),
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

  const categoriesApiData = await response.json();
  return categoriesApiData;
};

```

```jsx{6}
const updateCategory = async (category) => {
  const response = await fetch(
    "http://localhost:8000/api/categories/" + category.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
      body: JSON.stringify(category),
    }
  );

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

  const categoriesApiData = await response.json();
  return categoriesApiData;
};
```

```jsx{6}
const deleteCategory = async (id) => {
  const response = await fetch("http://localhost:8000/api/categories/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",\
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
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

  const categoriesApiData = await response.json();
  return categoriesApiData;
};
```

## Components

### Navbar

`frontend/src/components/Navbar/index.jsx`

```jsx
import { useNavigate } from "react-router-dom";

...

const user = JSON.parse(localStorage.getItem("user"))
const navigate = useNavigate();

...

{
  user && user.token ? (
    <li className="nav-item">
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-person-circle"></i>
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link
              className=" dropdown-item"
              aria-current="page"
              to={"/profile/" + user.id}
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              style={{ cursor: "pointer" }}
              className="dropdown-item"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </li>
  ) : null;
}
```

#### CategoriesList

`frontend/src/components/Navbar/CategoriesList.jsx`

```jsx{1,6}
const user = JSON.parse(localStorage.getItem("user"))

...

{
  user && user.token && onEdit && onDelete && (
    <EditButtons
      onEdit={() => {
        onEdit(category);
      }}
      onDelete={() => {
        onDelete(category);
      }}
    />
  );
}
```

#### BlogItem

`frontend/src/components/Navbar/BlogItem.jsx`

```jsx{1,6}
const user = JSON.parse(localStorage.getItem("user"))

...

{
  user && user.token && onBlogEdit && onBlogDelete ? (
    <EditButtonsContainer />
  ) : null;
}
```

#### AddEditBlogModal

```js{1,11}
const user = JSON.parse(localStorage.getItem("user"));

...

const resetBlog = () => {
  setBlog({
    title: "",
    description: "",
    categories: [],
    content: [],
    authorId: user?.id,
  });
};
```

#### Blogs Page

```jsx{1,10,23}
const user = JSON.parse(localStorage.getItem("user"))

...

const onBlogAdd = () => {
  setAddBlog({
    title: "",
    description: "",
    categories: [],
    authorId: user._id,
    content: [
      {
        sectionHeader: "",
        sectionText: "",
      },
    ],
  });
};

...

const AddButton = () => {
if(!user?.token) return null;
return (
  <button className="btn btn-outline-dark h-75" onClick={onBlogAdd}>
    ADD BLOG
  </button>
);
};
```

#### Categories Page

```jsx{1,5}
const user = JSON.parse(localStorage.getItem("user"))

...
const AddButton = () => {
  if(!user?.token) return null;
  return (
    <button className="btn btn-outline-dark h-75" onClick={onCategoryAdd}>
      ADD CATEGORY
    </button>
  );
};
```

