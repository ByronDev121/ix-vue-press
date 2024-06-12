# Testing using Postman

## Test create endpoint

### Request

**Method:** POST

**Endpoint route:**

```
http://localhost:8000/api/blogs
```

**Body:**

```json
{
  "authorId": "665e4736cdb3ef11df5134f3",
  "categories": [{"title":"Programming","description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.","color":"#000000","createdAt":"2024-05-31T03:39:57.837Z","updatedAt":"2024-05-31T03:43:58.636Z","id":"6659468dc2294698fe74d8e2"}],
  "title": "Test Blog",
  "description": "This is a test blog",
  "image": [choose file],
  "content": [{"sectionHeader":"Introduction","sectionText":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}]
}
```

### Response

**Status:**
200

**Body:**

```json
{
  "message": "Blog created!",
  "data": {
    "title": "Problem Solving",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "image": "http://localhost:8000/uploads/blogs/1718231967630.webp",
    "content": [
      {
        "sectionHeader": "Introduction",
        "sectionText": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ],
    "createdAt": "2024-06-12T22:39:27.637Z",
    "updatedAt": "2024-06-12T22:39:27.637Z",
    "id": "666a239f671ff7be7677e9d6",
    "categories": [
      {
        "id": "6659468dc2294698fe74d8e2",
        "title": "Programming",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "color": "#000000"
      }
    ],
    "author": {
      "id": "665e4736cdb3ef11df5134f3",
      "firstName": "Byron",
      "lastName": "de Villiers",
      "email": "byron@mail.com",
      "image": "https://storage.googleapis.com/ix-blog-app/download.png",
      "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  }
}
```
