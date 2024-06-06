# State Management Using Redux

[[toc]]

## Getting started

### Install Redux and Redux tool kit

```bash
npm install @reduxjs/toolkit react-redux
```

## Redux Store

### Create Redux Store

In `frontend/src/app/` create a file called `store.js`

![Redux Store File Structure](/ix-vue-press/redux-store-file-structure.png)

### Define Redux Store

Define Redux store byt importing configureStore from "@reduxjs/toolkit" and instantiate an instance of store with your defined reducers.

```js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import authorReducer from "../features/authorSlice";
import blogReducer from "../features/blogsSlice";
import categoryReducer from "../features/categoriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    author: authorReducer,
    blogs: blogReducer,
    categories: categoryReducer,
  },
});
```

### Provide Redux store to react application and all its components

In index.js in the root directory of your project import the Provider element from redux ad import your store created in the last step. Wrap the Base App element in the redux provider element and pass in store as an argument to provide the react application access tot he global state and the redux API.

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

## Redux State

### Create Redux Blog State Slice

In `frontend/src/app/features` create a file called `blogSlice.js`

![Redux State File Structure](/ix-vue-press/redux-features-file-structure.png)

### Define Redux Blog State Slice

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import blogService from "../services/blogService";

const initialState = {
  blog: null,
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = blogsSlice.actions;
export default blogsSlice.reducer;
```

:::tip
**Note:** Both the blogsSlice reducer and actions are exported from this file  
:::

## Redux Reducers

### Define Redux Reducers

Since we want to keep the blogs data in state, we need a reducer to fetch the data from the our backend API and set the blogs state. We then need to move the HTTP request from the useEffect hook in the Home page to it's own Reducer in the blog state slice. We can then dispatch the fetchBlogs action to query the API and store the response in global state. We use the createAsyncThunk function from "@reduxjs/toolkit" to handle async reducer functions. This allows the state slice to listen to the events such as pending, fulfilled and rejected.

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import blogService from "../services/blogService";

const initialState = {
  addBlog: null,
  editBlog: null,
  deleteBlog: null,
  blog: null,
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, thunkAPI) => {
    try {
      return await blogService.fetchBlogs();
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, { payload }) => {
        state.blogs = payload.data;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(fetchBlogs.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset } = blogsSlice.actions;
export default blogsSlice.reducer;
```

## Dispatch Redux Action

### Dispatch Redux Action

We need to then update the useEffect hook in the Home page dispatch the fetchBlogs action to query the API and store the response in global state.

```js
import { useDispatch } from "react-redux";
import { fetchBlogs, reset as resetBlogs } from "../../features/blogsSlice";
...

export default function HomePage() {
  ...

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
    return () => {
      dispatch(resetBlogs());
    };
  }, [dispatch]);

  ...

}

```

## Accessing Redux State

### Accessing Redux State

We need the Home page component to subscribe the blogs state and update the UI whent he state changes. We can do this by importing useSelector from react-redux and destructuring the blog state slice. Every time the global state slice that we are listening to update the component will re render.

```js{1,9-15,26,36,46,53}
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, reset as resetBlogs } from "../../features/blogsSlice";
...

export default function HomePage() {
  ...

  const dispatch = useDispatch();
  const {
    blogs,
    isError: isBlogsError,
    isSuccess: blogsSuccess,
    isLoading: isLoadingBlogs,
    message: blogsMessage,
  } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
    return () => {
      dispatch(resetBlogs());
    };
  }, [dispatch]);

  ...

}

```

### Create Redux Category State Slice

In `frontend/src/app/features` create a file called `categorySlice.js`

![Redux State File Structure](/ix-vue-press/redux-features-file-structure.png)

### Define Redux Category State Slice:

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import categoryService from "../services/categoryService";

const initialState = {
  addCategory: null,
  editCategory: null,
  deleteCategory: null,
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      return await categoryService.fetchCategories();
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.data;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset } = categoriesSlice.actions;
export default categoriesSlice.reducer;
```

### Final updated home page

```js
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, reset as resetBlog } from "../../features/blogsSlice";
import {
  fetchCategories,
  reset as resetCategory,
} from "../../features/categoriesSlice";

import "../../App.css";

import Heading from "../../components/Heading";
import Navbar from "../../components/Navbar";
import BlogGrid from "../../components/BlogGrid";
import Footer from "../../components/Footer";
import SubHeading from "../../components/SubHeading";
import CategoryList from "../../components/CategoryList";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";

export default function HomePage() {
  const dispatch = useDispatch();

  const {
    blogs,
    isError: isBlogsError,
    isSuccess: blogsSuccess,
    isLoading: isLoadingBlogs,
    message: blogsMessage,
  } = useSelector((state) => state.blogs);

  const {
    categories,
    isError: isCategoriesError,
    isSuccess: isCategoriesSuccess,
    isLoading: isLoadingCategories,
    message: categoriesMessage,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBlogs());
    return () => {
      dispatch(resetBlog());
      dispatch(resetCategory());
    };
  }, [dispatch]);

  if (isLoadingCategories || isLoadingBlogs) {
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
        show={isBlogSuccess || isCategoriesSuccess}
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          dispatch(resetBlog());
          dispatch(resetCategory());
        }}
      />
      <ErrorToast
        show={isBlogsError || isCategoriesError}
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          dispatch(resetBlog());
          dispatch(resetCategory());
        }}
      />
    </>
  );
}
```

### Create Redux Auth State Slice

In `frontend/src/app/features` create a file called `authSlice.js`

![Redux State File Structure](/ix-vue-press/redux-features-file-structure.png)

### Define Redux Auth State Slice:

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../services/authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user || null,
  editUser: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, userData }, thunkAPI) => {
    try {
      return await authService.updateUser(userId, userData);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSuccessAndError: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setEditUser: (state, { payload }) => {
      state.editUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload.message;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload.message;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.editUser = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload.message;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset, resetSuccessAndError, setEditUser } = authSlice.actions;
export default authSlice.reducer;
```

### Register Page

`frontend/src/page/Register/index.jsx`

```jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register, reset } from "../../features/authSlice";

import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, bio, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/home");
    }
  }, [user, isError, isSuccess, isLoading, message, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

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
          dispatch(reset());
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          dispatch(reset());
        }}
      />
    </>
  );
}
```

### Login Page

`frontend/src/page/Login/index.jsx`

```jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetSuccessAndError } from "../../features/authSlice";

import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

import "./index.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/home");
    }
  }, [user, isError, isSuccess, isLoading, message, navigate]);

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
    dispatch(login(formData));
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
          dispatch(resetSuccessAndError());
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          dispatch(resetSuccessAndError());
        }}
      />
    </>
  );
}
```

### Create Redux Author State Slice

In `frontend/src/app/features` create a file called `authorSlice.js`

### Define Redux Author State Slice:

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../services/authService";
import blogService from "../services/blogService";

const initialState = {
  author: null,
  authorBlogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Fetch Author
export const fetchAuthor = createAsyncThunk(
  "auth/fetchAuthor",
  async (userData, thunkAPI) => {
    try {
      return await authService.getUser(userData);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchBlogsByAuthorId = createAsyncThunk(
  "blogs/fetchBlogsByAuthorId",
  async (authorId, thunkAPI) => {
    try {
      return await blogService.fetchBlogsByAuthorId(authorId);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSuccessAndError: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuthor.fulfilled, (state, { payload }) => {
        state.author = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchAuthor.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(fetchBlogsByAuthorId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogsByAuthorId.fulfilled, (state, { payload }) => {
        state.authorBlogs = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchBlogsByAuthorId.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      });
  },
});

export const { reset, resetSuccessAndError } = authSlice.actions;
export default authSlice.reducer;
```

### Blogs page:

```jsx
// Third party
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import DeleteBlogModal from "../../components/DeleteBlogModal";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";

// Styles
import "../../App.css";
import "./index.css";

// State
import {
  setAddBlog,
  fetchBlogsByCategoryId,
  resetSuccessAndError as resetBlog,
} from "../../features/blogsSlice";
import {
  fetchCategories,
  resetSuccessAndError as resetCategory,
} from "../../features/categoriesSlice";

export default function BlogsPage() {
  const { categoryId } = useParams();

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const {
    blogs,
    isError: isBlogsError,
    isSuccess: isBlogSuccess,
    isLoading: isLoadingBlogs,
    message: blogsMessage,
  } = useSelector((state) => state.blogs);
  const {
    categories,
    isError: isCategoriesError,
    isSuccess: isCategoriesSuccess,
    isLoading: isLoadingCategories,
    message: categoriesMessage,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBlogsByCategoryId(categoryId));
    return () => {
      dispatch(resetBlog());
      dispatch(resetCategory());
    };
  }, [categoryId]);

  const onAddBlog = () => {
    dispatch(
      setAddBlog({
        image: "",
        title: "",
        description: "",
        categories: [],
        content: [],
        authorId: user?.id,
      })
    );
  };

  const CategoriesList = () => {
    return categories.map((category, index) => {
      return categoryId === category.id.toString() ? (
        <Link
          key={index}
          to={"/blogs/" + category.id}
          style={{ color: "blue" }}
        >
          <p key={index}>{category.title}</p>
        </Link>
      ) : (
        <Link
          key={index}
          to={"/blogs/" + category.id}
          style={{ color: "black" }}
        >
          <p key={index}>{category.title}</p>
        </Link>
      );
    });
  };

  const AddBlog = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className="page-subtitle">Blog Posts</p>
        {user && (
          <button
            style={{ margin: "16px" }}
            type="button"
            className="btn btn-outline-secondary"
            onClick={onAddBlog}
          >
            Add Blog Post
          </button>
        )}
      </div>
    );
  };

  if (isLoadingCategories || isLoadingBlogs) {
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
        <AddBlog />
        <BlogList blogPosts={blogs} />
      </div>
      <Footer />
      <AddEditBlogModal />
      <DeleteBlogModal />
      <SuccessToast
        show={isBlogSuccess || isCategoriesSuccess}
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          dispatch(resetBlog());
          dispatch(resetCategory());
        }}
      />
      <ErrorToast
        show={isBlogsError || isCategoriesError}
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          dispatch(resetBlog());
          dispatch(resetCategory());
        }}
      />
    </>
  );
}
```

:::tip
**Note:**

const [addBlog, setAddBlog] = useState();
const [editBlog, setEditBlog] = useState();
const [deleteBlog, setDeleteBlog] = useState();

Is not used anymore this is now in global state.

The functions createBlog, updateBlog and deleteBlog are no longer defined in this page. They are be defined in the state as well.
:::

### Global Blogs CRUD State:

Update `frontend/src/features/blogsSlice.js`

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import blogService from "../services/blogService";

const initialState = {
  addBlog: null,
  editBlog: null,
  deleteBlog: null,
  blog: null,
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blog, thunkAPI) => {
    try {
      return await blogService.createBlog(blog);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, thunkAPI) => {
    try {
      return await blogService.fetchBlogs();
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchBlogsByCategoryId = createAsyncThunk(
  "blogs/fetchBlogsByCategoryId",
  async (categoryId, thunkAPI) => {
    try {
      return await blogService.fetchBlogsByCategoryId(categoryId || null);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (blogId, thunkAPI) => {
    try {
      return await blogService.fetchBlogById(blogId);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (blog, thunkAPI) => {
    try {
      return await blogService.updateBlog(blog);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteBlogById = createAsyncThunk(
  "blogs/deleteBlogById",
  async (blogId, thunkAPI) => {
    try {
      return await blogService.deleteBlogsById(blogId);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSuccessAndError: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setEditBlog: (state, { payload }) => {
      state.editBlog = payload;
      state.addBlog = null;
      state.deleteBlog = null;
    },
    setAddBlog: (state, { payload }) => {
      state.addBlog = payload;
      state.editBlog = null;
      state.deleteBlog = null;
    },
    setDeleteBlog: (state, { payload }) => {
      state.deleteBlog = payload;
      state.addBlog = null;
      state.editBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        state.blogs.push(payload.data);
        state.addBlog = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload.message;
      })
      .addCase(createBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, { payload }) => {
        state.blogs = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchBlogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(fetchBlogsByCategoryId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogsByCategoryId.fulfilled, (state, { payload }) => {
        state.blogs = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchBlogsByCategoryId.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, { payload }) => {
        state.blog = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchBlogById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload.message;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        const index = state.blogs.findIndex((x) => x.id === payload.data.id);
        state.blogs = state.blogs.filter((x) => x.id !== payload.data.id);
        state.blogs.splice(index, 0, payload.data);
        state.editBlog = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload.message;
      })
      .addCase(updateBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(deleteBlogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogById.fulfilled, (state, { payload }) => {
        state.blogs = state.blogs.filter((x) => x !== payload.id);
        state.deleteBlog = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.message = payload.message;
      })
      .addCase(deleteBlogById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      });
  },
});

export const {
  reset,
  resetSuccessAndError,
  setAddBlog,
  setEditBlog,
  setDeleteBlog,
} = blogsSlice.actions;
export default blogsSlice.reducer;
```

### AddEditBlogModal

Update `frontend/src/components/AddEditBlogModal/index.js`

```jsx
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components:
import Categories from "../Categories";
import FormImage from "../FormImage";

// State:
import {
  createBlog,
  updateBlog,
  setAddBlog,
  setEditBlog,
} from "../../features/blogsSlice";

/**
 * AddEditBlogModal component
 *
 * @description
 * This component is responsible for rendering the AddEditBlogModal component.
 * It displays a modal with a form that allows the user to add a new blog or edit an existing blog.
 *
 * @returns {JSX.Element}
 */
export default function AddEditBlogModal() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const modalEl = document.getElementById("addEditBlogModal");
  const addEditBlogModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  const { addBlog, editBlog } = useSelector((state) => state.blogs);
  const { categories } = useSelector((state) => state.categories);

  const [blogImage, setBlogImage] = useState("");
  const [blog, setBlog] = useState({
    image: "",
    title: "",
    description: "",
    categories: [],
    content: [],
    authorId: user?.id,
  });

  useEffect(() => {
    if (addBlog) {
      setBlog(addBlog);
      setBlogImage(addBlog.image);
      addEditBlogModal?.show();
    } else if (editBlog) {
      setBlog(editBlog);
      setBlogImage(editBlog.image);
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
      authorId: user?.id,
    });
  };

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("id", blog.id);
    formData.append("image", blog.image);
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    formData.append(
      "categoryIds",
      JSON.stringify(blog.categories.map((x) => x.id))
    );
    formData.append("content", JSON.stringify(blog.content));
    formData.append("authorId", user?.id);
    return formData;
  };

  const onClose = (e) => {
    e.preventDefault();
    resetBlog();
    if (editBlog) {
      dispatch(setEditBlog(null));
    } else {
      dispatch(setAddBlog(null));
    }
    addEditBlogModal.hide();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const blogForm = buildFormData();
      if (editBlog) {
        if (blogForm.get("image") === editBlog.image) {
          blogForm.delete("image");
        }
        dispatch(updateBlog(blogForm));
      } else {
        dispatch(createBlog(blogForm));
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

  const onImageChange = (e) => {
    if (e?.target?.files?.length) {
      const file = e.target.files[0];
      setBlogImage(URL.createObjectURL(file));
      setBlog({ ...blog, image: file });
    }
  };

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
              <FormImage image={blogImage} onChange={onImageChange} />
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
    </div>
  );
}
```

### DeleteBlogModal

Update `frontend/src/components/DeleteBlogModal/index.js`

```jsx
import React, { useMemo, useEffect } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { deleteBlogById, setDeleteBlog } from "../../features/blogsSlice";

export default function DeleteBlogModal() {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.deleteBlog);

  const modalEl = document.getElementById("deleteBlogModal");
  const deleteBlogModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  useEffect(() => {
    if (blog) {
      deleteBlogModal?.show();
    }
  }, [blog, deleteBlogModal]);

  const onClose = (e) => {
    e.preventDefault();
    dispatch(setDeleteBlog(null));
    deleteBlogModal?.hide();
  };

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteBlogById(blog.id));
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
