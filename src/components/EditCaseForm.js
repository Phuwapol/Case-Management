import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditCaseForm = ({ caseItem, fetchCases, closeModal }) => {
  const [status, setStatus] = useState(caseItem.status);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/cases/${caseItem.id}`, { status })
      .then(response => {
        fetchCases();
        closeModal();
      })
      .catch(error => console.log(error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formStatus">
        <Form.Label>สถานะ:</Form.Label>
        <Form.Control as="select" value={status} onChange={handleChange} required>
          <option value="รอซ่อม">รอซ่อม</option>
          <option value="ดำเนินการแล้ว">ดำเนินการแล้ว</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default EditCaseForm;
