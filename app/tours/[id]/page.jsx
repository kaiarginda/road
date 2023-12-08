// "use client";

// import React from "react";
// import { useState, useEffect } from "react";
// import CommentList from "@/app/components/CommentList";
// import CommentInput from "@/app/components/CommentInput";
// import { checkout } from "../../ckeckout";

// // const Page = () => {
// //   const pathArray = window.location.pathname.split("/");
// //   const productId = pathArray[pathArray.length - 1];
// //   const [loggedUser, setLoggedUser] = useState(null);
// //   useEffect(() => {
// //     const retrievedToken = localStorage.getItem("token");

// //     const fetchLoggedUser = async () => {
// //       try {
// //         const res = await fetch("/api/getuserbytoken", {
// //           method: "POST",
// //           headers: {
// //             "Content-type": "application/json",
// //           },
// //           body: JSON.stringify({ token: retrievedToken }),
// //         });

// //         if (!res.ok) {
// //           throw new Error(`HTTP error! Status: ${res.status}`);
// //         }

// //         const data = await res.json();
// //         // console.log("Data from server:", data);
// //         setLoggedUser(data.user);
// //       } catch (error) {
// //         console.error("Error during fetch:", error.message);
// //       }
// //     };

// //     fetchLoggedUser();
// //   }, []); // Empty dependency array ensures this runs only once when the component mounts

// //   return (
// //     <div className="flex justify-center items-center min-[100vh]: bg-gray-100">
// //       <div className="card w-full max-w-xl bg-white shadow-lg rounded-md overflow-hidden">
// //         {/* Front Side */}
// //         <div className="front-side">
// //           <img
// //             src="./../../images/forest.jpg"
// //             alt="Forest"
// //             className="card-image w-full h-64 object-cover"
// //           />
// //           <div className="p-4">
// //             <h1 className="tour-name text-2xl font-semibold mt-4 mb-2">
// //               The Wild Forest
// //             </h1>
// //             <ul className="card-list text-sm">
// //               <li className="card-list-item">7 days tour</li>
// //               <li className="card-list-item">Up to 20 people</li>
// //               <li className="card-list-item">4 tour guides</li>
// //               <li className="card-list-item">Sleep in private tents</li>
// //               <li className="card-list-item">Difficulty: Medium</li>
// //             </ul>
// //             <button className="navigation-button mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
// //               View Details
// //             </button>
// //           </div>
// //         </div>

// //         {/* Back Side */}
// //         <div className="back-side flex flex-col items-center justify-center bg-blue-500 text-white">
// //           <h3 className="tour-price text-2xl font-bold mb-4">$399</h3>
// //           <button className="card-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700">
// //             Book Now
// //           </button>
// //         </div>

// //         <CommentInput author={loggedUser} postID={productId} />

// //         <CommentList productId={productId} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Page;

// // Import necessary dependencies

// const Page = ({ params }) => {
//   const { id } = params;
//   // State variables
//   const [loggedUser, setLoggedUser] = useState(null);
//   const [productId, setProductId] = useState(null);

//   // useEffect for fetching logged user and setting product ID
//   useEffect(() => {
//     // Check if window is defined (it's not defined on the server side)
//     if (typeof window !== "undefined") {
//       const pathArray = window.location.pathname.split("/");
//       const idFromUrl = pathArray[pathArray.length - 1];
//       setProductId(idFromUrl);
//     }
//     const retrievedToken = localStorage.getItem("token");

//     // Fetch logged user
//     const fetchLoggedUser = async () => {
//       try {
//         const res = await fetch("/api/getuserbytoken", {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify({ token: retrievedToken }),
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         setLoggedUser(data.user);
//       } catch (error) {
//         console.error("Error during fetch:", error.message);
//       }
//     };

//     // Call the fetchLoggedUser function
//     fetchLoggedUser();
//   }, []);

//   // Return JSX for the component
//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="card w-full max-w-xl bg-white shadow-lg rounded-md overflow-hidden">
//         {/* ... Your existing code ... */}
//         {+id === 2 ? (
//           <div>
//             <div className="front-side">
//               <img
//                 src="./../../images/forest.jpg"
//                 alt="Forest"
//                 className="card-image w-full h-64 object-cover"
//               />
//               <div className="p-4">
//                 <h1 className="tour-name text-2xl font-semibold mt-4 mb-2">
//                   The Sea
//                 </h1>
//                 <ul className="card-list text-sm">
//                   <li className="card-list-item">7 days tour</li>
//                   <li className="card-list-item">Up to 20 people</li>
//                   <li className="card-list-item">4 tour guides</li>
//                   <li className="card-list-item">Sleep in private tents</li>
//                   <li className="card-list-item">Difficulty: Medium</li>
//                 </ul>
//                 <button
//                   className="navigation-button mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     checkout({
//                       lineItems: [
//                         {
//                           price: "price_1OKjQtEDG6lAAoEQcP239zR6",
//                           quantity: 1,
//                         },
//                         // Add more items as needed
//                       ],
//                     });
//                   }}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//             <div className="back-side flex flex-col items-center justify-center bg-blue-500 text-white">
//               <h3 className="tour-price text-2xl font-bold mb-4">$399</h3>
//               <button className="card-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700">
//                 Book Now
//               </button>
//             </div>
//           </div>
//         ) : null}

//         {+id === 1 ? (
//           <div>
//             <div className="front-side">
//               <img
//                 src="./../../images/sea.jpg"
//                 alt="Forest"
//                 className="card-image w-full h-64 object-cover"
//               />
//               <div className="p-4">
//                 <h1 className="tour-name text-2xl font-semibold mt-4 mb-2">
//                   The Wild Forest
//                 </h1>
//                 <ul className="card-list text-sm">
//                   <li className="card-list-item">7 days tour</li>
//                   <li className="card-list-item">Up to 20 people</li>
//                   <li className="card-list-item">4 tour guides</li>
//                   <li className="card-list-item">Sleep in private tents</li>
//                   <li className="card-list-item">Difficulty: Medium</li>
//                 </ul>
//                 <button
//                   className="navigation-button mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     checkout({
//                       lineItems: [
//                         {
//                           price: "price_1OKjV5EDG6lAAoEQvnWryBM0",
//                           quantity: 1,
//                         },
//                         // Add more items as needed
//                       ],
//                     });
//                   }}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//             <div className="back-side flex flex-col items-center justify-center bg-blue-500 text-white">
//               <h3 className="tour-price text-2xl font-bold mb-4">$399</h3>
//               <button className="card-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700">
//                 Book Now
//               </button>
//             </div>
//           </div>
//         ) : null}

//         {+id === 3 ? (
//           <div>
//             <div className="front-side">
//               <img
//                 src="./../../images/river.jpg"
//                 alt="Forest"
//                 className="card-image w-full h-64 object-cover"
//               />
//               <div className="p-4">
//                 <h1 className="tour-name text-2xl font-semibold mt-4 mb-2">
//                   The River
//                 </h1>
//                 <ul className="card-list text-sm">
//                   <li className="card-list-item">7 days tour</li>
//                   <li className="card-list-item">Up to 20 people</li>
//                   <li className="card-list-item">4 tour guides</li>
//                   <li className="card-list-item">Sleep in private tents</li>
//                   <li className="card-list-item">Difficulty: Medium</li>
//                 </ul>
//                 <button
//                   className="navigation-button mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     checkout({
//                       lineItems: [
//                         {
//                           price: "price_1OKjWUEDG6lAAoEQQ1hmVt95",
//                           quantity: 1,
//                         },
//                         // Add more items as needed
//                       ],
//                     });
//                   }}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//             <div className="back-side flex flex-col items-center justify-center bg-blue-500 text-white">
//               <h3 className="tour-price text-2xl font-bold mb-4">$399</h3>
//               <button className="card-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700">
//                 Book Now
//               </button>
//             </div>
//           </div>
//         ) : null}

//         <CommentInput author={loggedUser} postID={productId} />
//         <CommentList productId={productId} />
//       </div>
//     </div>
//   );
// };

// // Export the component
// export default Page;

"use client";

import React from "react";
import { useState, useEffect } from "react";
import CommentList from "@/app/components/CommentList";
import CommentInput from "@/app/components/CommentInput";
import { checkout } from "../../ckeckout";

const Page = ({ params }) => {
  const { id } = params;
  const [loggedUser, setLoggedUser] = useState(null);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathArray = window.location.pathname.split("/");
      const idFromUrl = pathArray[pathArray.length - 1];
      setProductId(idFromUrl);
    }
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
        setLoggedUser(data.user);
      } catch (error) {
        console.error("Error during fetch:", error.message);
      }
    };

    fetchLoggedUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-3xl bg-white shadow-lg rounded-md overflow-hidden">
        {+id === 2 ? (
          <div className="flex flex-col">
            <div className="front-side">
              <img
                src="./../../images/forest.jpg"
                alt="Forest"
                className="card-image w-full h-64 object-cover"
              />
              <div className="p-4">
                <h1 className="tour-name text-2xl font-semibold mt-4 mb-2">
                  The Wild Forest{" "}
                </h1>
                <ul className="card-list text-sm">
                  <li className="card-list-item">7 days tour</li>
                  <li className="card-list-item">Up to 20 people</li>
                  <li className="card-list-item">4 tour guides</li>
                  <li className="card-list-item">Sleep in private tents</li>
                </ul>
                <button
                  className="navigation-button mt-4card-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
                  onClick={(e) => {
                    e.preventDefault();
                    checkout({
                      lineItems: [
                        {
                          price: "price_1OKjQtEDG6lAAoEQcP239zR6",
                          quantity: 1,
                        },
                      ],
                    });
                  }}
                >
                  Buy Now{" "}
                </button>
              </div>
            </div>
            {/* <div className="back-side flex flex-col items-center justify-center bg-blue-500 text-white">
              <h3 className="tour-price text-2xl font-bold mb-4">$399</h3>
              <button className="card-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700">
                Book Now
              </button>
            </div> */}
          </div>
        ) : null}

        {+id === 1 ? (
          <div className="flex flex-col">
            <div className="front-side">
              <img
                src="./../../images/sea.jpg"
                alt="Forest"
                className="card-image w-full h-64 object-cover"
              />
              <div className="p-4">
                <h1 className="tour-name text-2xl font-semibold mt-4 mb-2">
                  The Sea
                </h1>
                <ul className="card-list text-sm">
                  <li className="card-list-item">4 days tour</li>
                  <li className="card-list-item">Up to 5 people</li>
                  <li className="card-list-item">2 tour guides</li>
                  <li className="card-list-item">Sleep in private tents</li>
                </ul>
                <button
                  className="navigation-button mt-4card-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
                  onClick={(e) => {
                    e.preventDefault();
                    checkout({
                      lineItems: [
                        {
                          price: "price_1OKjV5EDG6lAAoEQvnWryBM0",
                          quantity: 1,
                        },
                      ],
                    });
                  }}
                >
                  Buy Now{" "}
                </button>
              </div>
            </div>
            {/* <div className="back-side flex flex-col items-center justify-center bg-blue-500 text-white">
              <h3 className="tour-price text-2xl font-bold mb-4">$399</h3>
              <button className="card-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700">
                Book Now
              </button>
            </div> */}
          </div>
        ) : null}

        {+id === 3 ? (
          <div className="flex flex-col">
            <div className="front-side">
              <img
                src="./../../images/river.jpg"
                alt="Forest"
                className="card-image w-full h-64 object-cover"
              />
              <div className="p-4">
                <h1 className="tour-name text-2xl font-semibold mt-4 mb-2">
                  The River
                </h1>
                <ul className="card-list text-sm">
                  <li className="card-list-item">7 days tour</li>
                  <li className="card-list-item">Up to 10 people</li>
                  <li className="card-list-item">6 tour guides</li>
                  <li className="card-list-item">Sleep in private tents</li>
                </ul>
                <button
                  className="navigation-button mt-4card-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
                  onClick={(e) => {
                    e.preventDefault();
                    checkout({
                      lineItems: [
                        {
                          price: "price_1OKjWUEDG6lAAoEQQ1hmVt95",
                          quantity: 1,
                        },
                      ],
                    });
                  }}
                >
                  Buy Now{" "}
                </button>
              </div>
            </div>
            {/* <div className="back-side flex flex-col items-center justify-center bg-blue-500 text-white">
              <h3 className="tour-price text-2xl font-bold mb-4">$399</h3>
              <button className="card-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700">
                Book Now
              </button>
            </div> */}
          </div>
        ) : null}

        <CommentInput author={loggedUser} postID={productId} />
        <CommentList productId={productId} />
      </div>
    </div>
  );
};

export default Page;
