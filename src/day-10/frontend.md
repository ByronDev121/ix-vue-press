# Completing the Blog App - Frontend

[[toc]]

<!-- ## FrontEnd -->

## Services

### Blog service

Final the blog service.

`frontend/src/services/blogService.js`

```js
const createBlog = async (blog) => {
  const response = await fetch("http://localhost:8000/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

const fetchBlogs = async () => {
  const response = await fetch("http://localhost:8000/api/blogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

const fetchBlogByID = async (id) => {
  const response = await fetch("http://localhost:8000/api/blogs/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

const fetchBlogsByCategoryId = async (categoryId) => {
  const response = await fetch(
    "http://localhost:8000/api/blogs/categories/" + categoryId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

  const blogsApiData = await response.json();
  return blogsApiData;
};

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

const updateBlog = async (blog) => {
  const response = await fetch("http://localhost:8000/api/blogs/" + blog.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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

const deleteBlog = async (id) => {
  const response = await fetch("http://localhost:8000/api/blogs/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
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

const blogService = {
  createBlog,
  fetchBlogs,
  fetchBlogByID,
  fetchBlogsByCategoryId,
  fetchBlogsByAuthorId,
  updateBlog,
  deleteBlog,
};

export default blogService;
```

### Category service

Define the category service.

`frontend/src/services/categoryService.js`

```js
const createCategory = async (category) => {
  const response = await fetch("http://localhost:8000/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

const fetchCategories = async () => {
  const response = await fetch("http://localhost:8000/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

const updateCategory = async (category) => {
  const response = await fetch(
    "http://localhost:8000/api/categories/" + category.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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

const deleteCategory = async (id) => {
  const response = await fetch("http://localhost:8000/api/categories/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
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

const categoryService = {
  createCategory,
  fetchCategories,
  updateCategory,
  deleteCategory,
};

export default categoryService;
```

## Components

### AddEditCategoryModal Modal

\*frontend/src/components/AddEditCategoryModal/index.jsx

```js
import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "bootstrap";

export default function AddEditCategoryModal({
  addCategory,
  editCategory,
  createCategory,
  updateCategory,
  onClose,
}) {
  const modalEl = document.getElementById("addEditCategoryModal");
  const addEditCategoryModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  const [category, setCategory] = useState({
    title: "",
    description: "",
    color: "",
  });

  useEffect(() => {
    if (addCategory) {
      setCategory(addCategory);
      addEditCategoryModal?.show();
    } else if (editCategory) {
      setCategory(editCategory);
      addEditCategoryModal?.show();
    }
  }, [addEditCategoryModal, addCategory, editCategory]);

  const resetCategory = () => {
    setCategory({
      title: "",
      description: "",
      color: "",
    });
  };

  const onSubmit = (e) => {
    e?.preventDefault();
    if (isFormValid()) {
      if (addCategory) {
        createCategory(category);
      } else if (editCategory) {
        updateCategory(category);
      }
      resetCategory();
      addEditCategoryModal?.hide();
    }
  };

  const onCloseModal = () => {
    resetCategory();
    onClose();
    addEditCategoryModal.hide();
  };

  const isFormValid = () => {
    const form = document.getElementById("categoryForm");
    form?.classList?.add("was-validated");
    return form?.checkValidity();
  };

  return (
    <div
      className="modal fade"
      id="addEditCategoryModal"
      aria-labelledby="addEditCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addEditCategoryModalLabel">
              {(addCategory && "Add Category") || "Edit Category"}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <form id="categoryForm">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={category?.title}
                  onChange={(e) => {
                    setCategory({ ...category, title: e.target.value });
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
                  value={category?.description}
                  onChange={(e) => {
                    setCategory({ ...category, description: e.target.value });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="mb-3">
                <label htmlFor="color" className="form-label">
                  Color Hexadecimal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  value={category?.color}
                  onChange={(e) => {
                    setCategory({ ...category, color: e.target.value });
                  }}
                  required
                ></input>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </form>
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

### DeleteCategoryModal Modal

\*frontend/src/components/DeleteCategoryModal/index.jsx

```js
import React, { useMemo, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import PropTypes from "prop-types";

export default function DeleteCategoryModal({
  deleteCategory,
  removeCategory,
  onClose,
}) {
  const [category, setCategory] = useState();

  const modalEl = document.getElementById("deleteCategoryModal");
  const deleteCategoryModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  useEffect(() => {
    if (deleteCategory) {
      setCategory(deleteCategory);
      deleteCategoryModal?.show();
    }
  }, [deleteCategory, deleteCategoryModal]);

  const resetCategory = () => {
    setCategory({
      title: "",
      description: "",
      color: "#000000",
    });
  };

  const onCloseModal = () => {
    resetCategory();
    onClose();
    deleteCategoryModal?.hide();
  };

  const onDelete = () => {
    removeCategory(deleteCategory);
    resetCategory();
    deleteCategoryModal?.hide();
  };

  return (
    <div
      className="modal fade"
      id="deleteCategoryModal"
      aria-labelledby="deleteCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="deleteCategoryModalLabel">
              Delete Category
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are You sure you want to delete this Category?</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h5 style={{ marginLeft: "8px" }}>{category?.title}</h5>
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

DeleteCategoryModal.prototype = {
  deleteCategory: PropTypes.object,
  removeCategory: PropTypes.func.isRequired,
};
```

## Pages

### Define Categories Page

_frontend/src/pages/Categories/index.jsx_

```jsx
import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import CategoryList from "../../components/CategoriesList";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

import categoryService from "../../services/categoryService";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import AddEditCategoryModal from "../../components/AddEditCategoryModal";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState();
  const [editCategory, setEditCategory] = useState();
  const [deleteCategory, setDeleteCategory] = useState();

  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesRes = await categoryService.fetchCategories();
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (err) {
        setIsError(true);
        setMessage(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onCategoryAdd = () => {
    setAddCategory({
      title: "",
      description: "",
      color: "#000000",
    });
  };

  const onCategoryUpdate = (category) => {
    setEditCategory(category);
  };

  const onCategoryDelete = (blog) => {
    setDeleteCategory(blog);
  };

  const createCategory = async (blog) => {
    try {
      const newCategory = await categoryService.createCategory(blog);
      setIsSuccess(true);
      setMessage(newCategory.message);
      setCategories((prev) => {
        prev.push(newCategory.data);
        return prev;
      });
    } catch (err) {
      setIsError(true);
      setMessage(err);
    }
    setAddCategory(null);
  };

  const updateCategory = async (category) => {
    try {
      const updatedCategory = await categoryService.updateCategory(category);
      setIsSuccess(true);
      setMessage(updatedCategory.message);
      setCategories((prev) => {
        const index = prev.findIndex((x) => x.id === updatedCategory.data.id);
        prev[index] = updatedCategory.data;
        return prev;
      });
    } catch (err) {
      setIsError(true);
      setMessage(err);
    }
    setEditCategory(null);
  };

  const removeCategory = async (category) => {
    try {
      const newBlog = await categoryService.deleteCategory(category.id);
      setIsSuccess(true);
      setMessage(newBlog.message);
      setCategories((prev) => prev.filter((x) => x.id !== category.id));
    } catch (err) {
      setIsError(true);
      setMessage(err);
    }
    setDeleteCategory(null);
  };

  const AddButton = () => {
    return (
      <button className="btn btn-outline-dark h-75" onClick={onCategoryAdd}>
        ADD CATEGORY
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Categories</p>
          <AddButton />
        </div>
        <CategoryList
          categories={categories}
          onEdit={onCategoryUpdate}
          onDelete={onCategoryDelete}
        ></CategoryList>
      </div>
      <Footer />
      <AddEditCategoryModal
        addCategory={addCategory}
        editCategory={editCategory}
        createCategory={createCategory}
        updateCategory={updateCategory}
        onClose={() => {
          setAddCategory(null);
          setEditCategory(null);
        }}
      />
      <DeleteCategoryModal
        deleteCategory={deleteCategory}
        removeCategory={removeCategory}
        onClose={() => setDeleteCategory(null)}
      />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={() => {
          setIsSuccess(false);
          setMessage("");
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          setIsError(false);
          setMessage("");
        }}
      />
    </>
  );
}
```
