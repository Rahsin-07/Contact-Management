import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddContact({ addContact }) {

  const [name, setName] = useState("");
  const [mobile, setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    addContact({
      id: Date.now(),
      name,
      mobile,
      email,
      address
    });

    navigate("/");
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <h3>Add Contact</h3>

        <form onSubmit={submitHandler}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
          <input placeholder="Phone" value={mobile} onChange={(e) => setPhone(e.target.value)} required />
          <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddContact;