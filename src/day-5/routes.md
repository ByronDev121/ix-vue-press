# Routes

[[toc]]

## Installation

### npm Instructions

```bash
npm install react-router-dom
```

### Importing/Utilizing React Router

From your _page.js_:

```jsx
import { "Function Name" } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import { Link, useNavigate, useParams } from "react-router-dom";
```

## Utilizing

### Defining Routes

App is our root component, we define the route paths.

```jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
```

### Link Feature

To be able to navigate inside a page we use the React Router Link component.

```jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container mt-5">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/blogs">Blogs</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
```

## Routers

Stateful, top-level component that makes all the other components and hooks work

### createBrowserRouter

Recommended router for web application.

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

## Hooks

### useNavigate

Trigger a navigation event from within a component

```jsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

export default function BlogItem({}) {
  const navigateToBlog = () => {
    navigate("/blog/" + blogPost.id);
  };
}
```

### useParams

Access the URL parameters of a Route.

```jsx
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { userId } = useParams();
  //Utilizing useParams to fetch data based on the request.
  const author = await authService.getAuthor(userId);
}
```
