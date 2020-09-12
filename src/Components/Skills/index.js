import React from "react";
import "./index.css";

export const Skills = () => {
  const bar = (width) => (
    <div className="bar-co">
      <div className="bar" style={{ width }}></div>
    </div>
  );

  return (
    <div className="card">
      <span className="card-title">Technology Stack</span>
      <ul className="shadow card-body sk-list">
        <li>HTML5{bar("95%")}</li>
        <li>CSS3{bar("95%")}</li>
        <li>JavaScript{bar("90%")}</li>
        <li>React{bar("90%")}</li>
        <li>Redux{bar("90%")}</li>
        <li>Node{bar("90%")}</li>
        <li>Express{bar("90%")}</li>
        <li>MongoDB{bar("90%")}</li>
        <li>Docker{bar("80%")}</li>
      </ul>
    </div>
  );
};
