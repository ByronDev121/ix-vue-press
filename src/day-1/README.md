# HTML & CSS 

[[toc]]


## Anatomy of an HTML page

### Structure of an HTML page

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>My Title</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./path-to-css-file">
</head>
<body>

    Body Content

    <script src="./path-to-js-file" async defer></script>
</body>
```

## HTML Elements

### Headings:
```html
    <!-- Headings -->
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
```

### Paragraphs
```html
<!-- Paragraphs -->
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <strong>Provident, mollitia facere.</strong> Doloremque
        pariatur nihil vel,
        provident necessitatibus aspernatur dicta dolorem unde enim dolor porro voluptatum sapiente nulla assumenda eum?
        Quibusdam blanditiis doloremque error minus soluta placeat ipsa quam, <em>tempora nihil adipisci corrupti
            tempore</em>
        accusamus magnam explicabo dolore obcaecati nisi asperiores numquam saepe, hic ea officiis magni reiciendis
        dignissimos? Animi, magni totam recusandae autem, iste culpa quaerat quae pariatur iure tempore obcaecati
        sapiente optio quisquam praesentium numquam voluptas, qui aliquid quia omnis id explicabo neque velit! Id cumque
        odio
        quod! Maxime totam, nostrum officia optio esse ipsa facere, facilis quod temporibus, non pariatur rerum
        necessitatibus.
        Veritatis numquam aliquid corporis. Quis consequuntur, nulla, ratione libero et similique impedit velit, sunt
        ducimus minima maiores quod voluptatibus ab error. Beatae adipisci repudiandae iste cupiditate officiis,
        perferendis
        expedita harum et sequi? Recusandae, asperiores non facilis dolore autem sapiente corrupti, porro similique,
        cumque
    </p>
```

### Anchors
```html
    <a href="https://www.google.com" target="_blank">Go to google</a>

    <a href="https://www.gituhb.com" target="_blank">Go to gituhb</a>
```


### Lists
```html
    <!-- Lists -->

    <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
        <li>List item 4</li>
        <li>List item 5</li>
    </ul>


    <ol>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
        <li>List item 4</li>
        <li>List item 5</li>
    </ol>
```

### Forms
```html
<!-- Forms -->

    <form submit="submitFunction()">

        <div>
            <label>First name</label>
            <input type="text" name="firstName">
        </div>
        <br>
        <div>
            <label>Last name</label>
            <input type="text" name="lastName">
        </div>
        <br>
        <div>
            <label>Email address</label>
            <input type="email" name="email">
        </div>
        <br>
        <div>
            <label>Age</label>
            <input type="number" name="age">
        </div>
        <br>
        <div>
            <label>DOB</label>
            <input type="date" name="dob">
        </div>
        <br>
        <div>
            <label>Gender</label>
            <select>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
        </div>
        <br>
        <div>
            <label>Message</label>
            <textarea></textarea>
        </div>
        <br>
        <div>
            <input type="submit" value="Save">
        </div>

    </form>
```

### Buttons
```html
    <!-- Buttons -->
    <button click="submitFunction()">Save</button>
```

### Images
```html
 <img alt="Test image" width="200px" height="auto"
        src="https://firebasestorage.googleapis.com/v0/b/todo-app-a2a71.appspot.com/o/javascript.png?alt=media&token=70cb3000-1233-471e-8b67-6a0fa1a66505">
```


### Semantic tags
```html
<header class="container">
        <h1>Blog Posts</h1>
    </header>


    <section class="container">
        <article>
            <h3>Blog post 1</h3>
            <small>Published by Byron de Villiers on 7 July 2022</small>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <a href="#">Read more</a>
        </article>
        <br>
        <article>
            <h3>Blog post 2</h3>
            <small>Published by Byron de Villiers on 7 July 2022</small>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <a href="#">Read more</a>
        </article>
        <article>
            <h3>Blog post 3</h3>
            <small>Published by Byron de Villiers on 7 July 2022</small>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <a href="#">Read more</a>
        </article>
    </section>


    <aside>
        <h3>Categories</h3>
        <ul>
            <li><a href="https://www.google.com">Google</a></li>
            <li><a href="https://www.github.com">Github</a></li>
        </ul>
    </aside>

    <footer class="footer">
        <p>&copy 2022 Blog posts</p>
    </footer>
```


## CSS

### Anatomy of a CSS selector

```css
/* Target class name */
.class-name {
  css-style: css-value
}

/* Target tag */
tag-name {
  css-style: css-value
}
```

### Working with Fonts

```css
body {
  background-color: rgb(245, 245, 245);

  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.6em;
}
```

### Working margin

```css
.container {
  margin: 16px;

  margin-top: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
  margin-left: 16px;

  /* Margin top/bottom (32px) and right/left (16px) */
  margin: 32px 16px;
}
```

### Working padding

```css
.container {
  padding: 16px;

  padding-top: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  padding-left: 16px;

  /* padding top/bottom (32px) and right/left (16px) */
  padding: 32px 16px;
}
```


### Working CSS colors

```css
.paragraph-1 {
  color: white;

  /* HTML 5 color */
  background-color: coral;

  /* RGB color */
  background-color: rgb(255, 127, 80);

  /* Hexadecimal color */
  background-color: #ff7f50;
}
```


### Working with borders
```css
.categories li {
  border-bottom: 1px solid rgb(0, 255, 34);
}

.products {
  border: 1px dashed rgb(0, 151, 161);
  border-radius: 5px;
}
```

### CSS Pseudo-Classes

```css
.products li {
  padding: 8px;
  background-color: rgb(0, 151, 161);
  color: white;
  border-bottom: 1px solid rgb(255, 255, 255);
}

.products li:hover {
  border-bottom: 1px solid rgb(0, 151, 161);
  background-color: rgb(245, 245, 245);
  color: black;
}
```

### CSS Flex-Box

```css
.flex-box {
  display: flex;
  flex-wrap: wrap;
}

.flex-item {
  width: 30%;
  margin: 16px auto;
}
```

### CSS Grid

```css
.grid {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  column-gap: 5%;
}

.grid-item {
  margin: 16px 0px;
}
```

## CSS Example

### Color Grid HTML

```html
    <!--Color grid-->

    <div class="color-grid">

        <div class="color-grid-item box-1">
            <div class="box-text">
                Hello box-1
            </div>
        </div>

        <div class="color-grid-item box-2">
            <div class="box-text">
                Hello box-2
            </div>
        </div>

        <div class="color-grid-item box-3">
            <div class="box-text">
                Hello box-3
            </div>
        </div>

        <div class="color-grid-item box-4">
            <div class="box-text">
                Hello box-4
            </div>
        </div>

        <div class="color-grid-item box-5 ">
            <div class="box-text">
                Hello box-5
            </div>
        </div>


    </div>
```

### Color Grid HTML
```css
.color-grid {
  display: grid;
  grid-template-columns: 34% 33% 33%;
  border: 5px rgb(80, 80, 80) solid;
}

.color-grid-item {
  height: 250px;
  display: flex;
  align-items: center;
  border: 5px rgb(80, 80, 80) solid;
}

.box-text {
  margin: auto;
}

.box-1 {
  background-color: blue;
  color: white;
}

.box-2 {
  background-color: yellow;
  color: black;
}

.box-3 {
  background-color: rgb(4, 197, 4);
  color: black;
}

.box-4 {
  background-color: red;
  color: black;
}

.box-5 {
  background-color: rgb(207, 99, 211);
  color: black;

  grid-column: 2 / span 2;
}
```
