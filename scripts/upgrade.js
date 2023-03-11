const { ethers, upgrades } = require("hardhat");
//the address of the deployed proxy
const PROXY = "0xe4550027369Ab69724D12f472748dcf7e4D4A7a0";

async function main() {
  // Deploy the implementation contract
  const UpgradableMock2 = await ethers.getContractFactory("UpgradableMock2");
  await upgrades.upgradeProxy(PROXY, UpgradableMock2);

  console.log("UpgradableMock contract upgraded to UpgradableMock2");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
