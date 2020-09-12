import React from "react";
import "./index.css";

export const Heading = () => {
  return (
    <div className="desc-container fl-col-ce">
      <div className="my-img-container">
        <img
          src="https://res.cloudinary.com/dxu5kynfp/image/upload/v1599198204/Portfolio/Optimized-Me_gnkrch.jpg"
          alt="my-img"
        />
      </div>
      <div className="intro">
        <span>Hi! I am</span>
        <span className="title-txt"> Yash Verma</span>
      </div>
      <div className="title">
        <span>I am a </span>
        <span id="ityped"></span>
        <span> Developer</span>
      </div>
    </div>
  );
};
