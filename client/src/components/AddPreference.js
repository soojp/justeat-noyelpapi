import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PreferenceForm from "./PreferenceForm";

const AddPreference = () => {
  const navigate = useNavigate();

  const submit = (preference) => {
    console.log(preference);
    //upload the database (change if needed)
    axios
      .post(`http://localhost:5001/api/preference/add`, preference , {headers: {'Content-Type': 'application/json', 'accept' : 'application/json'}}) // 'Access-Control-Allow-Origin'
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(`something went wrong`, err.response);
      });
  };
  return (
    <Container>
      <Row>
        <Col>
          <h5>Fill in your preferences: </h5>
          <PreferenceForm submit={submit} />
        </Col>

        <Col>
          <p>Need ideas?</p>
          <Container className="border border-dark">
            <p>Indian</p>
            <p>Italian</p>
            <p>Chinese</p>
            <p>Mediterranean</p>
            <p>Japanese</p>
            <p>Korean</p>
            <p>Ethiopian</p>
            <p>Turkish</p>
            <p>Danish</p>
            <p>German</p>
            <p>Greek</p>
            <p>Caribbean</p>
            <p>Vegan</p>
            <p>Vegetarian</p>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPreference;
