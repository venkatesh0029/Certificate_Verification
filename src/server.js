const express = require('express');
const cors = require('cors'); // Add CORS package
const { issueCertificate, verifyCertificate } = require('./utils');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post('/issue', async (req, res) => {
    try {
        const { studentName, course, date } = req.body;
        if (!studentName || !course || !date) {
            return res.status(400).send('Missing required fields');
        }

        const data = `${studentName}${course}${date}`;
        const certificateHash = crypto.createHash('sha256').update(data).digest('hex');

        const Web3 = require('web3').default; // Corrected import
        const web3 = new Web3('http://127.0.0.1:8545');
        const accounts = await web3.eth.getAccounts();

        await issueCertificate(accounts[0], '0x' + certificateHash);
        res.json({ certificateHash });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error issuing certificate');
    }
});


app.post('/verify', async (req, res) => {
    try {
        const { certificateHash } = req.body;
        const isValid = await verifyCertificate('0x' + certificateHash);
        res.json({ isValid });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying certificate');
    }
});

app.listen(3001, () => console.log('Server running on port 3001'));