import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

// Holds all the authentication related state and functions, and provides them to the rest of the app through context
export default function AuthProvider({ children }) {
  // Checks localStorage for a logged-in user and initializes the user state accordingly, allowing the app to persist login state across page refreshes
  const [user, setUser] = useState(
    localStorage.getItem("currentUser")
      ? { email: JSON.parse(localStorage.getItem("currentUser")) }
      : null,
  );

  function signUp(email, password) {
    // Retrieves the list of users from localStorage, or initializes it as an empty array if it doesn't exist
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    // Checks if a user with the same email already exists in the users array. If it does, it returns an error message indicating that the user already exists
    if (users.find((user) => user.email === email)) {
      return { success: false, message: "User already exists" };
    }

    // Creates a new user object with the provided email and password, adds it to the users array, and updates localStorage with the new list of users and the current user. It also updates the user state to reflect the newly logged-in user
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(email));

    // Updates the user state with the new user's email, allowing the app to reflect the logged-in state and display user-specific information
    setUser({ email });

    return { success: true, message: "User created successfully" };
  }

  function login(email, password) {
    // Retrieves the list of users from localStorage
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    // Finds the user with the provided email and password
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    // Updates the user state with the logged-in user's email
    setUser({ email });

    // Stores the current user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(email));

    return { success: true, message: "Login successful" };
  }

  function logout() {
    // Clears the current user from localStorage and updates the user state to null, effectively logging the user out and allowing the app to reflect the logged-out state
    localStorage.removeItem("currentUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
