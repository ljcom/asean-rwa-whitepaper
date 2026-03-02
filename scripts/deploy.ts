import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  const baseURI = process.env.BASE_URI || "ipfs://rwa-metadata/";

  const Factory = await ethers.getContractFactory("RWA1155WhitelistAnchor");
  const contract = await Factory.deploy(baseURI);
  await contract.waitForDeployment();

  console.log("Deployer:", deployer.address);
  console.log("Contract:", await contract.getAddress());
  console.log("Base URI:", baseURI);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
