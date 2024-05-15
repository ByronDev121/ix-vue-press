# Multer with Node.js

[[toc]]

## Installation

### Multer Installation
```bash
npm install multer
```

### Requirements / Import
We'll be utilizing Express and Multer
```jsx
const express = require('express');
const multer = require('multer');
```

## Initiating Storage Location

```jsx
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
```

## Route for Upload 

```jsx
const express = require('express');
const app = express();
const upload = require('./upload');

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully' });
});
```

### Simple HTML Form For Upload 

```html 
<html>
<head>
  <title>File Upload</title>
</head>
<body>
  <h1>File Upload</h1>
  <!-- "/upload" is the API route -->
  <!-- Must include the enctype attribute for multer to use -->
  <form action="/upload" method="POST" enctype="multipart/form-data">
    <input type="file" name="file" required>
    <button type="submit">Upload</button>
  </form>
</body>
</html>
```

## Other Route Methods

### Single
*.single(fieldname)* accept a single field. Single file stored in *req.file*
```jsx
app.post('/profile', upload.single('avatar'), function (req, res, next) {})
```

### Array
*.array(fieldname[, maxCount])* accepts an array of files. Array stored in *req.files*
```jsx
app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {})
```

### Fields
*.fields(fields)* accepts a mix of fields specified with *fields*. Object stored in *req.files*
```jsx
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, 
{ name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {})
```