# Homework

Complete your blog app.

### Blog app specification to-date

### Frontend App

_Expected Frontend App Structure_

### Pages

- Home page

  - Navigation Bar
  - Sections:
    - List all recent blog posts
      - Each blog post should display:
        - Image
        - Author
        - Title
        - Description
        - Categories
      - onClick on blog should open the "Blog Read Page" for the blog selected.
    - List all categories
      - Each category should display:
        - Title
        - Description
        - Colour
      - onClick on category should open the "Blogs Page" blog posts filtered by the category selected.
        -Footer

- Categories page

  - Navigation Bar
  - Displays all categories
  - Each category should display:
    - Title
    - Description
    - Colour
    - Button ':wastebasket:' should open the "Delete Category Modal".
    - Button ':pen:' should open the "Edit Category Modal".
  - onClick on category should open the "Blogs Page" blog posts filtered by the category selected.
  - Button "Add Category" for users to open "Add Category Modal" to create a category.

- Blogs Page

  - Displays all categories for filtering
    - Display only title of category
    - onClick on category should filter the "Blogs Page" blog posts by category selected.
  - Display all blog posts
    - Each blog post should display:
      - Image
      - Author
      - Date
      - Title
      - Description
      - Categories
      - Button ':wastebasket:' for author should open the "Delete Blog Modal".
      - Button ':pen:' for author should open the "Edit Blog Modal".
    - onClick on blog should open the "Blog Read Page" for the blog selected.
  - Button "Add Blog Post" for users to open "Add Blog Modal" to a blog post.

- Blog Read Page

  - Display following details:
    - Image
    - Title
    - Date
    - By Author
      - Name and Surname
    - Description
    - Loop through and display each section with details:
      - Title
      - Text
  - Display author card with details:
    - "About the author"
    - Profile Image
    - Bio
  - onClick of Author should open the “Author Profile Page” for author selected.

- Author Profile Page

  - Display following details:
    - Name
    - Surname
    - Profile Image
    - Short Bio
    - "Author Blog Posts" Section:
      - Display all blog posts by author
        - Button ':wastebasket:' for author should open the "Delete Blog Modal".
        - Button ':pen:' for author should open the "Edit Blog Modal".

### Expected Frontend Pages

#### Home Page

![Home Page](/ix-vue-press/page-landing.png)

#### Blogs Page

![All Blogs Page](/ix-vue-press/page-blogs.png)

#### Blog Reading Page

![Blog Reading Page](/ix-vue-press/page-blog.png)

#### Categories Page

![Categories Page](/ix-vue-press/page-categories.png)

#### Author Profile Page

![Author Profile Page](/ix-vue-press/page-profile.png)

### Modals

- Create Blog Modal

  - Display input for the following:
    - Image
    - Categories
      - On selection category should display
    - Title
    - Description
    - Content:
      - Button "+" to create new sections allowing the inputs:
        - Section Header
        - Section Text
        - Button ":wastebasket:" to delete section created above.
  - Button "Close"
  - Button "Save changes"

- Edit Blog Modal

  - Display input with populated information for the following:
    - Image
    - Categories
      - On selection category should display.
    - Title
    - Description
    - Content:
      - Button "+" to create new sections allowing the inputs:
        - Section Header
        - Section Text
        - Button ":wastebasket:" to delete section created above.
  - Button "Close"
  - Button "Save changes"

- Delete Blog Modal

  - Display the following:
    - "Are you sure"
    - Blog Image
    - Blog Title
  - Button "Close"
  - Button "Delete"

- Create Category Modal

  - Display input for the following:
    - Title
    - Description
    - Color Hexadecimal
  - Button "Close"
  - Button "Save changes"

- Edit Category Modal

  - Display input with populated information for the following:
    - Title
    - Description
    - Color Hexadecimal
  - Button "Close"
  - Button "Save changes"

- Delete Category Modal
  - Display the following:
    - "Are you sure"
    - Category Colour
    - Category Title
  - Button "Close"
  - Button "Delete"

### Expected Frontend Modals

#### Add Blog

![Add Blog Modal](/ix-vue-press/modal-blog-add.png)

#### Edit Blog

![Edit Blog Modal](/ix-vue-press/modal-blog-edit.png)

#### Delete Blog

![Delete Blog Modal](/ix-vue-press/modal-blog-delete.png)

#### Add Category

![Add Category Modal](/ix-vue-press/modal-category-add.png)

#### Edit Category

![Edit Category Modal](/ix-vue-press/modal-category-edit.png)

#### Delete Category

![Delete Category Modal](/ix-vue-press/modal-category-delete.png)

## Backend App

_Expected Backend Structure_

### Backend Actions and Routes

- Categories:

  - CRUD
    - Create Category
      - _createCategory_
    - Edit Category
      - _updateCategory_
    - Delete Category
      - _deleteCategory_
    - Fetch Category
      - Fetch All
        - _getCategories_
      - Fetch By ID
        - _getCategory_

- Blog Posts:
  - CRUD
    - Create Blog
      - _createBlog_
    - Edit Blog
      - _updateBlog_
    - Delete Blog
      - _deleteBlog_
    - Fetch Blog
      - Fetch All
        - _getBlogs_
      - Fetch By Blog ID
        - _getBlog_
      - Fetch By Author ID
        - _getBlogsByAuthorId_
      - Fetch By Category ID
        - _getBlogsByCategoriesId_

### Category Definition

```
Category: {
   id: string / ObjectId;
   title: string;
   description: string;
   color: string;
   createdAt: Date;
   updatedAt: Date;
}
```

### Blog Definition

```
Blog: {
   id: string / ObjectId;
   authorId: string / ObjectId;
   categoryIds: array / ObjectId;
   title: string;
   description: string;
   image: string;
   content: array;
   createdAt: Date;
   updatedAt: Date;
}
```

### Author Definition

```
Author: {
   id: string / ObjectId;
   firstName: string;
   lastName: string;
   email: string;
   bio: string;
   image: string;
   password: string;
}
```
