// "use client";
// import "./testi.css";
// import { useEffect, useState } from "react";
// import React from "react";

// const page = () => {
//   const [testimonials, setTestimonials] = useState(null);
//   useEffect(() => {
//     const fetchTestimonial = async () => {
//       const res = await fetch("/api/getreviews");
//       if (res.ok) {
//         const data = await res.json();

//         setTestimonials(data.testimonials);
//       }
//     };
//     fetchTestimonial();
//   }, []);

//   console.log(testimonials);
//   return (
//     <div className="stories-wrapper">
//       {/* Story 1 */}
//       <div className="story-bg">
//         <div className="story">
//           <img
//             src="images/story-img-1.jpg"
//             alt="Customer image"
//             className="story-image"
//           />
//           <div className="story-text">
//             <h1 className="story-heading">
//               These were the best days of this year
//             </h1>
//             <p className="story-paragraph">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Architecto quas, repudiandae veritatis nam mollitia cumque
//               distinctio, quia aperiam aliquid numquam minus dolor sequi quam
//               impedit quae soluta totam perferendis!
//             </p>
//           </div>
//         </div>
//       </div>
//       {/* Story 2 */}
//       {testimonials?.map((testi) => {
//         return (
//           <div className="story-bg">
//             <div className="story">
//               <img
//                 src="images/story-img-1.jpg"
//                 alt="Customer image"
//                 className="story-image"
//               />
//               <div className="story-text">
//                 <h1 className="story-heading">{testi.author} </h1>
//                 <p className="story-paragraph">{testi.text}</p>
//               </div>
//             </div>
//           </div>
//         );
//       })}{" "}
//       {/* Story 3 */}
//       <div className="story-bg">{/* Story 3 content goes here */}</div>
//     </div>
//   );
// };

// export default page;
"use client";
import "./testi.css";
import { useEffect, useState } from "react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MdOutlineNavigateNext } from "react-icons/md";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";

const Page = () => {
  const [testimonials, setTestimonials] = useState(null);
  const [slider, setSlider] = useState(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      const res = await fetch("/api/getreviews");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials);
      }
    };
    fetchTestimonial();
  }, []);

  console.log(testimonials);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handlePrev = () => {
    slider.slickPrev();
  };

  const handleNext = () => {
    slider.slickNext();
  };

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <Slider ref={(slider) => setSlider(slider)} {...settings}>
        {/* Story 1 */}
        <div className="story-bg">
          <div className="story">
            <img
              src=".././images/story-img-2.jpg"
              alt="Customer image"
              className="story-image"
            />
            <div className="story-text">
              <h1 className="story-heading">JULIA TROWFORD </h1>
              <p className="story-paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto quas, repudiandae veritatis nam mollitia cumque
                distinctio, quia aperiam aliquid numquam minus dolor sequi quam
                impedit quae soluta totam perferendis!
              </p>
            </div>
          </div>
        </div>

        {/* Other testimonials */}
        {testimonials?.map((testi, index) => (
          <div key={index} className="story-bg">
            <div className="story">
              <img
                src="data:image/jpeg;base64,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"
                alt="Customer image"
                className="story-image"
              />
              <div className="story-text">
                <h1 className="story-heading">{testi.author}</h1>
                <p className="story-paragraph">{testi.text}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom navigation buttons */}
      <div className="flex justify-center items-center gap-3">
        {" "}
        <button
          onClick={handlePrev}
          className="text-5xl transition duration-300 transform hover:scale-110"
        >
          <GrLinkPrevious />
        </button>
        <button
          onClick={handleNext}
          className="text-5xl transition duration-300 transform hover:scale-110"
        >
          <GrLinkNext />
        </button>
      </div>

      <div className="flex justify-center items-center py-5">
        {" "}
        <a href="/" className="text-2xl">
          Go Back To Dashboard
        </a>
      </div>
    </div>
  );
};

export default Page;
