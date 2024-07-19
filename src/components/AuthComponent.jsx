import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const onSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:3000/auth/sign-up",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:3000/auth/sign-in",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = result.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      toast.success("SignIn success");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignOut = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("User signOut Success");
  };

  if (token) {
    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={onSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>AuthComponent</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onSignUp}>{loading ? "loading..." : "signup"}</button>
      <button onClick={onSignIn}>{loading ? "loading..." : "signin"}</button>
      <ToastContainer />
    </div>
  );
};

export default AuthComponent;
