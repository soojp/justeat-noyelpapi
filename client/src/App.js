import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PreferenceList from "./components/PreferenceList";
import AddPreference from "./components/AddPreference";
import EditPreference from "./components/EditPreference";

function App() {
  const [preferences, setPreferences] = useState([]);

  return (
    <BrowserRouter>
      <Container className="App">
        <Navbar>
          <Container>
            <Navbar.Brand>
              <h1>JUST.eat</h1>
            </Navbar.Brand>
            <Nav>
              <Nav.Link href={`/`}>Home</Nav.Link>
              <Nav.Link href={`/new`}>Add Preference</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route
            default
            path="/"
            element={
              <PreferenceList
                setPreferences={setPreferences}
                preferences={preferences}
              />
            }
          />
          <Route path="/new" element={<AddPreference />} />
          <Route path="/edit/:id" element={<EditPreference />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
