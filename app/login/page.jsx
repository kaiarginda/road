"use client";
import React from "react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  let val = "";
  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     const res = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (res.ok) {
  //       console.log(res);
  //       const data = await res.json();
  //       console.log(data);
  //     }
  //   };
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(false);
    setDone(false);
    setLoading(true);
    val = username;
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.text();
      if (!res.ok) {
        setError(true);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      if (data) {
        setDone(true);
        localStorage.setItem("token", data);
        router.push(`/`);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {error ? (
          <h1 className="bg-red-500 text-white text-center rounded-md mb-4">
            Account Not Found
          </h1>
        ) : null}
        {done ? (
          <h1 className="bg-green-500 text-white text-center rounded-md mb-4">
            Logged In Succesfully
          </h1>
        ) : null}
        <h2 className="text-2xl text-gray-800 font-bold mb-6">Login</h2>
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
            Login
          </button>
        </form>
        <div className="p-3">
          {loading ? <ClipLoader color="#36d7b7" /> : null}
        </div>
        <div className="mt-4 text-sm text-gray-600 text-xl">
          <a href="/register" className="text-blue-500 hover:underline">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
