import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditCaseModal = ({ caseItem, fetchCases, closeModal }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (caseItem) {
      setStatus(caseItem.status);
    }
  }, [caseItem]);

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
    <Modal show={!!caseItem} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Case Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formStatus">
            <Form.Label>สถานะ:</Form.Label>
            <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="รอซ่อม">รอซ่อม</option>
              <option value="ดำเนินการแล้ว">ดำเนินการแล้ว</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCaseModal;
