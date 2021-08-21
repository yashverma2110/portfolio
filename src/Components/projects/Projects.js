import React from "react";
import "./project.css";
import { projectData, icons } from "../../data";

export const Projects = () => {
  return (
    <div className="card">
      <span className="card-title">Projects</span>
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
              display: "flex",
              marginTop: "10px",
            }}
          >
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
