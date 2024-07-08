import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditCaseModal from './EditCaseModal';

const CaseList = ({ cases, fetchCases }) => {
  const [selectedCase, setSelectedCase] = useState(null);

  const handleEdit = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ไอดี</th>
            <th>ชื่อผู้แจ้ง</th>
            <th>สถานะ</th>
            <th>รายการ</th>
            <th>รายละเอียด</th>
            <th>อีเมล์</th>
            <th>เบอร์โทร</th>
            <th>วันที่แจ้ง</th>
            <th>ภาพอุปกรณ์</th>
            <th>การกระทำ</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(caseItem => (
            <tr key={caseItem.id}>
              <td>{caseItem.id}</td>
              <td>{caseItem.name}</td>
              <td>{caseItem.status}</td>
              <td>{caseItem.item}</td>
              <td>{caseItem.details}</td>
              <td>{caseItem.email}</td>
              <td>{caseItem.phone}</td>
              <td>{caseItem.reported_at}</td>
              <td><img src={caseItem.image} alt="Equipment" /></td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(caseItem)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditCaseModal caseItem={selectedCase} fetchCases={fetchCases} closeModal={closeModal} />
    </div>
  );
};

export default CaseList
