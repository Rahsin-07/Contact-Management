import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaPlusCircle,FaUserCircle,FaEye,FaTrash,FaEdit,FaTimes} from "react-icons/fa";

function ContactList({ contacts, deleteContact, updateContact }) {
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState("");
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = (updated) => {
    updateContact(updated);
    setEditContact(null);
    setToast("Updated successfully!");
    setTimeout(() => setToast(""), 2000);
  };

  const handleDelete = (id) => {
    deleteContact(id);

    if (selectedContact && selectedContact.id === id) {
      setSelectedContact(null);
    }

    if (editContact && editContact.id === id) {
      setEditContact(null);
    }

    setDeleteConfirm(null);
    setToast("Deleted successfully!");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="mobile-container">
      <div className="header">
        All Contacts
        <FaPlusCircle className="add-icon" onClick={() => navigate("/add")} />
      </div>

      <div className="search-box">
        <input placeholder="Search Contact" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">No Contacts Found</div>
      ) : (
        filtered.map((c, index) => (
          <div className="card" key={c.id}>
            <div className="card-top">
              <div className="left-part">
                <div className="number">{index + 1}</div>
                <FaUserCircle size={28} />
                <div className="details">
                  <p> <b>{c.name}</b> </p>
                  <p>{c.phone || c.mobile}</p>
                </div>
              </div>

              <div className="icons">
                <FaEye onClick={() => {
                    if (editContact) {
                      setShake(true);
                      setTimeout(() => setShake(false), 400);
                    } else {
                      setSelectedContact(c);
                    }
                  }}/>

                <FaTrash onClick={() => setDeleteConfirm(c)} />

                <FaEdit
                  onClick={() => {
                    setSelectedContact(null); 
                    setEditContact(c);
                    }} />
              </div>
            </div>
          </div>
        ))
      )}

      {/* Detail Panel */}
      {selectedContact && (
        <div className="detail-panel">
          <div className="panel-header">
            <b>Contact Details</b>
            <FaTimes className="close-icon" onClick={() => setSelectedContact(null)}/>
          </div>
          <div className="panel-content">
            <p> <b>Name:</b> {selectedContact.name} </p>
            <p> <b>Phone:</b> {selectedContact.mobile}  </p>
            <p> <b>Email:</b> {selectedContact.email || "N/A"} </p>
            <p> <b>Address:</b> {selectedContact.address || "N/A"} </p>
          </div>
        </div>
      )}

      {editContact && (
        <div className={`edit-panel ${shake ? "shake" : ""}`}>
          <div className="panel-header">
            <b>Edit Contact</b>
            <FaTimes className="close-icon" onClick={() => setEditContact(null)} />
          </div>

          <div className="panel-content">
            <input placeholder="Name" value={editContact.name} onChange={(e) =>
                setEditContact({ ...editContact, name: e.target.value })
              } />

            <input placeholder="Phone" value={editContact.mobile}
              onChange={(e) =>
                setEditContact({
                  ...editContact,
                  phone: e.target.value
                })
              }/>

            <input placeholder="Email" value={editContact.email || ""}
              onChange={(e) =>
                setEditContact({ ...editContact, email: e.target.value })
              }
            />

            <input placeholder="Address" value={editContact.address || ""}
              onChange={(e) =>
                setEditContact({ ...editContact, address: e.target.value })
              }
            />

            <button onClick={() => handleUpdate(editContact)}>
              Update
            </button>
          </div>
        </div>
      )}

    
      {deleteConfirm && (
        <div className="delete-popup">
          <p> Are you sure you want to delete{" "}<b>{deleteConfirm.name}</b>? </p>
          <div className="popup-buttons">
            <button onClick={() => handleDelete(deleteConfirm.id)}>
              Yes
            </button>
            <button onClick={() => setDeleteConfirm(null)}>
              No
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default ContactList;