import React from "react";
import { icons } from "../../data";
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
      <div style={{ marginTop: "20px" }}>
        <a
          href="https://www.linkedin.com/in/yash-verma-80279b16b/"
          className="icon-container"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={icons.linkedin} alt="linkedin" className="shadow" />
        </a>
        <a
          href="https://github.com/yashverma2110"
          className="icon-container"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={icons.github} alt="linkedin" className="shadow" />
        </a>
        <a
          href="https://www.instagram.com/_the_certain_someone_/"
          className="icon-container"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={icons.instagram} alt="linkedin" className="shadow" />
        </a>
      </div>
    </div>
  );
};
