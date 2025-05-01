import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './App.css';

function App() {
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');
  const [certificateHash, setCertificateHash] = useState('');
  const [message, setMessage] = useState('');

  const handleIssueCertificate = async () => {
    if (!studentName || !course || !date) {
      setMessage('Please fill in all fields.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3001/issue', { studentName, course, date });
      setMessage(`Certificate issued! Hash: ${res.data.certificateHash}`);
    } catch (error) {
      setMessage('Error issuing certificate.');
    }
  };

  const handleVerifyCertificate = async () => {
    if (!certificateHash) {
      setMessage('Please enter a certificate hash.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3001/verify', { certificateHash });
      setMessage(res.data.isValid ? 'Certificate is valid!' : 'Certificate is invalid.');
    } catch (error) {
      setMessage('Error verifying certificate.');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Certificate Verification</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleIssueCertificate}>Issue Certificate</Button>
      </Form>
      <Form className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Certificate Hash</Form.Label>
          <Form.Control
            type="text"
            value={certificateHash}
            onChange={(e) => setCertificateHash(e.target.value)}
            placeholder="Enter certificate hash"
          />
        </Form.Group>
        <Button variant="success" onClick={handleVerifyCertificate}>Verify Certificate</Button>
      </Form>
      {message && <Alert className="mt-3" variant="info">{message}</Alert>}
    </Container>
  );
}

export default App;