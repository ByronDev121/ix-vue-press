# Routes

[[toc]]

## Installation

### npm Instructions

```bash
npm install react-router-dom
```

### Importing/Utilizing React Router

From your *page.js*:

```jsx
import { createBrowserRouter } from "react-router-dom";
import { Link, useNavigate, useParams } from "react-router-dom";
```

## Utilizing

## Routers

Stateful, top-level component that makes all the other components and hooks work.

### createBrowserRouter

Recommended router for web application.

```jsx
import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import BlogsPage from "./pages/Blogs";
import CategoriesPage from "./pages/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
  {
    path: "/blogs/:categoryId?",
    element: <BlogsPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

## Component

### Link
To be able to navigate inside a page we use the React Router Link component.

#### HomePage with NavBar 

```jsx
import React from "react";

import Navbar from "../../components/Navbar";

export default function HomePage() {

  return (
    <>
      <Navbar />
    </>
  );
}
```

#### NavBar


```jsx
import React from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div style={{ margin: "0px 5%" }} className="container-fluid">
        <Link className="navbar-brand" to="/home">
          iX Software Engineering Blog
        </Link>
      </div>
    </nav>
  );
}
```



## Hooks

### useNavigate

Trigger a navigation event from within a component

#### CategoriesPage Component
```jsx
import React from "react";

import CategoryList from "../../components/CategoryList";

const data = require("../../dummy-data.json");
const categories = data.categories;

export default function CategoriesPage() {
  return (
    <>
      <CategoryList
          categories={categories}
      ></CategoryList>
    </>
  );
}
```

#### CategoryList Subcomponent
```jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function CategoryList({ categories }) {
  const navigate = useNavigate();

  return (
    <div className="category-list">
      {categories.map((category, index) => {
        return (
          <div
            key={index}
            className="card"
            style={{ borderRadius: "0px", border: "none" }}
            onClick={() => {
              navigate("/blogs/" + category.id);
            }}
          >
          </div> 
        );
      })}
    </div>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
};
```

### useParams

Access the URL parameters of a Route.

```jsx
import React from "react";

import { useParams } from "react-router-dom";

const data = require("../../dummy-data.json");
let blogPosts = data.blogPosts;
const categories = data.categories;

export default function BlogsPage() {

  const { categoryId } = useParams();
  
  //Filtering blogs by the ctergoryId passed in the URL
   blogPosts = blogPosts.filter((x) =>
    categoryId !== undefined
      ? x.categories.find((y) => y.id.toString() === categoryId)
      : true
  );

}
```
