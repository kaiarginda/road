"use client";

// ReviewPage.js
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const page = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAddReview = async () => {
    setLoading(true);
    await fetch("/api/createreview", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text, author: loggedUser }),
    });
    setLoading(false);
  };

  useEffect(() => {
    const retrievedToken = localStorage.getItem("token");

    const fetchLoggedUser = async () => {
      try {
        const res = await fetch("/api/getuserbytoken", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ token: retrievedToken }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        // console.log("Data from server:", data);
        setLoggedUser(data.user);
      } catch (error) {
        console.error("Error during fetch:", error.message);
      }
    };

    fetchLoggedUser();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (!loggedUser) return <h1>You should be logged in to write a review</h1>;
  return (
    <div className="container mx-auto p-8">
      <h1>
        {loggedUser ? `Currently logged user: ${loggedUser.username}` : null}
      </h1>
      <h1 className="text-3xl font-bold mb-6">Customer Reviews</h1>

      <div className="mb-4">
        <textarea
          className="w-full h-24 p-2 border rounded focus:outline-none focus:shadow-outline"
          placeholder="Write a review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
        onClick={handleAddReview}
      >
        Add Review
      </button>

      {/* <div className="mt-8">
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="mb-4">
                <div className="bg-gray-100 p-4 rounded">
                  <p>{review}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div> */}
      <div> {loading ? <ClipLoader color="#36d7b7" /> : null}:</div>
    </div>
  );
};

export default page;
