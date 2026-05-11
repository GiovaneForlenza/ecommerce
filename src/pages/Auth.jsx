import React, { useState } from "react";
import { useForm } from "react-hook-form";
useForm;
function Auth() {
  const [mode, setMode] = useState("login");

  // Used to handle form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  function formSubmitted() {
    alert("Form submitted");
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
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
