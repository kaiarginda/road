"use client";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
const IndividualComment = ({
  comment,
  parentId,
  productId,
  allComments,
  loggedUser,
}) => {
  console.log(comment?.author || null, "from auth");
  const [name, setName] = useState(null);
  useEffect(() => {
    const getAuthorById = async () => {
      const result = await fetch("/api/getauthor", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: comment?.author || null }),
      });
      if (result.ok) {
        const puw = await result.json();
        setName(puw.owner);
      }
    };
    getAuthorById();
  }, []);

  const router = useRouter();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };
  // const getAuthorById = async () => {
  //   const result = await fetch("/api/getauthor", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ author: comment.author }),
  //   });
  // };
  // getAuthorById();
  const handleReplyTextChange = (event) => {
    setReplyText(event.target.value);
  };

  const submitReply = async (com) => {
    if (loggedUser) {
      await fetch("/api/reply", {
        method: "POST",
        body: JSON.stringify({
          reply: replyText,
          parentId,
          productId,
          root: "no",
          author: loggedUser._id,
        }),
      });
    }

    setReplyText("");
    setShowReplyForm(false);
    // router.refresh();
    window.location.reload();
  };

  return (
    // <div
    //   key={comment._id}
    //   className="border rounded-lg p-4 my-4 shadow-md transition duration-300 ease-in-out transform "
    // >
    //   {name || comment.author}
    //   <h1 className="text-lg font-bold mb-2 text-blue-800">{comment.text}</h1>
    //   <button
    //     className="text-blue-500 hover:underline transition duration-300 ease-in-out transform "
    //     onClick={toggleReplyForm}
    //   >
    //     Reply
    //   </button>
    //   {showReplyForm && (
    //     <div className="mt-4">
    //       <textarea
    //         value={replyText}
    //         onChange={handleReplyTextChange}
    //         className="w-full p-2 border rounded-md text-black"
    //         placeholder="Your reply..."
    //       />
    //       <button
    //         onClick={() => {
    //           submitReply(comment);
    //         }}
    //         className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition duration-300 ease-in-out transform "
    //       >
    //         Submit Reply
    //       </button>
    //     </div>
    //   )}

    //   {allComments.map((com) => {
    //     if (com.parentId === comment._id) {
    //       return (
    //         <IndividualComment
    //           key={com._id}
    //           allComments={allComments}
    //           parentId={com._id}
    //           productId={productId}
    //           comment={com}
    //           loggedUser={loggedUser}
    //         />
    //       );
    //     }
    //   })}
    // </div>
    <div
      key={comment._id}
      className="border rounded-lg p-4 my-4 shadow-md transition duration-300 ease-in-out transform hover:shadow-lg"
    >
      <div className="text-lg font-bold mb-2 text-blue-700">
        {<a href={`/users/${name}`}>{name}</a> || comment.author}
      </div>
      <div className="mb-2 text-gray-700">{comment.text}</div>
      <button
        className="text-blue-500 hover:underline transition duration-300 ease-in-out transform focus:outline-none"
        onClick={toggleReplyForm}
      >
        Reply
      </button>
      {showReplyForm && (
        <div className="mt-4">
          <textarea
            value={replyText}
            onChange={handleReplyTextChange}
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:border-blue-500"
            placeholder="Your reply..."
          />
          <button
            onClick={submitReply}
            className="bg-blue-300 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-400 transition duration-300 ease-in-out transform focus:outline-none"
          >
            Submit Reply
          </button>
        </div>
      )}

      {allComments.map((com) => {
        if (com.parentId === comment._id) {
          return (
            <IndividualComment
              key={com._id}
              allComments={allComments}
              parentId={com._id}
              productId={productId}
              comment={com}
              loggedUser={loggedUser}
            />
          );
        }
      })}
    </div>
  );
};

export default IndividualComment;
