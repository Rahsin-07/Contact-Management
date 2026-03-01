import React, { useState } from "react";
import { FaPlusCircle,FaUserCircle,FaEye,FaTrash,FaEdit,FaTimes} from "react-icons/fa";

function ContactList({ contacts, deleteContact, updateContact, addContact }) {
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState("");
  const [shake, setShake] = useState(false);

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = (updated) => {
    updateContact(updated);
    setEditContact(null);
    showToast("Updated successfully!");
  };

  const handleAdd = (newContact) => {
    addContact(newContact);
    setShowAdd(false);
    showToast("Added successfully!");
  };

  const handleDelete = (id) => {
    deleteContact(id);

    if (selectedContact?.id === id) setSelectedContact(null);
    if (editContact?.id === id) setEditContact(null);

    setDeleteConfirm(null);
    showToast("Deleted successfully!");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="mobile-container">
      <div className="header">
        All Contacts
        <FaPlusCircle className="add-icon"
          onClick={() => {
            setSelectedContact(null);
            setEditContact(null);
            setShowAdd(true);
          }}
        />
      </div>

      <div className="search-box">
        <input placeholder="Search Contact" value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
                  <p><b>{c.name}</b></p>
                  <p>{c.mobile}</p>
                </div>
              </div>

              <div className="icons">
                <FaEye onClick={() => {
                    if (editContact || showAdd) {
                      setShake(true);
                      setTimeout(() => setShake(false), 400);
                    } else {
                      setSelectedContact(c);
                    }
                  }}
                />

                <FaTrash onClick={() => setDeleteConfirm(c)} />

                <FaEdit onClick={() => {
                    setSelectedContact(null);
                    setShowAdd(false);
                    setEditContact(c);
                  }}
                />
              </div>
            </div>
          </div>
        ))
      )}

      {/* DETAIL PANEL */}
      {selectedContact && (
        <div className="detail-panel">
          <div className="panel-header">
            <b>Contact Details</b>
            <FaTimes onClick={() => setSelectedContact(null)} />
          </div>
          <div className="panel-content">
            <p><b>Name:</b> {selectedContact.name}</p>
            <p><b>Phone:</b> {selectedContact.mobile}</p>
            <p><b>Email:</b> {selectedContact.email || "N/A"}</p>
            <p><b>Address:</b> {selectedContact.address || "N/A"}</p>
          </div>
        </div>
      )}

      {/* EDIT PANEL */}
      {editContact && (
        <div className={`side-panel ${shake ? "shake" : ""}`}>
          <div className="panel-header">
            <b>Edit Contact</b>
            <FaTimes onClick={() => setEditContact(null)} />
          </div>

          <form
            className="panel-content"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editContact);
            }}
          >
            <input value={editContact.name}
              onChange={(e) =>
                setEditContact({ ...editContact, name: e.target.value })
              }
              required
            />

            <input value={editContact.mobile}
              onChange={(e) =>
                setEditContact({ ...editContact, mobile: e.target.value })
              }
              required
            />

            <input value={editContact.email || ""}
              onChange={(e) =>
                setEditContact({ ...editContact, email: e.target.value })
              }
            />

            <input value={editContact.address || ""}
              onChange={(e) =>
                setEditContact({ ...editContact, address: e.target.value })
              }
            />

            <button type="submit">Update</button>
          </form>
        </div>
      )}

      {/* ADD PANEL */}
      {showAdd && (
        <div className={`side-panel ${shake ? "shake" : ""}`}>
          <div className="panel-header">
            <b>Add Contact</b>
            <FaTimes onClick={() => setShowAdd(false)} />
          </div>

          <AddContactInline addContact={handleAdd} />
        </div>
      )}

      {/* DELETE POPUP */}
      {deleteConfirm && (
        <div className="delete-popup">
          <p>Delete <b>{deleteConfirm.name}</b>?</p>
          <div className="popup-buttons">
            <button onClick={() => handleDelete(deleteConfirm.id)}>Yes</button>
            <button onClick={() => setDeleteConfirm(null)}>No</button>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function AddContactInline({ addContact }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    addContact({
      id: Date.now(),
      name,
      mobile,
      email,
      address
    });
  };

  return (
    <form className="panel-content" onSubmit={submitHandler}>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Phone" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <button type="submit">Add</button>
    </form>
  );
}

export default ContactList;