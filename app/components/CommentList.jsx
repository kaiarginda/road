"use client";

import React from "react";
import IndividualComment from "../components/IndividualComment";
import { useState, useEffect } from "react";

// import { cookies } from "next/headers";
// import { verify } from "jsonwebtoken";
// import { connectMongoDB } from "../mongodb";

const CommentList = ({ productId }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [comments, setComments] = useState(null);
  const [allComments, setAllComments] = useState(null);
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

    const fetchComments = async () => {
      const res = await fetch("/api/getcomments");
      if (res.ok) {
        const data = await res.json();
        setAllComments(data.allComments);
        setComments(data.comments);
      }
    };

    fetchLoggedUser();
    fetchComments();
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  return (
    <div className="bg-slate-900">
      {comments?.map((comment) => {
        if (+comment.productId !== +productId) {
          return null; // Return null to skip rendering
        }
        return (
          <IndividualComment
            key={comment._id} // Provide a unique key
            comment={comment}
            parentId={comment._id}
            productId={productId}
            allComments={allComments}
            loggedUser={loggedUser} // Pass user to loggedUser
          />
        );
      })}
    </div>
  );
};

export default CommentList;
