# State Management

[[toc]]

## Introduction

### useState Hook

Declares a state variable with a declared update state function and default value.

#### Syntax

```jsx
const ["State Name", "Update State Function Name"] = useState("Default Value");
```

## State Implementation

### Initializing State

```jsx
import { useState } from "react";
const [categoryId, setCategoryId] = useState();
```

## ReactJS Built-in State Management

### Hooks

Hooks let you use state and other React features without writing a class.

#### _useState_

Allows states to be managed within components.

##### BlogsPage Component

Adding _CategoriesList_ component to utilize _useState_.

```jsx
import React, { useState } from "react";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";

import "../../App.css";
import "./index.css";

// Importing dummy data
const data = require("../../dummy-data.json");
let blogPosts = data.blogPosts;
const categories = data.categories;

export default function BlogsPage() {
  //Initializing our states:
  const [categoryId, setCategoryId] = useState();
  const [blogs, setBlogs] = useState([]);

  const CategoriesList = () => {
    return categories.map((category, index) => {
      return categoryId === category.id.toString() ? (
        <button
          key={index}
          onClick={() => setCategoryId(category.id)}
          style={{ color: "blue" }}
        >
          <p key={index}>{category.title}</p>
        </button>
      ) : (
        <button
          key={index}
          onClick={() => setCategoryId(category.id)}
          style={{ color: "black" }}
        >
          <p key={index}>{category.title}</p>
        </button>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesList />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Blog Posts</p>
        </div>
        <BlogList blogPosts={blogPosts} />
      </div>
      <Footer />
    </>
  );
}
```

index.css

```css
.scroll-menu {
  overflow: auto;
  white-space: nowrap;
}

.scroll-menu button {
  background-color: white;
  border: none;
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  font-size: larger;
}
```
