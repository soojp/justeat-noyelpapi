import React, { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

  const randomCuisine = (preference) => {
    console.log(preference);
    let cuisines = preference.cuisine;
    if (cuisines.length > 1) {
      let min = 0;
      let max = cuisines.length - 1;
      let randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
      return cuisines[randomIndex];
    }
    return cuisines[0];
  };

  let mappedPreferences = preferences.map((preference, index) => {
    return (
      <Card key={index} className="m-3">
        <Card.Header>Random Preference {index + 1}</Card.Header>
        <Card.Body>
          <Card.Title>
            Random Cuisine Selected: {randomCuisine(preference)}
          </Card.Title>
          <Card.Text>
            {preference.distance} miles away from {preference.zipcode}
          </Card.Text>
        </Card.Body>
        <Row className="text-center p-2">
          <Col>
            <NavLink to={`/preference/edit/${preference._id}`}>Edit</NavLink>
          </Col>
          <Col>
            <Button onClick={(e) => deletePreference(preference._id)}>
              Delete
            </Button>
          </Col>
        </Row>
      </Card>
    );
  });

  return <Container>{mappedPreferences}</Container>;
};

export default PreferenceList;
