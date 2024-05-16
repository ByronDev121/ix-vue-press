# Homework

[[toc]]

## Requirement
Creating and updating our CategoriesPage component and CategoryList subcomponent.

- CategoriesPage
    - Prop pass: *categories*
        - CategoryList
            - Prop Utilized:
                - Title: category.title
                - Description: category.description
                - Background Color: category.color


## All Components
### CategoriesPage Component

```jsx
// Third party
import React from "react";

// Components
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import CategoryList from "../../components/CategoryList";
import Footer from "../../components/Footer";

// Styles
import "../../App.css";

// Week 1: Import the blogPosts and categories from the dummy-data.json file
const data = require("../../dummy-data.json");
const categories = data.categories;

export default function CategoriesPage() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Categories</p>
        </div>
        <CategoryList categories={categories}></CategoryList>
      </div>
      <Footer />
    </>
  );
}

```

### CategoryList Subcomponent
```jsx
import React from "react";

import "./index.css";

export default function CategoryList({ categories }) {

if (!categories) return null;
  return (
    <div className="category-list">
      {categories?.map((category, index) => {
        return (
            <div
            key={index}
            className="card"
            style={{ borderRadius: "0px", border: "none" }}
          >
            <div
              className="card-body"
              style={{
                backgroundColor: category.color + "33",
                position: "relative",
                zIndex: 0,
              }}
            >
              <h5 className="card-title">{category.title}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                {category.description.substring(1, 100)} ...
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### CategoryList CSS

```css
.category-list {
  padding: 16px 0px;
  width: 100%;
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-gap: 2%;
  row-gap: 32px;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

@media (max-width: 992px) {
  .category-list {
    grid-template-columns: 49% 49%;
  }
}

@media (max-width: 768px) {
  .category-list {
    grid-template-columns: 100%;
  }
}
```