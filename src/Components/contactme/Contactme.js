import React, { useEffect, useState } from "react";
import "./contact.css";
import { useForm, ValidationError } from "@formspree/react";
import { icons } from "../../data";

export const Contact = () => {
  const [message, setMessage] = useState(undefined);
  const [state, handleSubmit] = useForm("mpzkoonq");

  useEffect(() => {
    if (state.submitting) {
      setMessage("l");
    }

    if (state.succeeded) {
      setMessage("r");
    }

    if (state.errors.length > 0) {
      setMessage("e");
    }
  }, [state]);

  useEffect(() => {
    if (!message) {
      setTimeout(() => {
        setMessage(undefined);
      }, 2000);
    }
  }, [message]);

  return (
    <div className="card">
      <span className="card-title">Contact Me</span>
      <form className="shadow form" onSubmit={handleSubmit}>
        <label>
          Email<span style={{ color: "red" }}>*</span>
        </label>
        <input id="email" type="email" name="email" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <label>
          Name<span style={{ color: "red" }}>*</span>
        </label>
        <input id="name" type="text" name="name" required />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
        <label>
          Title<span style={{ color: "red" }}>*</span>
        </label>
        <input type="text" name="title" required />
        <label>
          Body<span style={{ color: "red" }}>*</span>
        </label>
        <textarea rows="4" id="message" name="message" required />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <button type="submit" className="smt-btn" disabled={state.submitting}>
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
