// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {
    address public admin;
    mapping(bytes32 => bool) public certificates;

    event CertificateIssued(bytes32 indexed certificateHash);
    event CertificateVerified(bytes32 indexed certificateHash, bool isValid);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function issueCertificate(bytes32 certificateHash) public onlyAdmin {
        require(!certificates[certificateHash], "Certificate already exists");
        certificates[certificateHash] = true;
        emit CertificateIssued(certificateHash);
    }

    function verifyCertificate(bytes32 certificateHash) public view returns (bool) {
        return certificates[certificateHash];
    }
}