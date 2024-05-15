# Image Storing & Consuming

[[toc]]

## Node.js File System
Node.js includes a built in module for handling files, FS (File System).

### Syntax 
Utilizing FS
```jsx
var fs = require('fs');
```

### Methods 

#### Read Files

```jsx 
fs.readFile(path, options, callback);
```

#### Create & Update Files

##### Append method appends specified content to a file.
```jsx
fs.appendFile(filepath, data, options, callback);
```

##### Open method has a flag attribute, to either specify if the file is opened for writing or an empty file is created.
```jsx
fs.open(path, flags, mode, callback);
```

##### Write method replaces the specified file and content if it exists, else a new file is created.
```jsx
fs.writeFile(path, data, options, callback);
```

#### Delete Files
##### Unlink method deletes the specified file.
```jsx
fs.unlink(path, callback);
```

#### Rename Files
##### Rename method renames the specified file.
```jsx
fs.rename(filename, new filename);
```

### Storing Image Locally
Utilizing FS *writeFile()* method.
```jsx
var fs = require('fs');
var path = require('path');

// img being the image file sent.
var bitmap = new Buffer(img, 'base64');

// Path and dirname is a much more robust approach rather than ./files/image.png
fs.writeFile(path.join(_dirname, 'files', 'image.png'), bitmap , err => {
    if (err) throw err;
    console.log("Image Stored Successfully");
})
```

## Consuming Image

### Express - Back-end
```jsx
app.get('/image', function (req, res) {
    const options = {
        root: path.join(__dirname)
    };
    
    const fileName = 'Image.png';
 
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
```

### React - Front-end

```jsx
import { useEffect, useState } from 'react';

const Home = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            // URI for api
            const response = await fetch('URI/api/image')
        }.then((response) => response.blob())
        .then((blob) => {
            const objectURL = URL.createObjectURL(blob);
            setImage(objectURL);                      
        }   
    });
}
```