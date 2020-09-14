import React, { useState } from "react";
import "./index.css";
import * as emailjs from "emailjs-com";
import { icons } from "../../data";

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    body: "",
  });
  const [errors, setErrors] = useState([false, false, false, false]);
  const [message, setMessage] = useState(undefined);

  const handleChange = (e) => {
    let temp = { ...form };
    temp[e.target.name] = e.target.value;
    setForm({ ...temp });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      title: "",
      body: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, title, body } = form;

    let err = [
      email.trim() === "",
      name.trim() === "",
      title.trim() === "",
      body.trim() === "",
    ];

    setErrors([...err]);

    console.log(err);

    if (!errors[0] && !errors[1] && !errors[2] && !errors[3]) {
      setMessage("l");
      let templateParams = {
        from_name: email,
        to_name: "yash.silver2110@gmail.com",
        subject: title,
        message: body,
      };

      emailjs
        .send(
          "gmail1236",
          "template_69d3hkr",
          templateParams,
          "user_T7SSPNH2JWO1N5lisrbaM"
        )
        .then((res) => {
          if (res.status === 200) setMessage("r");
          else setMessage("w");

          setTimeout(() => {
            setMessage(undefined);
            resetForm();
          }, 3000);
        })
        .catch((err) => {
          if (err) setMessage("w");
          setTimeout(() => {
            setMessage(undefined);
            resetForm();
          }, 3000);
        });
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
          value={form.email}
          onChange={handleChange}
          style={{ borderColor: errors[0] ? "red" : "rgba(0,0,0,0.5)" }}
        />
        <label>
          Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          style={{ borderColor: errors[1] ? "red" : "rgba(0,0,0,0.5)" }}
        />
        <label>
          Title<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          style={{ borderColor: errors[2] ? "red" : "rgba(0,0,0,0.5)" }}
        />
        <label>
          Body<span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          rows="4"
          name="body"
          value={form.body}
          onChange={handleChange}
          style={{ borderColor: errors[3] ? "red" : "rgba(0,0,0,0.5)" }}
        />
        <button className="smt-btn" onClick={handleSubmit}>
          Send
          {message !== undefined && (
            <div style={{ position: "absolute", right: "10px", top: "5px" }}>
              <img
                src={
                  message === "l"
                    ? icons.loading
                    : message === "r"
                    ? icons.tick
                    : icons.cross
                }
                alt="status"
                style={{ height: "20px" }}
              />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};
