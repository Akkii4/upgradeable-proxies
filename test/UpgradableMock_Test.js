const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("ERC721 Upgradeable", function () {
  it("Should deploy an upgradeable ERC721 Contract", async function () {
    const UpgradableMock = await ethers.getContractFactory("UpgradableMock");
    const UpgradableMock2 = await ethers.getContractFactory("UpgradableMock2");

    // Deploy UpgradableMock as a UUPS Proxy Contract
    // deployProxy by default calls the function with name initialize for the initializer
    let proxyContract = await hre.upgrades.deployProxy(UpgradableMock, {
      kind: "uups",
    });
    const [owner] = await ethers.getSigners();
    const ownerOfNFT1 = await proxyContract.ownerOf(5);

    expect(ownerOfNFT1).to.equal(owner.address);

    // upgrades and replaces UpgradableMock with UpgradableMock2 without changing the state of the system
    proxyContract = await hre.upgrades.upgradeProxy(
      proxyContract,
      UpgradableMock2
    );
    // Verify it has been modified
    expect(await proxyContract.newFunc()).to.equal("modified");
  });
});
