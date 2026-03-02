// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RWA1155WhitelistAnchor is ERC1155, AccessControl {
    using Strings for uint256;

    bytes32 public constant ADMIN_ROLE = DEFAULT_ADMIN_ROLE;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant WHITELIST_ADMIN_ROLE = keccak256("WHITELIST_ADMIN_ROLE");

    mapping(address => bool) public whitelisted;
    mapping(address => bool) public frozenAddress;
    mapping(bytes32 => bool) public anchoredCommitments;
    mapping(uint256 => string) private _tokenURIs;

    string private _baseMetadataURI;

    event WhitelistUpdated(address indexed user, bool allowed);
    event AddressFrozen(address indexed user, bool frozen);
    event Anchored(bytes32 indexed commitment, string uriOrTag, address indexed anchoredBy, uint256 timestamp);
    event BaseURIUpdated(string newBaseURI);
    event TokenURIUpdated(uint256 indexed tokenId, string newTokenURI);

    constructor(string memory baseURI_) ERC1155("") {
        _baseMetadataURI = baseURI_;
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(WHITELIST_ADMIN_ROLE, msg.sender);
    }

    function setWhitelist(address user, bool allowed) external onlyRole(WHITELIST_ADMIN_ROLE) {
        require(user != address(0), "Whitelist: zero address");
        whitelisted[user] = allowed;
        emit WhitelistUpdated(user, allowed);
    }

    function freezeAddress(address user, bool frozen) external onlyRole(ADMIN_ROLE) {
        require(user != address(0), "Freeze: zero address");
        frozenAddress[user] = frozen;
        emit AddressFrozen(user, frozen);
    }

    function setBaseURI(string calldata newBaseURI) external onlyRole(ADMIN_ROLE) {
        _baseMetadataURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }

    function setTokenURI(uint256 tokenId, string calldata newTokenURI) external onlyRole(ADMIN_ROLE) {
        _tokenURIs[tokenId] = newTokenURI;
        emit TokenURIUpdated(tokenId, newTokenURI);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        string memory tokenSpecific = _tokenURIs[tokenId];
        if (bytes(tokenSpecific).length > 0) {
            return tokenSpecific;
        }
        return string(abi.encodePacked(_baseMetadataURI, tokenId.toString(), ".json"));
    }

    function mint(address to, uint256 id, uint256 amount, bytes calldata data) external onlyRole(MINTER_ROLE) {
        require(whitelisted[to], "Mint: recipient not whitelisted");
        require(!frozenAddress[to], "Mint: recipient frozen");
        _mint(to, id, amount, data);
    }

    function anchor(bytes32 commitment, string calldata uriOrTag) external onlyRole(ADMIN_ROLE) {
        require(commitment != bytes32(0), "Anchor: zero commitment");
        require(!anchoredCommitments[commitment], "Anchor: commitment already anchored");

        anchoredCommitments[commitment] = true;
        emit Anchored(commitment, uriOrTag, msg.sender, block.timestamp);
    }

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override {
        if (from != address(0)) {
            require(!frozenAddress[from], "Transfer: sender frozen");
        }

        if (to != address(0)) {
            require(!frozenAddress[to], "Transfer: recipient frozen");
            if (from != address(0)) {
                require(whitelisted[to], "Transfer: recipient not whitelisted");
            }
        }

        super._update(from, to, ids, values);
    }
}
