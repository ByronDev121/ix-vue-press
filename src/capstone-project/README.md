# Capstone Project

[[toc]]

## Blog App Capstone Project:

Objet properties based on the project brief 
- id
- title,
- description,
- author,
- date.Created and
- img URL
- The blog post object must also defines a property which is an array of objects that defines each section.
- Each section is defined by the Section Header, Section Text
```js
// Blog Post object data structure:
const blogPosts = [
  {
    id: 1,
    title: "blog 1",
    description: "New Blog post",
    author: " Byron",
    dateCreated: new Date(),
    imgURL:
      "https://firebasestorage.googleapis.com/v0/b/todo-app-a2a71.appspot.com/o/javascript.png?alt=media&token=70cb3000-1233-471e-8b67-6a0fa1a66505",
    content: [
      {
        sectionHeader: "Intro",
        sectionText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        sectionHeader: "Body",
        sectionText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        sectionHeader: "Conclusion",
        sectionText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
    ],
  },
  {
    id: 2,
    title: "blog 2",
    description: "New Blog post",
    author: " Byron",
    dateCreated: new Date(),
    imgURL:
     "https://firebasestorage.googleapis.com/v0/b/todo-app-a2a71.appspot.com/o/javascript.png?alt=media&token=70cb3000-1233-471e-8b67-6a0fa1a66505",
    content: [
      {
        sectionHeader: "Intro",
        sectionText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        sectionHeader: "Body",
        sectionText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        sectionHeader: "Conclusion",
        sectionText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
    ],
  },
  {
    id: 3,
    title: "blog 3",
    description: "New Blog post",
    author: " Byron",
    dateCreated: new Date(),
    imgURL:
      "https://firebasestorage.googleapis.com/v0/b/todo-app-a2a71.appspot.com/o/javascript.png?alt=media&token=70cb3000-1233-471e-8b67-6a0fa1a66505",
    content: [
      {
        sectionHeader: "Intro",
        sectionText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        sectionHeader: "Body",
        sectionText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        sectionHeader: "Conclusion",
        sectionText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
    ],
  },
];

```