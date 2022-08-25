import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PreferenceForm = ({ submit, currentPreference }) => {
  const [preference, setPreference] = useState(
    currentPreference || {
      zipcode: "",
      distance: "",
      cuisine: [""],
    }
  );

  //   this is for handling the rows
  const [rows, setRows] = useState(preference.cuisine);

  let addRow = () => {
    setRows([...rows, ""]);
  };

  let removeRow = (i) => {
    let newRows = [...rows];
    newRows.splice(i, 1);
    setRows(newRows);
  };

  //how to save the cuisine row data
  let handleRowChange = (i,e) => {
    let newRows = [...rows];
    newRows[i] = e.target.value;
    setRows(newRows);

  };

  //how to save the updated form
  const handleChange = (e) => {
    setPreference({
      ...preference,
      [e.target.name]: e.target.value,
    });
  };

  //what needs to happen when we submit
  let handleSubmit = (e) => {
    e.preventDefault();
    let payload = { ...preference, cuisine: rows };
    submit(payload);
  };
console.log("rows", rows)
  return (
    <Form className="m-3" onSubmit={handleSubmit}>
      <Row>
        <Col className="p-2">
          <FloatingLabel controlId="floatingZipcode" label="Zipcode">
            <Form.Control
              type="text"
              placeholder="Zipcode"
              name="zipcode"
              value={preference.zipcode}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row>
        <Col className="p-2">
          <Form.Select
            name="distance"
            value={preference.distance}
            onChange={handleChange}
            required
          >
            <option value="">Select One</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Form.Select>
        </Col>
        <Col className="p-2 my-auto">
          <Form.Text>mile(s) away</Form.Text>
        </Col>
      </Row>

      <h6>Cuisines:</h6>
      {rows.map((row, index) => (
        <div key={index}>
          <Row>
            <Col className="p-2">
              <FloatingLabel controlId="floatingCuisine" label="Cuisine">
                <Form.Control
                  type="text"
                  placeholder="Cuisine"
                  name="cuisine"
                  value={row}
                  onChange={(e) => handleRowChange(index, e)}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col className="my-auto">
              {index ? (
                <Button
                  type="button"
                  variant="danger"
                  className="rounded-circle fw-bold"
                  onClick={() => removeRow(index)}
                >
                  -
                </Button>
              ) : null}
            </Col>
          </Row>
        </div>
      ))}

      <Row>
        <Col className="p-2">
          <Button type="button" variant="success" onClick={() => addRow()}>
            Add Row
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PreferenceForm;
