import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handdleChange = (e) => {
    setFormData({
      ...formData,
      // whatever is changing set to that value
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // in order to use the url '/api/auth/signup' from the client side
    // to the api side we need to use a proxy configured in vite.config.js
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mx-2 gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg bg-white"
          id="email"
          onChange={handdleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg bg-white"
          id="password"
          onChange={handdleChange}
        />
        <button
          className="bg-slate-700
          text-white
          p-3 rounded-lg 
          uppercase 
          hover:opacity-95 
          disabled:opacity-80
          disabled={loading} "
        >
          {loading ? "Loading...." : "Sign In"}
        </button>
      </form>
      <div className="flex justify-center gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      <div>{error && <p className="text-red-500">{error}</p>}</div>
    </div>
  );
}
