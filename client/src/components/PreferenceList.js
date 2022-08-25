import React, { useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


const PreferenceList = ({ setPreferences, preferences }) => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/preference/all`,{headers: {'Content-Type': 'application/json', 'accept' : 'application/json'}})
      .then((res) => {
        setPreferences(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeFromDom = (preferenceId) => {
    setPreferences(
      preferences.filter((preference) => preference.id !== preferenceId)
    );
  };

  const deletePreference = (preferenceId) => {
    axios
      .delete(`http://localhost:5001/api/preference/delete/${preferenceId}`)
      .then((res) => {
        removeFromDom(preferenceId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      {preferences.map((preference, index) => (
        <Card key={index} className="m-3">
          <Card.Header>Preference {index + 1}</Card.Header>
          <Card.Body>
            <Card.Title>Cuisine(s): {preference.cuisine}</Card.Title>
            <Card.Text>
              {preference.distance} miles away from {preference.zipcode}
            </Card.Text>
          </Card.Body>
          <Row className="text-center p-2">
            <Col>
              <NavLink to={`/preference/edit/${preference.id}`}>Edit
              </NavLink>
            </Col>
            <Col>
              <Button onClick={(e) => deletePreference(preference.id)}>
                Delete
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default PreferenceList;
