import React, { useEffect, useState } from "react";
import "./App.css";
import Particles from "react-particles-js";
import { init } from "ityped";
import { Heading } from "./components/details/MyData";
import { Skills } from "./components/skills";
import { Experience } from "./components/experience/Experience";
import { Contact } from "./components/contactme";
import { Projects } from "./components/projects";

function App() {
  const tabs = ["Skills", "Experience", "Projects", "Contact"];
  const [currtab, setCurrTab] = useState(0);

  useEffect(() => {
    init(document.getElementById("ityped"), {
      showCursor: true,
      strings: ["Frontend", "Backend", "Fullstack"],
    });
  }, []);

  const slides = {
    transition: "transform 0.4s",
    transform: `translateX(-${currtab * 100}%)`,
  };

  return (
    <div className="App">
      <Particles className="particles" params={options} />
      <Heading />
      <div className="fl-col-ce">
        <div className="nav">
          {tabs.map((tab, index) => (
            <span
              key={index}
              className={`${currtab === index ? "selected" : ""}`}
              onClick={() => setCurrTab(index)}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
      <div className="fl data-display">
        <div className="slide" style={{ ...slides }}>
          <Skills />
        </div>
        <div className="slide" style={{ ...slides }}>
          <Experience />
        </div>
        <div className="slide" style={{ ...slides }}>
          <Projects />
        </div>
        <div className="slide" style={{ ...slides }}>
          <Contact />
        </div>
      </div>
    </div>
  );
}

const options = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 395,
      },
    },
    line_linked: {
      enable: false,
    },
    color: "#000000",
    move: {
      speed: 1,
    },
    size: {
      value: 2,
    },
  },
};

export default App;
