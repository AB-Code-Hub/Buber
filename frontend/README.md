# Buber Frontend

This is the frontend for the Buber application, built using **React** and **Tailwind CSS**. It provides a seamless user experience for both riders and captains, with features like authentication, profile management, and more.

---

## 🛠️ **Available Scripts**

In the project directory, you can run the following commands:

### `npm run dev`
Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`
Builds the app for production to the `dist` folder.

### `npm run preview`
Previews the production build locally.

---

## 📦 **Dependencies**

The project relies on the following dependencies:

| Dependency            | Version   | Description                          |
|-----------------------|-----------|--------------------------------------|
| `react`              | ^19.0.0   | A JavaScript library for building user interfaces. |
| `react-dom`          | ^19.0.0   | React package for DOM rendering.     |
| `react-router-dom`   | ^7.3.0    | Routing library for React.           |
| `tailwindcss`        | ^3.4.17   | Utility-first CSS framework.         |
| `vite`               | ^6.2.0    | Fast build tool for modern web apps. |

---

## 🔧 **Development Dependencies**

The following development dependencies are used for linting, type-checking, and build optimization:

| Dependency                     | Version   | Description                          |
|--------------------------------|-----------|--------------------------------------|
| `@eslint/js`                  | ^9.21.0   | ESLint core library.                 |
| `@types/react`                | ^19.0.10  | TypeScript definitions for React.    |
| `@types/react-dom`            | ^19.0.4   | TypeScript definitions for React DOM.|
| `@vitejs/plugin-react`        | ^4.3.4    | Vite plugin for React.               |
| `autoprefixer`                | ^10.4.21  | Adds vendor prefixes to CSS.         |
| `eslint`                      | ^9.21.0   | JavaScript/JSX linter.               |
| `eslint-plugin-react-hooks`   | ^5.1.0    | ESLint rules for React hooks.        |
| `eslint-plugin-react-refresh` | ^0.4.19   | ESLint rules for React Refresh.      |
| `globals`                     | ^15.15.0  | Global variables for ESLint.         |
| `postcss`                     | ^8.5.3    | CSS post-processor.                  |

---

## ⚙️ **Configuration Files**

The project includes the following configuration files:

- **`postcss.config.js`**: Configuration for PostCSS.
- **`tailwind.config.js`**: Configuration for Tailwind CSS.
- **`vite.config.js`**: Configuration for Vite.
- **`eslint.config.js`**: Configuration for ESLint.

---

## 🛣️ **Routing**

The application uses `react-router-dom` for client-side routing. The routes are defined in `App.jsx`:

| Route               | Component        | Description                          |
|---------------------|------------------|--------------------------------------|
| `/`                | `Home.jsx`       | Home page for the application.       |
| `/login`           | `Login.jsx`      | Login page for riders.               |
| `/signup`          | `Signup.jsx`     | Signup page for riders.              |
| `/captain-login`   | `CaptainLogin.jsx` | Login page for captains.             |
| `/captain-signup`  | `CaptainSignup.jsx` | Signup page for captains.            |

---

## 🎨 **Styling**

The application uses **Tailwind CSS** for styling. The main CSS file, `index.css`, includes the following Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🌐 **BrowserRouter**

The application is wrapped in a `BrowserRouter` and `UserContext` in `main.jsx` to enable client-side routing and user context:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext>
  </StrictMode>,
);
```

---

