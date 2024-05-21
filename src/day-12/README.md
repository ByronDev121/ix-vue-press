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
import blogReducer from "../features/blogsSlice";
import categoryReducer from "../features/categoriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
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

## Redux Reducers

### Define Redux Reducers

Since we want to keep the blogs data in state, we need a reducer to fetch the data from the our backend API and set the blogs state. We then need to move the HTTP request from the useEffect hook in the Home page to it's own Reducer in the blog state slice. We can then dispatch the fetchBlogs action to query the API and store the response in global state. We use the createAsyncThunk function from "@reduxjs/toolkit" to handle async reducer functions. This allows the state slice to listen to the events such as pending, fulfilled and rejected.

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

### Final updated home page

```js
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, reset as resetBlog } from "../../features/blogsSlice";
import {
  fetchCategories,
  reset as resetCategory,
} from "../../features/categoriesSlice";

import { Toast, ToastContainer } from "react-bootstrap";

import "../../App.css";

import Heading from "../../components/Heading";
import Navbar from "../../components/Navbar";
import BlogGrid from "../../components/BlogGrid";
import Footer from "../../components/Footer";
import SubHeading from "../../components/SubHeading";
import CategoryList from "../../components/CategoryList";

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
    return <div>Loading...</div>;
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
      <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
        <Toast
          bg="danger"
          onClose={() => {}}
          autohide
          show={isCategoriesError || isBlogsError}
          delay={5000}
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body style={{ color: "white" }}>
            {categoriesMessage || blogsMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
```
