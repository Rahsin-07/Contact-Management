import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditContact({ contacts, updateContact }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const contact = contacts.find(c => c.id === Number(id));

  const [name, setName] = useState("");
  const [mobile, setPhone] = useState("");
  const [email,setEmail] = useState("");
  const[address,setAddress]=useState("");

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhone(contact.mobile || "");
      setEmail(contact.email);
      setAddress(contact.address)
    }
  }, [contact]);

  const submitHandler = (e) => {
    e.preventDefault();

    updateContact({
      id: Number(id),
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
        <h3>Edit Contact</h3>

        <form onSubmit={submitHandler}>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={mobile} onChange={(e) => setPhone(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditContact;