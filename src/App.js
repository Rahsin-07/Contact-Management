import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import "./App.css";

function App() {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json")
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // Add Contact
  const addContact = (contact) => {
    setContacts(prev => [...prev, contact]);
  };

  // Delete Contact
  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  // Update Contact
  const updateContact = (updatedContact) => {
    setContacts(prev =>
      prev.map(c =>
        c.id === updatedContact.id ? updatedContact : c
      ));
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <ContactList contacts={contacts} deleteContact={deleteContact} updateContact={updateContact}  /> }/>
        <Route path="/add" element={<AddContact addContact={addContact} />}/>
        <Route path="/edit/:id" element={<EditContact contacts={contacts} updateContact={updateContact}/>} />
      </Routes>
    </Router>
  );
}

export default App;