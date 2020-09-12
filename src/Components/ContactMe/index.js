import React, { useState } from "react";
import "./index.css";

export const Contact = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState([false, false, false, false]);

  const handleChange = (e) => {
    let temp = { ...form };
    temp[e.target.name] = e.target.value;
    setForm({ ...temp });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, title, body } = form;

    setErrors([
      !email || email.trim() === "",
      !name || name.trim() === "",
      !title || title.trim() === "",
      !body || body.trim() === "",
    ]);

    if (errors[0] && errors[1] && errors[2] && errors[3]) {
      setForm({});
    }
  };

  return (
    <div className="card">
      <span className="card-title">Contact Me</span>
      <form className="shadow form">
        <label>
          Email<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          style={{ borderColor: errors[0] ? "red" : "rgba(0,0,0,0.5)" }}
        />
        <label>
          Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          style={{ borderColor: errors[1] ? "red" : "rgba(0,0,0,0.5)" }}
        />
        <label>
          Title<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          style={{ borderColor: errors[2] ? "red" : "rgba(0,0,0,0.5)" }}
        />
        <label>
          Body<span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          rows="4"
          name="body"
          onChange={handleChange}
          style={{ borderColor: errors[3] ? "red" : "rgba(0,0,0,0.5)" }}
        />
        <button className="smt-btn" onClick={handleSubmit}>
          Send
        </button>
      </form>
    </div>
  );
};
