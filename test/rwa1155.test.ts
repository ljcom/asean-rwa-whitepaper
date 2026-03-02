import { expect } from "chai";
import { ethers } from "hardhat";

describe("RWA1155WhitelistAnchor", function () {
  async function deployFixture() {
    const [deployer, minter, whitelistAdmin, alice, bob] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("RWA1155WhitelistAnchor");
    const contract = await Factory.deploy("ipfs://base/");
    await contract.waitForDeployment();

    const MINTER_ROLE = await contract.MINTER_ROLE();
    const WHITELIST_ADMIN_ROLE = await contract.WHITELIST_ADMIN_ROLE();

    await contract.grantRole(MINTER_ROLE, minter.address);
    await contract.grantRole(WHITELIST_ADMIN_ROLE, whitelistAdmin.address);

    return { contract, deployer, minter, whitelistAdmin, alice, bob };
  }

  it("allows whitelist admin to add/remove and blocks non-admin", async function () {
    const { contract, whitelistAdmin, alice, bob } = await deployFixture();

    await expect(contract.connect(whitelistAdmin).setWhitelist(alice.address, true))
      .to.emit(contract, "WhitelistUpdated")
      .withArgs(alice.address, true);
    expect(await contract.whitelisted(alice.address)).to.equal(true);

    await expect(contract.connect(bob).setWhitelist(alice.address, false)).to.be.reverted;

    await expect(contract.connect(whitelistAdmin).setWhitelist(alice.address, false))
      .to.emit(contract, "WhitelistUpdated")
      .withArgs(alice.address, false);
    expect(await contract.whitelisted(alice.address)).to.equal(false);
  });

  it("fails mint if recipient not whitelisted", async function () {
    const { contract, minter, alice } = await deployFixture();

    await expect(contract.connect(minter).mint(alice.address, 1, 10, "0x")).to.be.revertedWith(
      "Mint: recipient not whitelisted"
    );
  });

  it("allows mint to whitelisted recipient", async function () {
    const { contract, minter, whitelistAdmin, alice } = await deployFixture();

    await contract.connect(whitelistAdmin).setWhitelist(alice.address, true);
    await expect(contract.connect(minter).mint(alice.address, 1, 10, "0x"))
      .to.emit(contract, "TransferSingle");

    expect(await contract.balanceOf(alice.address, 1)).to.equal(10n);
  });

  it("fails transfer if recipient is not whitelisted", async function () {
    const { contract, minter, whitelistAdmin, alice, bob } = await deployFixture();

    await contract.connect(whitelistAdmin).setWhitelist(alice.address, true);
    await contract.connect(minter).mint(alice.address, 1, 10, "0x");

    await expect(
      contract.connect(alice).safeTransferFrom(alice.address, bob.address, 1, 1, "0x")
    ).to.be.revertedWith("Transfer: recipient not whitelisted");
  });

  it("anchor only admin and duplicate commitment reverts", async function () {
    const { contract, bob } = await deployFixture();
    const commitment = ethers.keccak256(ethers.toUtf8Bytes("approval-pkg-1"));

    await expect(contract.connect(bob).anchor(commitment, "deal:1:token:1")).to.be.reverted;

    await expect(contract.anchor(commitment, "deal:1:token:1"))
      .to.emit(contract, "Anchored");

    expect(await contract.anchoredCommitments(commitment)).to.equal(true);

    await expect(contract.anchor(commitment, "deal:1:token:1")).to.be.revertedWith(
      "Anchor: commitment already anchored"
    );
  });

  it("frozen address cannot receive mint, send, or receive transfer", async function () {
    const { contract, minter, whitelistAdmin, alice, bob } = await deployFixture();

    await contract.connect(whitelistAdmin).setWhitelist(alice.address, true);
    await contract.connect(whitelistAdmin).setWhitelist(bob.address, true);

    await contract.freezeAddress(bob.address, true);

    await expect(contract.connect(minter).mint(bob.address, 1, 1, "0x")).to.be.revertedWith(
      "Mint: recipient frozen"
    );

    await contract.connect(minter).mint(alice.address, 1, 10, "0x");

    await expect(
      contract.connect(alice).safeTransferFrom(alice.address, bob.address, 1, 1, "0x")
    ).to.be.revertedWith("Transfer: recipient frozen");

    await contract.freezeAddress(alice.address, true);

    await expect(
      contract.connect(alice).safeTransferFrom(alice.address, bob.address, 1, 1, "0x")
    ).to.be.revertedWith("Transfer: sender frozen");
  });
});
