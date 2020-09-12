import React from "react";
import "./index.css";
import { experienceData, icons } from "../../data";

export const Experience = () => {
  return (
    <div className="card">
      <span className="card-title">Experience</span>
      {experienceData.map((experience, index) => (
        <div key={index} className=" shadow exp-item">
          <div className="exp-det">
            <div className="logo">
              <img src={experience.logo} alt="company-logo" />
            </div>
            <div>
              <div className="fl-co">
                <span className="title">{experience.title}</span>
                <span className="name">{experience.companyName}</span>
                <span className="type">{experience.type}</span>
              </div>
              <span className="duration">{experience.duration}</span>
            </div>
          </div>
          <ul className="res-list">
            {experience.responsibilites.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
            }}
          >
            <div>
              {experience.importantLinks.map(({ link, title }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-container"
                >
                  <img src={icons[title]} alt="icons" className="shadow" />
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
