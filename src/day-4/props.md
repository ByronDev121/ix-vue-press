# Understanding Props

[[toc]]

## Props
React props are similar to attributes with HTML.

### Syntax Singular
```jsx
export default function ParentComponent(prop) {
  return (
    <p>{prop}</p>
  )
}
```

### Syntax Multiple
```jsx
export default function ParentComponent({propA, propB, propC}) {
  return (
    <p>{propA}</p>
    <p>{propB}</p>
    <p>{propC}</p>
  )
}
```
## PropTypes
Form of validation for props.
### Installing PropTypes
npm installation:
```bash
npm install prop-types --save
```
Imports to use PropTypes:
```jsx 
import PropTypes from 'prop-types';
```

### PropTypes Syntax

```jsx
BlogItem.propTypes = {
  index: PropTypes.number.isRequired,
  blogPost: PropTypes.object.isRequired,
  imageOrientation: PropTypes.string,
};
```

## Passing Props From Parent to Child
Props can be passed down from a parent component to child component.
### Example
#### BlogsPage Component
```jsx
import React from 'react';

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";

import "../../App.css";
import "./index.css";

//Importing Dummy Data
const data = require("../../dummy-data.json");
let blogPosts = data.blogPosts;

export default function BlogsPage() {
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
  );
}
```

#### BlogList Component
```jsx
import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import BlogItem from "../BlogItem";

export default function BlogList({ blogPosts }) {
  return (
    <div className="blog-list">
      {blogPosts.map((blogPost, index) => {
        return (
          <div
            key={index}
            style={{
              width: "100%",
            }}
          >
            <BlogItem
              index={index}
              blogPost={blogPost}
              imageOrientation={"top"}
            />
          </div>
        );
      })}
    </div>
  );
}

BlogList.propTypes = {
  blogPosts: PropTypes.array.isRequired,
};
```

#### BlogItem Component
```jsx 
import React from "react";
import PropTypes from "prop-types";

import BlogItemText from "../BlogItemText";

import "../../App.css";
import "./index.css";


export default function BlogItem({
  index,
  blogPost,
  imageOrientation,
}) {
if (imageOrientation === "top") {
    return (
      <div key={index} className="card-1">
        <img src={blogPost.image} className="card-img-top" alt="..." />
        <div className="card-text-bottom">
          <BlogItemText
            blogPost={blogPost}
            headerFontSize="20px"
          ></BlogItemText>
        </div>
      </div>
    );
  } else {
    return (
      <div key={index} className="card-2">
        <img src={blogPost.image} className="card-img-left" alt="..." />
        <div className="card-text-right">
          <BlogItemText
            blogPost={blogPost}
            headerFontSize="20px"
          ></BlogItemText>
        </div>
      </div>
    );
  }
}

BlogItem.propTypes = {
  index: PropTypes.number.isRequired,
  blogPost: PropTypes.object.isRequired,
  imageOrientation: PropTypes.string,
};
```

### Function Example
Functions can be passed as props as well.

#### BlogsPage Component
```jsx
import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import CategoriesList from "../../components/CategoriesList";
import Footer from "../../components/Footer";

import "../../App.css";
import "./index.css";

// Week 1: Import the blogPosts and categories from the dummy-data.json file
const data = require("../../dummy-data.json");
let blogPosts = data.blogPosts;
const categories = data.categories;

export default function BlogsPage() {

  const [categoryId, setCategoryId] = useState(undefined);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Week 1: Filter the blogPosts based on the categoryId
    const blogs = blogPosts.filter((x) =>
      categoryId !== undefined
        ? x.categories.find((y) => y.id.toString() === categoryId.toString())
        : true
    );
    setBlogs(() => blogs);
  }, [categoryId]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesList 
              categories={categories} 
              categoryId={categoryId}
              setCategoryId={setCategoryId}>
          </CategoriesList>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Blog Posts</p>
        </div>
        <BlogList blogPosts={blogs} />
      </div>
      <Footer />
    </>
  );
}
```

#### CategoriesList Component
```jsx
import React from "react";
import PropTypes from "prop-types";

export default function CategoriesList({
  categories,
  categoryId,
  setCategoryId,
}) {
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
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  categoryId: PropTypes.string.isRequired,
  setCategoryId: PropTypes.func.isRequired,
};
```