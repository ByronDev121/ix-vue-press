# Integrating States and Props

[[toc]]

## State Management With Props

### Passing State between components utilizing Props

#### Parent Component

```jsx
//Using props for state management between components
import { useState } from 'react';
import CategoryList from "../../components/CategoryList";
// Parent Component with Child Component embedded
export default function CategoriesPage() {
  const [category, setCategory] = useState({
      title: "",
      description: "",
      color: "",
  });

  return (
      <>
        <Navbar />
          <div className="container">
            <Heading />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="page-subtitle">Categories</p>
            </div>
            <CategoryList
              setCategory={setCategory}
              categories={categories}
            ></CategoryList>
          </div>
      </>
    );
}
```

#### Child Component
Child Component with passed in props argument
```jsx
import React from "react";
import PropTypes from "prop-types";

export default function CategoryList({ categories, setCategory }) {
  return (
    <div className="category-list">
      {categories.map((category, index) => {
        return (
            <div
              className="card-body"
              style={{
                backgroundColor: category.color + "33",
              }}
            >
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#editCategoryModal"
              onClick={() => {
                setCategory(category);
              }}
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
            <h5 className="card-title">{category.title}</h5>
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

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
};
```

### OnChange

```jsx
import React, { useState } from "react";

export default function LoginPage() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }));
    };

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
                    </form>
                </main>
            </div>
        </>
    );
}
```
