# Multi-Part Upload

[[toc]]

## FormData

### Syntax

```jsx
const formData = new FormData();
```

#### FormData Methods
```jsx
// Append a key-value pair to the object
append()
// Delete a key-value pair 
delete()
// Returns an iterator object, used to list key value pairs
entries()
// Return the value of a key
get()
// Return all values of a key
getAll()
// Check if key exists 
has()
// Returns an iterator object, used to list available keys
keys()
// Add value to a key, replaces the value if key already exits
set() 
// Returns an iterator object for the values of the FormData object
value()
```

## Example
### HTML Form
```html
<body>
  <div class="container">
    <h1>File Upload</h1>
    <!-- Enctype attribute specifies he method of encoding the form data-->
    <form id="form" enctype="multipart/form-data">
      <div class="input-group">
        <label for="files">Select files</label>
        <input id="file" type="file" multiple />
      </div>
      <button class="submit-btn" type="submit">Upload</button>
    </form>
  </div>
  <script src="index.js"></script>
</body>
```
### Fetch Method 
```jsx
const form = document.getElementById("form");
const inputFile = document.getElementById("file");

const formData = new FormData();

// Event listener for the submit button on HTML form
const handleSubmit = (event) => {
    event.preventDefault();

    for (const file of inputFile.files) {
        // Append method to add the file formData
        formData.append("files", file);
    }
    // API Route for the file upload
    fetch("API_ENDPOINT", {
        // HTTP Request
        method: "POST",
        body: formData,
    }).catch((error) => ("Something went wrong!", error));
};

form.addEventListener("submit", handleSubmit);
```

