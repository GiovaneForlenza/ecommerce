# Ecommerce React App

This is a full-featured ecommerce application built with React, featuring user authentication, product browsing, shopping cart functionality, and checkout process. The app allows users to sign up, log in, browse products, add items to their cart, and complete purchases.

## Features and Technologies Used

### React Core

- **React**: The core library used throughout the application for building the user interface components.
- **React DOM**: Used in `main.jsx` to render the React application into the DOM by creating a root and rendering the App component.

### Routing (React Router DOM)

- **BrowserRouter**: Used in `main.jsx` to wrap the entire application, enabling client-side routing and history management.
- **Routes and Route**: Used in `App.jsx` to define the application's routing structure, mapping URLs to specific page components (Home, Auth, Checkout, ProductDetails, OrderSummary).
- **Link**: Used in `Navbar.jsx`, `ProductCard.jsx`, and `Checkout.jsx` to create navigation links that update the URL without full page reloads, providing seamless navigation between pages.
- **useNavigate**: Used in `Auth.jsx` and `ProductDetails.jsx` to programmatically navigate users to different routes after actions like successful login or when a product is not found.
- **useParams**: Used in `ProductDetails.jsx` to extract the product ID from the URL parameters, allowing dynamic rendering of product details based on the route.

### Form Handling (React Hook Form)

- **useForm**: Used in `Auth.jsx` to manage form state, validation, and submission for user authentication forms (login/signup).
- **register**: Used in `Auth.jsx` to register form inputs with validation rules, such as required fields and length constraints for email and password.
- **handleSubmit**: Used in `Auth.jsx` to handle form submission, validating inputs and calling the appropriate authentication function.
- **formState.errors**: Used in `Auth.jsx` to display validation error messages to users when form inputs don't meet the specified criteria.

### State Management (React Context)

- **createContext**: Used in `AuthContext.jsx` and `CartContext.jsx` to create context objects that hold shared state and functions for authentication and cart management.
- **useContext**: Used in `Home.jsx` (directly importing AuthContext) and throughout the app via custom hooks (`useAuth` from AuthContext, `useCart` from CartContext) to access context values without prop drilling.
- **AuthProvider**: Used in `App.jsx` to wrap the application, providing authentication state and functions (signUp, login, logout) to all child components.
- **CartProvider**: Used in `App.jsx` to wrap the application, providing cart state and functions (addToCart, updateQuantity, removeItemFromCart, etc.) to all child components.

### React Hooks

- **useState**: Used extensively across components (`Auth.jsx`, `AuthContext.jsx`, `CartContext.jsx`, `ProductDetails.jsx`) to manage local component state like form modes, error messages, user data, and cart items.
- **useEffect**: Used in `CartContext.jsx` and `ProductDetails.jsx` to perform side effects like initializing cart data from localStorage and fetching product details when the component mounts or when dependencies change.

### Data Persistence

- **localStorage**: Used in `AuthContext.jsx` and `CartContext.jsx` to persist user authentication state and cart items across browser sessions, allowing users to stay logged in and maintain their cart contents.

### JavaScript Features

- **Optional Chaining (?.)**: Used in `ProductDetails.jsx` to safely access nested properties of the product object, preventing errors if the product data hasn't loaded yet.
- **Array Methods (map, find, filter)**: Used throughout the app (e.g., in `Home.jsx` for rendering product cards, in `CartContext.jsx` for cart operations) to manipulate and transform data arrays.

### Build Tools

- **Vite**: Used as the build tool and development server, configured in `vite.config.js` for fast development and optimized production builds.
- **ESLint**: Configured in `eslint.config.js` to enforce code quality and consistency across the project.
