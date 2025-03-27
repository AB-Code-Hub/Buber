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

### `npm run lint`
Runs ESLint to check for code quality issues.

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
| `axios`              | ^1.8.3    | Promise-based HTTP client for the browser and Node.js. |
| `react-hot-toast`    | ^2.5.2    | React notifications library.         |
| `gsap`               | ^3.12.7   | GreenSock Animation Platform for smooth animations. |
| `@gsap/react`        | ^2.1.2    | React bindings for GSAP.             |
| `lucide-react`       | ^0.482.0  | Beautiful & consistent icons.        |
| `dotenv`             | ^16.4.7   | Environment variables management.    |

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
- **`.env`**: Environment variables configuration.

---

## 🛣️ **Routing**

The application uses `react-router-dom` for client-side routing. The routes are defined in `App.jsx`:

| Route               | Component            | Description                          |
|---------------------|----------------------|--------------------------------------|
| `/`                | `Start.jsx`          | Start page for the application.      |
| `/login`           | `Login.jsx`          | Login page for riders.               |
| `/signup`          | `Signup.jsx`         | Signup page for riders.              |
| `/captain-login`   | `CaptainLogin.jsx`   | Login page for captains.             |
| `/captain-signup`  | `CaptainSignup.jsx`  | Signup page for captains.            |
| `/home`            | `Home.jsx`           | Home page for authenticated riders.  |
| `/riding`          | `Riding.jsx`         | Active ride interface for riders.    |
| `/captain-home`    | `CaptainHome.jsx`    | Dashboard for captains.              |
| `/user/logout`     | `UserLogout.jsx`     | Logout page for riders.              |
| `/captain/logout`  | `CaptainLogout.jsx`  | Logout page for captains.            |

All protected routes are wrapped with their respective protection components:
- `UserProtactWrapper`: Protects rider-specific routes
- `CaptainProtectWrapper`: Protects captain-specific routes

---

## 🎨 **Styling**

The application uses **Tailwind CSS** for styling. The main CSS file, `index.css`, includes the following Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🔒 **Authentication & Protection**

The application implements a robust authentication system with:
- Separate authentication flows for riders and captains
- Protected routes using wrapper components
- Secure logout functionality for both user types
- Context-based state management for user sessions

---

## 🎯 **Features**

- **User Authentication**: Separate login/signup flows for riders and captains
- **Protected Routes**: Secure access to user-specific features
- **Real-time Updates**: Live ride status updates
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: GSAP integration for enhanced user experience
- **Toast Notifications**: User feedback using react-hot-toast
- **Icon System**: Consistent iconography with lucide-react

## ⚠️ **Important Notes**

### Image Copyrights
All images used in this project are for demonstration purposes only. Some images may be subject to copyright restrictions. Please ensure you have the proper rights and licenses before using any images in a production environment.

### Responsiveness Disclaimer
The current implementation of the frontend may not be fully responsive across all device sizes. While basic responsive design principles have been implemented using Tailwind CSS, there are areas that could be improved for better mobile and tablet experiences. Future updates will focus on enhancing the responsive design.

### Recent Changes
- Added GSAP animations for smoother transitions
- Implemented ride confirmation popup system
- Enhanced captain dashboard interface
- Added real-time ride status updates
- Improved user authentication flow

## 🔄 **Areas for Improvement**
- Mobile responsiveness optimization
- Tablet-specific layouts
- Touch-friendly interactions
- Performance optimization for animations
- Cross-browser compatibility testing

