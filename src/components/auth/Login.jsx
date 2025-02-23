import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      // Send login request to the server
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        // Handle validation or authentication errors
        if (data.errors) {
          setError(data.errors.map((err) => err.msg).join(", "));
        } else {
          setError(data.error || "Login failed. Please try again.");
        }
        return;
      }
      login(data.user);
      props.onClose()
      alert("Login successful!");
    } catch (err) {
      // Handle different types of errors
      if (err.name === "TypeError" && err.msg === "Failed to fetch") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err.msg || "An error occurred during login.");
      }
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };


  return (
    <>
    <div className="overlay">
    <div className="form-description">
      </div>
      <div className="signup-container bg-gray-100 dark:bg-gray-900">
        <div className="form-header">
            <p>
            Please Login to access your personalized dashboard and chat history             
            </p>
            <button 
             className="close-button" 
             onClick={props.onClose}
             aria-label="Close login form"
            >
             &times;
            </button>
        </div>
      <form onSubmit={handleSubmit}>
      {error &&<p className="alert alert-danger">{error}</p>}
          <div className="form-group">
             <label htmlFor="email">
               email
             </label>
             <input
               type="text"
               id="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               required
              />
          </div>
          <div className="form-group">
            <label htmlFor="current-password">
              Password
            </label>
            <input
              type="password"
              id="current-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
          className="formBtn"
            type="submit"
            disabled={loading}
          >
        {loading ? (
          <>
            <span aria-hidden="true">⏳</span>
            Logging in...
          </>
        ) : (
          "Login"
        )}          
        </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;