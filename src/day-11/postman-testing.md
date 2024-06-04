# Testing using Postman

## Register:

### Request

**Method:** POST

**Endpoint route:**

```
http://localhost:8000/api/auth/register
```

**Body:**

```json
{
  "firstName": "Byron",
  "lastName": "de Villiers",
  "email": "byron@mail.com",
  "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "password": "qwerty"
}
```

### Response

**Status:**
200

**Body:**

```json
{
  "message": "New user created!",
  "data": {
    "firstName": "Byron",
    "lastName": "de Villiers",
    "email": "byron@mail.com",
    "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "image": "https://storage.googleapis.com/ix-blog-app/download.png",
    "password": "$2a$10$6fRU23RjNdasZ6Z9lQJmFOEXMf3j2Yc27Lyu/dvgfV9xXzQCZt4ny",
    "_id": "665e4736cdb3ef11df5134f3",
    "createdAt": "2024-06-03T22:44:06.474Z",
    "updatedAt": "2024-06-03T22:44:06.474Z",
    "__v": 0
  }
}
```

## Login:

### Request

**Method:** POST

**Endpoint route:**

```
http://localhost:8000/api/auth/login
```

**Body:**

```json
{
  "email": "byron@mail.com",
  "password": "qwerty"
}
```

### Response

**Status:**
200

**Body:**

```json
{
  "message": "Login successful!",
  "data": {
    "_id": "665e4736cdb3ef11df5134f3",
    "firstName": "Byron",
    "lastName": "de Villiers",
    "email": "byron@mail.com",
    "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "image": "https://storage.googleapis.com/ix-blog-app/download.png",
    "createdAt": "2024-06-03T22:44:06.474Z",
    "updatedAt": "2024-06-03T22:44:06.474Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWU0NzM2Y2RiM2VmMTFkZjUxMzRmMyIsImlhdCI6MTcxNzQ1NTcwN30.-XThaMpxn9FQgGPJLq4rM-36tmrPDzYyzPeXmY91xN8"
  }
}
```

## Blogs

### Request

**Method:** POST

**Endpoint route:**

```
http://localhost:8000/api/blogs
```

**Body:**

```json
{
  "title": "My First Blog Post",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "categories": [
    {
      "id": "665945dbc2294698fe74d8d4", // Make sure these align with your categories
      "title": "Frontend Development",
      "color": "#026AA2"
    },
    {
      "id": "665945ffc2294698fe74d8d9", // Make sure these align with your categories
      "title": "Backend Development",
      "color": "#C11574"
    }
  ],
  "authorId": "665e4736cdb3ef11df5134f3", // Make sure this aligns with your user
  "content": [
    {
      "sectionHeader": "Introduction",
      "sectionText": "I'm so excited to share my first blog post with the world. I've been working on this for a while and I'm happy to finally share it with you.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      "sectionHeader": "Body",
      "sectionText": "This is the body of my blog post. I hope you enjoy reading it as much as I enjoyed writing it.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      "sectionHeader": "Conclusion",
      "sectionText": "I hope you enjoyed reading my first blog post. I'm looking forward to sharing more with you in the future.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  ]
}
```

### Response

**Status:**
200

**Body:**

```json
{
  "message": "New blog created!",
  "data": {
    "title": "My First Blog Post",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "image": "https://storage.googleapis.com/ix-blog-app/default.jpeg",
    "content": [
      {
        "sectionHeader": "Introduction",
        "sectionText": "I'm so excited to share my first blog post with the world. I've been working on this for a while and I'm happy to finally share it with you.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        "sectionHeader": "Body",
        "sectionText": "This is the body of my blog post. I hope you enjoy reading it as much as I enjoyed writing it.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        "sectionHeader": "Conclusion",
        "sectionText": "I hope you enjoyed reading my first blog post. I'm looking forward to sharing more with you in the future.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    "createdAt": "2024-06-03T23:21:22.706Z",
    "updatedAt": "2024-06-03T23:21:22.706Z",
    "id": "665e4ff286b9133e5117962b",
    "categories": [
      {
        "id": "665945dbc2294698fe74d8d4",
        "title": "Frontend Development",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "color": "#3abc12"
      },
      {
        "id": "665945ffc2294698fe74d8d9",
        "title": "Backend Development",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "color": "#98a9d1"
      }
    ]
  }
}
```
