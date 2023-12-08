"use client";
import React from "react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setDone(false);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === "err") setError(true);
      if (data.status === "done") setDone(true);
    }
    setLoading(false);
  };
  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {error ? (
          <h1 className="bg-red-500 text-white text-center rounded-md mb-4">
            Account With That Username Already Exists
          </h1>
        ) : null}
        {done ? (
          <h1 className="bg-green-500 text-white text-center rounded-md mb-4">
            Account Created Succesfully
          </h1>
        ) : null}

        <h2 className="text-2xl text-gray-800 font-bold mb-6">Register</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="p-3">
          {" "}
          {loading ? <ClipLoader color="#36d7b7" /> : null}
        </div>
        <div className="mt-4 text-sm text-gray-600 text-xl">
          <a href="/login" className="text-blue-500 hover:underline">
            Already have an account? Log-in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
