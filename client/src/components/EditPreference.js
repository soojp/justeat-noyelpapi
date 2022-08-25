import React, { useState, useEffect } from "react";
import axios from "axios";
import PreferenceForm from "./PreferenceForm";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";

const EditPreference = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPreference, setCurrentPreference] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/preference/${id}`)
      .then((res) => {
        setCurrentPreference(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const submit = (preference) => {
    console.log(id);
    axios
      .put(`http://localhost:5001/api/preference/update/${id}`, preference)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(`something went wrong updating`, err.response);
      });
  };

  return (
    <Container>
      <PreferenceForm submit={submit} currentPreference={currentPreference} />
    </Container>
    )
};

export default EditPreference;
