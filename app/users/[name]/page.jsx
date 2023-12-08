"use client";
// Import React, useState, and useEffect
import React, { useState, useEffect } from "react";
// Import the CSS file "./some.css"
import "./some.css";

// FollowerListModal component
const FollowerListModal = ({ isOpen, onClose, users }) => {
  // If modal is not open, return null
  if (!isOpen) return null;

  // Return the modal structure
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Followers</h2>
        <ul>
          {users.map((user) => (
            <li key={Math.random() * 999} className="mb-2">
              {user}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// IndividualPage component
const IndividualPage = ({ user, loggedUser }) => {
  // If user or loggedUser is null, return null

  // State for modal visibility and followers/following lists
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // useEffect to check if the logged-in user is following the current user
  useEffect(() => {
    // Check if the user is logged in before fetching data
    if (loggedUser) {
      // Check if the logged-in user is following the current user
      if (user.followers.includes(loggedUser.username)) {
        setIsFollowing(true);
      }
    } else {
      return null;
    }
  }, [user, loggedUser]);

  if (!user || !loggedUser) return null;

  // Handler for unfollow action
  const unfollowHandler = async () => {
    // Placeholder for unfollow logic
    await fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user, loggedUser }),
    });
    console.log("Unfollow logic placeholder");
  };

  // Handler for follow action
  const followHandler = async () => {
    // Placeholder for follow logic
    await fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user, loggedUser }),
    });
  };

  // Function to render the follow/unfollow button
  const renderFollowButton = () => {
    // If the current user is viewing their own profile, return null
    if (user.username === loggedUser.username) return null;
    // If the user is already following, render unfollow button; otherwise, render follow button
    if (isFollowing) {
      return (
        <button
          onClick={unfollowHandler}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Unfollow
        </button>
      );
    } else {
      return (
        <button
          onClick={followHandler}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Follow
        </button>
      );
    }
  };

  // Display user information and interactions
  return (
    <div className="flex flex-col items-center mt-8">
      <h1>{loggedUser.username}</h1>
      <h1 className="text-2xl font-bold mb-4">{user.username}'s Profile</h1>

      {/* Display followers count and open followers modal on click */}
      <div className="mb-4">
        <span className="mr-2">Followers: {user.followers.length}</span>
        <button
          onClick={() => setFollowersModalOpen(true)}
          className="text-blue-500 underline cursor-pointer"
        >
          View Followers
        </button>
      </div>

      {/* Display following count and open following modal on click */}
      <div className="mb-4">
        <span className="mr-2">Following: {user.following.length}</span>
        <button
          onClick={() => setFollowingModalOpen(true)}
          className="text-blue-500 underline cursor-pointer"
        >
          View Following
        </button>
      </div>

      {/* Follow/Unfollow Button */}
      {renderFollowButton()}

      {/* Followers Modal */}
      <FollowerListModal
        isOpen={followersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        users={user.followers}
      />

      {/* Following Modal */}
      <FollowerListModal
        isOpen={followingModalOpen}
        onClose={() => setFollowingModalOpen(false)}
        users={user.following}
      />
      {/* Display user's favorites */}
      <h1 className="text-2xl font-bold mb-4">{user.username}'s Favourites:</h1>
      {!user.favourites || user.favourites.length === 0 ? (
        " User Has No Favourites "
      ) : (
        <div className="container mx-auto p-4 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Display favorite 1 */}
            {user.favourites.includes(1) ? (
              <div className="card bg-white rounded-md overflow-hidden shadow-md">
                <div className="relative">
                  <img
                    src="../../images/sea.jpg"
                    alt="The Sea's Image"
                    className="w-full h-40 object-cover rounded-t"
                  />
                  <h2 className="absolute top-2 right-2 text-2xl"></h2>
                  <div className="p-4">
                    <h1 className="text-lg font-bold mb-2">The Sea</h1>
                    <ul className="list-disc pl-4">
                      <li>4 days tour</li>
                      <li>Up to 5 people</li>
                      <li>2 tour guides</li>
                      <li>Sleep in private tents</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Display favorite 2 */}
            <div>
              {user.favourites.includes(2) ? (
                <div className="card bg-white rounded-md overflow-hidden shadow-md">
                  <div className="relative">
                    <img
                      src="../../images/forest.jpg"
                      alt="The Wild Forest's Image"
                      className="w-full h-40 object-cover rounded-t"
                    />
                    <h2 className="absolute top-2 right-2 text-2xl"></h2>
                    <div className="p-4">
                      <h1 className="text-lg font-bold mb-2">
                        The Wild Forest
                      </h1>
                      <ul className="list-disc pl-4">
                        <li>7 days tour</li>
                        <li>Up to 20 people</li>
                        <li>4 tour guides</li>
                        <li>Sleep in private tents</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Display favorite 3 */}
            <div>
              {user.favourites.includes(3) ? (
                <div className="card bg-white rounded-md overflow-hidden shadow-md">
                  <div className="relative">
                    <img
                      src="../../images/river.jpg"
                      alt="The River"
                      className="w-full h-40 object-cover rounded-t"
                    />
                    <h2 className="absolute top-2 right-2 text-2xl"></h2>
                    <div className="p-4">
                      <h1 className="text-lg font-bold mb-2">The River</h1>
                      <ul className="list-disc pl-4">
                        <li>7 days tour</li>
                        <li>Up to 10 people</li>
                        <li>6 tour guides</li>
                        <li>Sleep in private tents</li>{" "}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Go back link */}
      <a href="/">Go Back To The Dashboard</a>
    </div>
  );
};

// Page component
const Page = ({ params }) => {
  // State for user and loggedUser
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  // Extract the "name" parameter from the params object
  const { name } = params;

  // useEffect to fetch user data by name and logged-in user data
  useEffect(() => {
    // Fetch user data by name
    const getuserbyname = async () => {
      const res = await fetch("/api/getuserbyname", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username: name }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    };
    getuserbyname();

    // Fetch logged-in user data
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

  // Return the component structure
  return (
    <div>
      {/* Render IndividualPage component with user and loggedUser props */}
      <IndividualPage user={user} loggedUser={loggedUser} />
    </div>
  );
};

// Export the Page component as the default export
export default Page;
