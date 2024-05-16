# Capstone Project

[[toc]]

## Blog App Capstone Project

Project specifications

## Frontend App
*Expected Frontend App Structure*

### Pages
- Landing page
  - Navigation Bar
  - Sections:
    - List all recent blog posts
      - Each blog post should display:
        - Image
        - Author
        - Title
        - Description
        - Categories
        - Button ':wastebasket:' for author should open the "Delete Blog Modal".
        - Button ':pen:' for author should open the "Edit Blog Modal".
      - onClick on blog should open the "Blog Read Page" for the blog selected.
    - List all categories
      - Each category should display: 
        - Title
        - Description
        - Colour
        - Button ':wastebasket:' should open the "Delete Category Modal".
        - Button ':pen:' should open the "Edit Category Modal".
      - onClick on category should open the "Blogs Page" blog posts filtered by the category selected.

- Categories page
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
  - Button ':pen:' for author should open the "Edit Profile Modal" to update profile.
  

- Login Page
  - Display Title:
    - "Please login"
  - Display input for the following: 
    - Email Address
    - Password
  - Button "Sign in" on success should open the "Landing Page".
  - onClick "Register" should open the "Registration Page".
- Registration Page
  - Display Title: 
    - "Author registration"
  - Display input for the following: 
    - First name
    - Last name
    - Bio
    - Email Address
    - Password
  - Button "Register" on success should open the "Landing Page".
  - onClick "Login" should open the "Login Page".


### Expected Frontend Pages
#### Landing Page
![Landing Page](/page-landing.png)
#### Blogs Page
![All Blogs Page](/page-blogs.png)
#### Blog Reading Page
![Blog Reading Page](/page-blog.png)
#### Categories Page
![Categories Page](/page-categories.png)
#### Author Profile Page
![Author Profile Page](/page-profile.png)
#### Login Page
![Login Page](/page-login.png)
#### Registration Page
![Registration Page](/page-register.png)

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

- Edit Profile Modal
  - Display input with populated information for the following:
    - Image
    - First Name
    - Last Name
    - Bio
    - Email
  - Button "Close"
  - Button "Save changes

### Expected Frontend Modals
#### Add Blog
![Add Blog Modal](/modal-blog-add.png)
#### Edit Blog
![Edit Blog Modal](/modal-blog-edit.png)
#### Delete Blog
![Delete Blog Modal](/modal-blog-delete.png)

#### Add Category
![Add Category Modal](/modal-category-add.png)
#### Edit Category
![Edit Category Modal](/modal-category-edit.png)
#### Delete Category
![Delete Category Modal](/modal-category-delete.png)

#### Edit Profile
![Edit Profile Modal](/modal-profile-edit.png)

## Backend App
*Expected Backend Structure*
### Backend Actions and Routes
- Authentication:
  - CRUD
    - Login User
      - *login*
    - Register New User
      - *register*  
    - Update User
      - *updateUser*
    - Fetch User By ID
      - *getUser*

- Categories:
  - CRUD
    - Create Category
      - *createCategory*
    - Edit Category
      - *updateCategory*
    - Delete Category
      - *deleteCategory*
    - Fetch Category
      - Fetch All 
        - *getCategories*
      - Fetch By ID
        - *getCategory*

- Blog Posts:
  - CRUD
    - Create Blog
      - *createBlog*
    - Edit Blog
      - *updateBlog*
    - Delete Blog
      - *deleteBlog*
    - Fetch Blog
      - Fetch All
        - *getBlogs*
      - Fetch By Blog ID
        - *getBlog*
      - Fetch By Author ID
        - *getBlogsByAuthorId*
      - Fetch By Category ID
        - *getBlogsByCategoriesId*

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