# Capstone Project

[[toc]]

## Blog App Capstone Project

Project specifications

## Frontend App

4 pages:

- Landing page
  - Welcome and about section.
  - List all categories of blogs posts.
  - Each category should display the image, the title and description as well as the number of posts in that category.
  - onClick on a category should open the “Category page”.
- Category page
  - Display following details:
    - Image
    - Title
    - Description
    - List all posts in category.
  - Each post should display the image, the title and description.
  - onClick on a post should open the “Read blog page”.
- Read blog page
  - Display following details
    - Image
    - Title
    - Read Time
    - Description
    - Author
    - Date Created
    - Date Updated
  - Display following author details:
    - Name
    - Surname
    - Profile Image
  - onClick of Author should open the “Author profile page”
  - Loop through and display each section
    - Image
    - Title
    - Text
  - Show scroll progress
- Author profile page
  - Display following details
    - Name
    - Surname
    - Profile Image
    - Short Bio

## Admin panel

baseURL + ‘/admin/’ - should open the admin panel. All admin routes should be authenticated.

4 pages:

- Login page
- Landing page
  - CTO - Create a blog categories
  - CTO - Create a blog posts
  - Lists all blog posts
  - Each blog post should display
    - Image
    - Title
    - Date Created
    - Date Updated
  - On click blog post open edit blog post
- Create blog page
  - Create blog page should display input for the following
    - Image
    - Category - Drop down loaded from categories
    - Title
    - Description
    - Loop through sections including display input for:
      - Image
      - Title
      - Text
    - Below the last section is a CTA button to add another section below the last.
    - Save CTA button
- Edit blog page
  - Same view a create blog page with detail of the selected blog populated.
  - CTA save blog post button
  - CTA delete blog post button
    - “Are you sure” modal.

## Backend

App routes:

- Get list of blogs posts
- Get blog post by ID
- Get author
  Admin Panel routes:
- Auth:
  - Login
  - User Update route
- Categories:
  - CRUD
- Blogs posts:
  - CRUD

## Category Definition

```
Category: {
   id: string;
   title: string;
   description: string;
   image: string;
   postsCount: number;
}
```

## Blog Definition

```
Blog: {
   id: string;
   authorId: string;
   category: string;
   readTime: int;
   title: string;
   description: string;
   image: string;
   content: Section[]
   dateCreate: Date
   dateUpdated: Date
}
```

```
Section: {
   title: string;
   text: string;
}
```

## Author Definition

```
Author: {
   id: string;
   name: string;
   surname: string;
   bio: string;
   image: string;
}
```
