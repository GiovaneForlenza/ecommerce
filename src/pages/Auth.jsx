import React, { useContext, useState } from "react";
import { set, useForm } from "react-hook-form";
useForm;
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);
  const { signUp, login,  logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Used to handle form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  function formSubmitted(data) {
    setError(null); // Resets any previous error messages
    let result;

    // Calls the appropriate function (signUp or login) based on the current mode and stores the result, allowing the app to perform the correct authentication action based on user interaction
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    // Checks the result of the signUp or login function and sets an error message if the operation was not successful, allowing the user to see feedback on why their authentication attempt failed
    if (!result.success) {
      setError(result.message);
    } else {
      // If authentication is successful, navigate to the home page
      navigate("/");
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && (
            <div className="auth-success">
              <h2>Welcome, {user.email}!</h2>              
            </div>
          )}
          <h1 className="page-title">
            {/* Changes the title based on the current mode */}
            {mode === "signup" ? "Sign Up" : "Sign In"}
          </h1>
          <form
            action=""
            className="auth-form"
            // Uses handleSubmit from react-hook-form to manage form submission and validation
            onSubmit={handleSubmit(formSubmitted)}
          >
            {error && <p className="form-error">{error}</p>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                // Uses the register function to register the email input with validation rules
                {...register("email", { required: "Email is required" })}
              />
              {/* Displays the error message from the required field on register if email is invalid */}
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                // Uses the register function to register the password input with validation rules
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters",
                  },
                })}
              />
              {/* Displays the error message from the required field on register if password is invalid */}
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>

            {/* Changes the button text based on the current mode */}
            <button className="btn btn-primary btn-large" type="submit">
              {mode === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </form>

          {/* Changes the link text based on the current mode */}
          <div className="auth-switch">
            <p>
              {mode === "signup"
                ? "Already have an account? "
                : "Don't have an account? "}
              <span
                className="auth-link"
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              >
                {mode === "signup" ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
