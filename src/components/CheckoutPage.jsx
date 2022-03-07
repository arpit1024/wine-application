import "./checkout.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const CheckOut = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  console.log(form);
  const makeAnOrder = () => {
    if (!form.name || !form.email || !form.phone || !form.adress) {
      alert("All field is required");
    } else if (form.phone.toString().length !== 10) {
      alert("phone should be have 10 digits");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
    ) {
      alert("email is invalid!");
    } else {
      navigate("/success");
    }
  };
  return (
    <>
      <div className="formUser">
        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Enter Your email address"
          name="email"
          pattern="[^ @]*@[^ @]*"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Enter Your phone number"
          name="phone"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
        <textarea
          rows={10}
          cols={50}
          placeholder="Enter Your address"
          name="adress"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
      </div>
      <br />
      <br />
      <button onClick={makeAnOrder}>MAKE AN ORDER</button>
    </>
  );
};
