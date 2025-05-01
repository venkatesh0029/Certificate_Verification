// @ts-nocheck
import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');
  const [certificateHash, setCertificateHash] = useState('');
  const [hashToVerify, setHashToVerify] = useState('');
  const [message, setMessage] = useState('');
  const [certificates, setCertificates] = useState([]); // Store issued certificates

  const handleIssueCertificate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/issue', {
        studentName,
        course,
        date,
      });
      const newHash = response.data.certificateHash;
      setCertificateHash(newHash);
      setCertificates([...certificates, { studentName, course, date, hash: newHash }]);
      setMessage(`Certificate issued! Hash: ${newHash}`);
    } catch (error) {
      setMessage('Error issuing certificate.');
      console.error(error);
    }
  };

  const handleVerifyCertificate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/verify', {
        certificateHash: hashToVerify,
      });
      setMessage(response.data.isValid ? 'Certificate is valid!' : 'Certificate is invalid.');
    } catch (error) {
      setMessage('Error verifying certificate.');
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Certificate Verification</h1>

      <Row>
        <Col md={6}>
          <h3>Issue Certificate</h3>
          <Form onSubmit={handleIssueCertificate} className="mb-4">
            <Form.Group controlId="studentName" className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                required
              />
            </Form.Group>

            <Form.Group controlId="course" className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Enter course name"
                required
              />
            </Form.Group>

            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Issue Certificate
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h3>Verify Certificate</h3>
          <Form onSubmit={handleVerifyCertificate} className="mb-4">
            <Form.Group controlId="certificateHash" className="mb-3">
              <Form.Label>Certificate Hash</Form.Label>
              <Form.Control
                type="text"
                value={hashToVerify}
                onChange={(e) => setHashToVerify(e.target.value)}
                placeholder="Enter certificate hash"
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Verify Certificate
            </Button>
          </Form>
        </Col>
      </Row>

      {message && (
        <Alert variant={message.includes('valid') ? 'success' : 'danger'} className="mt-3">
          {message}
        </Alert>
      )}

      {certificates.length > 0 && (
        <div className="mt-5">
          <h3>Issued Certificates</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Date</th>
                <th>Certificate Hash</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert, index) => (
                <tr key={index}>
                  <td>{cert.studentName}</td>
                  <td>{cert.course}</td>
                  <td>{cert.date}</td>
                  <td className="certificate-hash">{cert.hash}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default App;