# Document Object Model

## Register Example

register/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOM Example</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <div class="d-flex vh-100 vw-100 justify-content-center align-items-center">
      <div class="col-10 col-sm-4">
        <h2>Register</h2>
        <form id="registerForm" onsubmit="onSubmit()">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="firstName"
              placeholder="Joe"
              required
            />
            <label for="firstName">First name</label>
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="lastName"
              placeholder="Soap"
              required
            />
            <label for="lastName">Last name</label>
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="form-floating">
            <textarea
              type="text"
              class="form-control"
              id="bio"
              placeholder="Tell us about yourself."
              required
            ></textarea>
            <label for="bio">Bio</label>
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@mail.com"
              required
            />
            <label for="eamil">Email</label>
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
            <label for="floatingPassword">Password</label>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </form>
        <div class="my-2">
          <a href="../login/index.html"> Login </a>
        </div>
        <div>
          <button onclick="onSubmit()" class="btn btn-primary w-100">
            Register
          </button>
        </div>
        <div class="my-5 w-100 text-center">&copy Blog App 2024</div>
      </div>
    </div>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    <script src="index.js"></script>
  </body>
</html>
```

register/index.css

```css
body {
  background-color: rgb(245, 245, 245);
}
```

register/index.js

```js
const onSubmit = () => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm.checkValidity()) {
    // Only if the form is valid to we do stuff
    // Do stuff - e.g. create the user in the backend
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const bio = document.getElementById("bio").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(firstName, lastName, bio, email, password);
  } else {
    console.log("Form not valid!");
  }
  registerForm.classList.add("was-validated");
};
```

## Login Example

login/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOM Example</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <div class="d-flex vh-100 vw-100 justify-content-center align-items-center">
      <div class="col-10 col-sm-4">
        <h2>Login</h2>
        <form id="loginFrom">
          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@mail.com"
            />
            <label for="eamil">Email</label>
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </form>
        <div class="my-2">
          <a href="../register/"> Register </a>
        </div>
        <div>
          <button onclick="onSubmit()" class="btn btn-primary w-100">
            Login
          </button>
        </div>
        <div class="my-5 w-100 text-center">&copy Blog App 2024</div>
      </div>
    </div>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    <script src="index.js"></script>
  </body>
</html>
```

login/index.css

```css
body {
  background-color: rgb(245, 245, 245);
}
```

login/index.js

```js
const loginFrom = document.getElementById("loginFrom");
if (loginFrom.checkValidity()) {
  // Only if the form is valid to we do stuff
  // Do stuff - e.g. create the user in the backend
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);
} else {
  console.log("Form not valid!");
}
loginFrom.classList.add("was-validated");
```
