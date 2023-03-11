const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploy the implementation contract
  const UpgradableMock = await ethers.getContractFactory("UpgradableMock");
  const proxy = await upgrades.deployProxy(UpgradableMock, {
    kind: "uups",
  });
  await proxy.deployed();
  console.log("Proxy contract deployed to:", proxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
