"use client";

import { useState, useEffect } from "react";
import "./style.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { Link, Element } from "react-scroll";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedToken = localStorage.getItem("token");

        const userRes = await fetch("/api/getuserbytoken", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ token: retrievedToken }),
        });

        if (!userRes.ok) {
          throw new Error(`HTTP error! Status: ${userRes.status}`);
        }

        const userData = await userRes.json();
        setLoggedUser(userData.user);

        if (userData.user) {
          const favouritesRes = await fetch("/api/getfavourites", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ username: userData.user.username }),
          });

          if (favouritesRes.ok) {
            const favouritesData = await favouritesRes.json();
            setFavourites(favouritesData.favourites);
          }
        }
      } catch (error) {
        console.error("Error during fetch:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const addToFavourites = async (id) => {
    // Check if loggedUser is available
    if (!loggedUser) {
      console.error("User is not logged in");
      return;
    }

    try {
      const res = await fetch("/api/addtofavourites", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username: loggedUser.username, postId: id }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      // Optionally, you can update the favorites state here if needed
      window.location.reload();
    } catch (error) {
      console.error("Error during addToFavourites:", error.message);
    }
  };

  if (loading) {
    // You can render a loading state here
    return <p>Loading...</p>;
  }

  return (
    <div className={`container ${isNavbarOpen ? "change" : ""}`}>
      <div
        className="open-navbar-icon navbar-icon center"
        onClick={toggleNavbar}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className={`navbar-wrapper ${isNavbarOpen ? "change" : ""}`}>
        <nav className="navbar">
          <div
            className="close-navbar-icon navbar-icon center"
            onClick={toggleNavbar}
          >
            <div className="line line-1"></div>
            <div className="line line-2"></div>
          </div>
          <div className="nav-list">
            {/* Smooth scroll links */}
            <a
              href="/testimonial"
              // smooth={true}
              // duration={500}
              className="nav-link center"
              // onClick={() => setIsNavbarOpen(false)}
            >
              TESTIMONIALS{" "}
            </a>
            <Link
              to="popular-tours"
              smooth={true}
              duration={500}
              className="nav-link center"
              onClick={() => setIsNavbarOpen(false)}
            >
              Tours
            </Link>
            {/* <Link
              to="stories"
              smooth={true}
              duration={500}
              className="nav-link center"
              onClick={() => setIsNavbarOpen(false)}
            >
              Reviews{" "}
            </Link> */}
            <a href="/review" className="nav-link center">
              WRITE REVIEW
            </a>
            {/* <Link
              to="popular-tours"
              smooth={true}
              duration={500}
              className="nav-link center"
              onClick={() => setIsNavbarOpen(false)}
            >
              Offer
            </Link> */}
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="nav-link center"
              onClick={() => setIsNavbarOpen(false)}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
      {/* End of Navbar */}

      {/* Header */}
      <header className="header center">
        <div className="header-text">
          <h1 className="heading">Around the world</h1>
          <p className="header-paragraph">
            &ldquo;Traveling - it leaves you speechless, then turns you into a
            storyteller&rdquo;
          </p>
        </div>
        <img
          src="images/air-balloon.png"
          alt="Header Image"
          className="header-image"
        />
        <div className="logo flex gap-10 items-center justify-center">
          {/* <h2 className="color-2b81 text-2xl letter-spacing-10 bg-white ">
            Register/Login
          </h2> */}
          {loggedUser ? (
            <h2
              className="bg-white text-2xl text-color-2b81 font-bold tracking-wider p-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={() => {
                // Assuming you want to delete an item with key "token"
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              logout
            </h2>
          ) : null}
          <h2 className="bg-white text-2xl text-color-2b81 font-bold tracking-wider p-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            {loggedUser ? (
              <a href={`/users/${loggedUser.username}`}>
                {loggedUser.username}
              </a>
            ) : (
              <a href="/register">Register/Login</a>
            )}
          </h2>
          <h1>
            <span className="center">t</span>
            <span className="center">h</span>
            <span className="center">e</span>
            <span className="center">r</span>
            <span className="center">o</span>
            <span className="center">a</span>
            <span className="center">d</span>
          </h1>
        </div>
      </header>
      {/* End of Header */}

      {/* Popular tours */}
      <section className="popular-tours ">
        <h1 className="popular-tours-heading">The Most Popular Tours</h1>
        <div className="cards-wrapper">
          {/* Card 1 */}
          <div className="card">
            <div className="front-side relative">
              <img src="images/sea.jpg" alt="Forest" className="card-image" />
              <div className="absolute top-8 right-8 text-5xl">
                {/* <FaRegHeart />
                <div className="bg-red">
                  {" "}
                  <FaHeart />
                </div> */}

                {loggedUser && (
                  <div className="absolute top-8 right-8 text-5xl">
                    {favourites?.includes(1) ? (
                      <div className="bg-red">
                        <FaHeart
                          onClick={() => addToFavourites(1)}
                          className="cursor-pointer"
                        />
                      </div>
                    ) : (
                      <FaRegHeart
                        onClick={() => addToFavourites(1)}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                )}
              </div>
              <h1 className="tour-name">The Sea</h1>
              <ul className="card-list">
                <li className="card-list-item">4 days tour</li>
                <li className="card-list-item">Up to 5 people</li>
                <li className="card-list-item">2 tour guides</li>
                <li className="card-list-item">Sleep in private tents</li>
              </ul>
              <a className="navigation-button" href={`/tours/${1}`}>
                299.00$
              </a>
            </div>
            <div className="back-side center">
              <button className="navigation-button"></button>
              <h3 className="tour-price">$399</h3>
              <button className="card-button">Booking</button>
            </div>
          </div>

          <div className="card">
            <div className="front-side relative">
              <img
                src="images/forest.jpg"
                alt="Forest"
                className="card-image"
              />
              <div className="absolute top-8 right-8 text-5xl">
                {loggedUser && (
                  <div className="absolute top-8 right-8 text-5xl">
                    {favourites?.includes(2) ? (
                      <div className="bg-red">
                        <FaHeart
                          onClick={() => addToFavourites(2)}
                          className="cursor-pointer"
                        />
                      </div>
                    ) : (
                      <FaRegHeart
                        onClick={() => addToFavourites(2)}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                )}
              </div>
              <h1 className="tour-name">The wild forest</h1>
              <ul className="card-list">
                <li className="card-list-item">7 days tour</li>
                <li className="card-list-item">Up to 20 people</li>
                <li className="card-list-item">4 tour guides</li>
                <li className="card-list-item">Sleep in private tents</li>
              </ul>
              <a className="navigation-button" href={`/tours/${2}`}>
                99.00$
              </a>
            </div>
            <div className="back-side center">
              <button className="navigation-button"></button>
              <h3 className="tour-price">$399</h3>
              <button className="card-button">Booking</button>
            </div>
          </div>

          <div className="card">
            <div className="front-side relative">
              <img src="images/river.jpg" alt="Forest" className="card-image" />
              <div className="absolute top-8 right-8 text-5xl">
                {/* <FaRegHeart />
                <div className="bg-red">
                  {" "}
                  <FaHeart />
                </div> */}

                {loggedUser && (
                  <div className="absolute top-8 right-8 text-5xl">
                    {favourites?.includes(3) ? (
                      <div className="bg-red">
                        <FaHeart
                          onClick={() => addToFavourites(3)}
                          className="cursor-pointer"
                        />
                      </div>
                    ) : (
                      <FaRegHeart
                        onClick={() => addToFavourites(3)}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                )}
              </div>
              <h1 className="tour-name">The River</h1>
              <ul className="card-list">
                <li className="card-list-item">7 days tour</li>
                <li className="card-list-item">Up to 10 people</li>
                <li className="card-list-item">6 tour guides</li>
                <li className="card-list-item">Sleep in private tents</li>
              </ul>
              <a className="navigation-button" href={`/tours/3`}>
                1099$
              </a>
            </div>
            <div className="back-side center">
              <button className="navigation-button"></button>
              <h3 className="tour-price">$399</h3>
              <button className="card-button">Booking</button>
            </div>
          </div>
        </div>
      </section>
      {/* End of Popular tours */}

      {/* Stories */}
      <section className="stories">
        <div className="video-container">
          <video className="bg-video" autoPlay muted loop>
            <source src="images/video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="stories-wrapper">
          {/* Story 1 */}
          <div className="story-bg">
            <div className="story">
              <img
                src="images/story-img-2.jpg"
                alt="Customer image"
                className="story-image"
              />
              <div className="story-text">
                <h1 className="story-heading">JULIA TROWFORD </h1>
                <p className="story-paragraph">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto quas, repudiandae veritatis nam mollitia cumque
                  distinctio, quia aperiam aliquid numquam minus dolor sequi
                  quam impedit quae soluta totam perferendis!
                </p>
              </div>
            </div>
            {/*  */}

            {/*  */}
          </div>
          {/* Story 2 */}
          <div className="story-bg">
            <div className="story">
              <img
                src="images/story-img-1.jpg"
                alt="Customer image"
                className="story-image"
              />
              <div className="story-text">
                <h1 className="story-heading">JULIA MICHAELS </h1>
                <p className="story-paragraph">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto quas, repudiandae veritatis nam mollitia cumque
                  distinctio, quia aperiam aliquid numquam minus dolor sequi
                  quam impedit quae soluta totam perferendis!
                </p>
              </div>
            </div>
            {/*  */}

            {/*  */}
          </div>
          {/* <div>
            {" "}
            <a href="/testimonial" className=" text-2xl cursor-pointer">
            </a>
          </div> */}
          {/*  */}
        </div>
      </section>
      {/* End of Stories */}

      {/* Contact */}
      <section className="contact bg-gray-100 py-16">
        <h1 className="contact-heading text-4xl font-bold mb-8 text-center">
          Contact Us
        </h1>
        <form action="#" className="contact-form max-w-lg mx-auto">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-xl font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input mt-1 p-3 w-full border rounded-md text-lg"
              placeholder="Your Full Name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-xl font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input mt-1 p-3 w-full border rounded-md"
              placeholder="Your Email Address"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-xl font-medium text-gray-600"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="form-input mt-1 p-3 w-full border rounded-md"
              placeholder="Type your message here"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="submit-button bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </section>

      {/* End of Contact */}

      {/* Footer */}
      <footer className="footer bg-blue-200 text-white py-8 text-center uppercase">
        <div className="footer-logo">
          <h1>
            <span className="inline-block mx-1 bg-white rounded-full p-2">
              <span className="text-blue-500 text-2xl font-bold h-12 w-12 flex items-center justify-center">
                t
              </span>
            </span>
            <span className="inline-block mx-1 bg-white rounded-full p-2">
              <span className="text-blue-500 text-2xl font-bold h-12 w-12 flex items-center justify-center">
                h
              </span>
            </span>
            <span className="inline-block mx-1 bg-white rounded-full p-2">
              <span className="text-blue-500 text-2xl font-bold h-12 w-12 flex items-center justify-center">
                e
              </span>
            </span>
            <span className="inline-block mx-1 bg-white rounded-full p-2">
              <span className="text-blue-500 text-2xl font-bold h-12 w-12 flex items-center justify-center">
                r
              </span>
            </span>
            <span className="inline-block mx-1 bg-white rounded-full p-2">
              <span className="text-blue-500 text-2xl font-bold h-12 w-12 flex items-center justify-center">
                o
              </span>
            </span>
            <span className="inline-block mx-1 bg-white rounded-full p-2">
              <span className="text-blue-500 text-2xl font-bold h-12 w-12 flex items-center justify-center">
                a
              </span>
            </span>
            <span className="inline-block mx-1 bg-white rounded-full p-2">
              <span className="text-blue-500 text-2xl font-bold h-12 w-12 flex items-center justify-center">
                d
              </span>
            </span>
          </h1>
        </div>
        <ul className="social-icons flex space-x-4 mt-4">
          <li className="social-icon">
            <a href="#" className="icon-link text-white">
              <i className="fab fa-facebook"></i>
            </a>
          </li>
          <li className="social-icon">
            <a href="#" className="icon-link text-white">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li className="social-icon">
            <a href="#" className="icon-link text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li className="social-icon">
            <a href="#" className="icon-link text-white">
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
        </ul>
        <p className="footer-paragraph mt-4">
          {/* &copy; 2023 The Road. All rights reserved. */}
        </p>
      </footer>

      {/* End of Footer */}
    </div>
  );
}
{
  /* 

*/
}
