const hre = require("hardhat");

async function main() {
    const CertificateVerification = await hre.ethers.getContractFactory("CertificateVerification");
    const certificateVerification = await CertificateVerification.deploy();

    // Wait for deployment to complete
    await certificateVerification.waitForDeployment();

    // Get the deployed contract address
    const contractAddress = await certificateVerification.getAddress();

    console.log("CertificateVerification deployed to:", contractAddress);

    // Optionally, attach the deployed contract for further interaction
    const deployedContract = await hre.ethers.getContractAt("CertificateVerification", contractAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
