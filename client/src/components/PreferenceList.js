import React, { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const PreferenceList = ({ setPreferences, preferences }) => {
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/preferences`)
      .then((res) => {
        setPreferences(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeFromDom = (preferenceId) => {
    setPreferences(
      preferences.filter((preference) => preference._id !== preferenceId)
    );
  };

  const deletePreference = (preferenceId) => {
    axios
      .delete(`http://localhost:8000/api/preference/${preferenceId}`)
      .then((res) => {
        removeFromDom(preferenceId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Table bordered className="bg-dark text-white">
        <thead>
          <tr>
            <td>Zipcode</td>
            <td>Distance</td>
            <td>Cuisine(s)</td>
            <td>Actions</td>
          </tr>
        </thead>
        {preferences.map((preference) => (
          <tr key={preference._id} className="text-center">
            <td>{preference.zipcode}</td>
            <td>{preference.distance}</td>
            <td>{preference.cuisine.join(", ")}</td>
            <td>
              <NavLink to={`/edit/${preference._id}`}>Edit</NavLink>
              <span> | </span>
              <Button onClick={(e) => deletePreference(preference._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </Table>
    </Container>
  );
};

export default PreferenceList;
