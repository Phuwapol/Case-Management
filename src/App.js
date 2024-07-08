import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CaseList from './components/CaseList';
import CaseForm from './components/CaseForm';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [cases, setCases] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [show, setShow] = useState('ทั้งหมด');

  const fetchCases = () => {
    axios.get('http://localhost:5000/cases')
      .then(response => setCases(response.data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleShow = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const casesPending = cases.filter(caseItem => caseItem.status === 'รอซ่อม');
  const casesCompleted = cases.filter(caseItem => caseItem.status === 'ดำเนินการแล้ว');

  return (
    <div className="app">
      <div className="sidebar">
        <h2>ระบบแจ้งซ่อม</h2>
        <ul>
          <li onClick={handleShow}>แบบฟอร์มแจ้งซ่อม</li>
          <li onClick={() => setShow('ทั้งหมด')}>รายการทั้งหมด</li>
          <li onClick={() => setShow('ดำเนินการแล้ว')}>ดำเนินการแล้ว</li>
          <li onClick={() => setShow('รอซ่อม')}>รอซ่อม</li>
        </ul>
      </div>
      <div className="content">
        {show === 'ทั้งหมด' && <CaseList cases={cases} fetchCases={fetchCases} />}
        {show === 'ดำเนินการแล้ว' && <CaseList cases={casesCompleted} fetchCases={fetchCases} />}
        {show === 'รอซ่อม' && <CaseList cases={casesPending} fetchCases={fetchCases} />}
      </div>

      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>แบบฟอร์มแจ้งซ่อม</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CaseForm fetchCases={fetchCases} closeModal={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
