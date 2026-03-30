import React, { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({});

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
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mx-2 gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg bg-white"
          id="username"
          onChange={handdleChange}
        />
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
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>
    </div>
  );
}
