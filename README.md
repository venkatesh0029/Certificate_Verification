# Certificate Verification System

## Project Overview

The **Certificate Verification System** is a blockchain-based application designed to issue and verify certificates securely using Ethereum. This project leverages the immutability and transparency of blockchain technology to ensure that certificates cannot be tampered with, providing a reliable way to verify their authenticity. The system hashes certificate details (student name, course, and date) and stores the hash on the Ethereum blockchain, allowing anyone to verify the certificate's validity by checking the hash.

### Key Features
- **Issue Certificates**: Users can input student details (name, course, date) to generate a unique certificate hash, which is stored on the blockchain.
- **Verify Certificates**: Users can input a certificate hash to check if it exists on the blockchain, confirming its validity.
- **User-Friendly UI**: The frontend includes a clean interface with forms to issue and verify certificates, a table to display issued certificates, and styled alerts for success/error messages.
- **Local Blockchain Testing**: Uses Hardhat to run a local Ethereum blockchain for development and testing.

### Use Case
This system is ideal for educational institutions, training providers, or any organization that issues certificates and wants to ensure their authenticity. By storing certificate hashes on the blockchain, recipients can independently verify their certificates without relying on a central authority.

## Technologies Used

- **Ethereum Blockchain**: For storing certificate hashes securely.
- **Solidity**: The programming language used to write the smart contract (`CertificateVerification.sol`).
- **Hardhat**: A development environment for Ethereum, used to compile, deploy, and test the smart contract locally.
- **Web3.js**: A JavaScript library to interact with the Ethereum blockchain from the backend.
- **Node.js & Express**: For building the backend server (`server.js`) to handle API requests.
- **React & Vite**: For the frontend (`client/`), providing a fast and modern development experience.
- **React-Bootstrap**: For styling the frontend with responsive and user-friendly components.
- **Axios**: For making HTTP requests from the frontend to the backend.
- **Bootstrap**: For CSS styling and responsive design.
- **Crypto (Node.js)**: To generate SHA-256 hashes of certificate details.

## Project Structure

```
Certificate_Verification/
├── client/                     # Frontend (React with Vite)
│   ├── public/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── App.css           # Custom CSS for styling
│   │   ├── main.jsx          # Entry point for React
│   │   └── assets/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── node_modules/
├── contracts/                  # Solidity smart contracts
│   └── CertificateVerification.sol
├── scripts/                    # Hardhat deployment scripts
│   └── deploy.js
├── src/                        # Backend utilities (Web3)
│   ├── server.js              # Backend server (Express)
│   └── utils.js              # Web3.js utility functions
├── test/                       # Test scripts (empty for now)
├── artifacts/                  # Compiled contract artifacts (auto-generated)
├── cache/                      # Hardhat compilation cache (auto-generated)
├── hardhat.config.js           # Hardhat configuration
├── package.json                # Project dependencies
├── node_modules/               # Project dependencies (auto-generated)
└── README.md                   # Project documentation
```

## Prerequisites

To run this project, you need the following installed on your system:
- **Node.js** (v16 or later) and **npm**
- **Git** (to clone the repository)
- A web browser (e.g., Chrome, Firefox)

## Setup Instructions

### 1. Clone the Repository
Clone the project to your local machine:
```bash
git clone https://github.com/tarunganesh2004/Certificate_Verification.git
cd Certificate_Verification
```

### 2. Install Dependencies
Install the required dependencies for the root directory and the frontend (`client/`).

#### Root Directory (Backend)
```bash
npm install
```
This installs Hardhat, Web3.js, Express, Axios, CORS, and other dependencies listed in the root `package.json`.

#### Client Directory (Frontend)
```bash
cd client
npm install
cd ..
```
This installs React, Vite, React-Bootstrap, Axios, and Bootstrap dependencies.

### 3. Start the Hardhat Node
Run a local Ethereum blockchain using Hardhat:
```bash
npx hardhat node
```
- This starts a local blockchain at `http://127.0.0.1:8545`.
- Keep this terminal running.

### 4. Compile the Smart Contract
Compile the Solidity contract to generate the ABI and bytecode:
```bash
npx hardhat compile
```
- This creates the `artifacts/` folder with the compiled contract.

### 5. Deploy the Smart Contract
Deploy the contract to the local blockchain:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
- Note the deployed contract address (e.g., `0xNewAddressHere`).

### 6. Update the Contract Address
Update the `contractAddress` in `src/utils.js` with the deployed address:
- Open `src/utils.js` in a code editor.
- Find the line:
  ```javascript
  const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
  ```
- Replace it with the new address:
  ```javascript
  const contractAddress = '0xNewAddressHere';
  ```
- Save the file.

### 7. Start the Backend Server
Run the Node.js backend server:
```bash
node src/server.js
```
- The server runs at `http://localhost:3001`.
- Keep this terminal running.

### 8. Start the Frontend
Run the React frontend:
```bash
cd client
npm run dev
```
- The frontend runs at `http://localhost:3000`.
- Open this URL in your browser.

## How to Use

### Issuing a Certificate
1. On the `http://localhost:3000` page, fill in the **Issue Certificate** form:
   - **Student Name**: e.g., `TG-1`
   - **Course**: e.g., `Machine Learning`
   - **Date**: e.g., `2025-05-18`
2. Click **Issue Certificate**.
3. A success message will appear with the certificate hash (e.g., `Certificate issued! Hash: 2b111d1c88502970702628fad9f4342b75db3339c7e885596e637f7724b5cdf`).
4. The issued certificate will be added to the table below the forms.

### Verifying a Certificate
1. In the **Verify Certificate** form, paste the certificate hash (e.g., `2b111d1c88502970702628fad9f4342b75db3339c7e885596e637f7724b5cdf`).
2. Click **Verify Certificate**.
3. A message will confirm if the certificate is valid (e.g., `Certificate is valid!`) or invalid.

## Notes on Restarting
- **Hardhat Node Reset**: Each time you stop and restart the Hardhat node, the local blockchain resets. You’ll need to redeploy the contract and update the address in `utils.js` (Steps 5-6 above).
- **Artifacts**: You don’t need to delete the `artifacts/` folder unless you modify the contract code (`CertificateVerification.sol`). Recompiling (`npx hardhat compile`) is only necessary if the contract changes.

## Future Improvements
- **Deploy to a Testnet**: Deploy the contract to a public Ethereum testnet (e.g., Sepolia) to make it persistent across sessions.
- **Store More Data On-Chain**: Modify the smart contract to store additional certificate details (e.g., student name, course, date) and retrieve them during verification.
- **Add Authentication**: Restrict who can issue certificates by adding a login system.
- **Export Certificates**: Allow users to download issued certificates as PDFs.

## Troubleshooting
- **CORS Errors**: Ensure the backend server includes CORS middleware (`app.use(cors())` in `server.js`).
- **Contract Interaction Errors**: Verify the contract address in `utils.js` matches the deployed address, and the Hardhat node is running.
- **Frontend Not Loading**: Check the terminal running `npm run dev` for errors, and ensure the backend server is running.

<!-- ## License
This project is licensed under the MIT License.

## Acknowledgments
- Built with guidance from Grok (xAI).
- Thanks to the Hardhat, Web3.js, and React communities for their amazing tools and documentation.

---

**Author**: Tarun Ganesh  
**GitHub**: [tarunganesh2004](https://github.com/tarunganesh2004) -->
