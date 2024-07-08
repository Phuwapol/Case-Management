import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const CaseForm = ({ fetchCases, closeModal }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('รอซ่อม');
  const [item, setItem] = useState('');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/cases', { name, status, item, details, email, phone, reportDate, image })
      .then(response => {
        fetchCases();
        closeModal();
      })
      .catch(error => console.log(error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>ชื่อผู้แจ้ง:</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formItem">
        <Form.Label>รายการ:</Form.Label>
        <Form.Control type="text" value={item} onChange={(e) => setItem(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formDetails">
        <Form.Label>รายละเอียด:</Form.Label>
        <Form.Control type="text" value={details} onChange={(e) => setDetails(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>อีเมล์:</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>เบอร์โทร:</Form.Label>
        <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formReportDate">
        <Form.Label>วันที่แจ้ง:</Form.Label>
        <Form.Control type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formImage">
        <Form.Label>ภาพอุปกรณ์:</Form.Label>
        <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CaseForm;
