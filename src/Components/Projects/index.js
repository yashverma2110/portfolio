import React from "react";
import "./index.css";
import { projectData, icons } from "../../data";

export const Projects = () => {
  return (
    <div className="card">
      <span className="card-title">Experience</span>
      {projectData.map((porject, index) => (
        <div key={index} className=" shadow exp-item">
          <div className="exp-det">
            <div className="logo">
              <img src={porject.logo} alt="company-logo" />
            </div>
            <div>
              <div className="fl-co">
                <span className="title">{porject.title}</span>
                <span className="name">{porject.desc}</span>
              </div>
              <span className="duration">{porject.duration}</span>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr",
              marginTop: "10px",
            }}
          >
            <div></div>
            <div>
              {porject.importantLinks.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-container"
                >
                  <img
                    src={i === 0 ? icons.link : icons.github}
                    alt="link-icon"
                    className="shadow"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
