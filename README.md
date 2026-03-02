# Indonesia RWA MVP (ERC-1155 + Whitelist + Anchor)

Minimal prototype for an Indonesia RWA flow:
- Off-chain approvals + KYC snapshot hashed into an approval package
- Commitment (Merkle root) anchored on-chain
- ERC-1155 mint/transfer enforced to whitelisted addresses only

## Project Structure

- `contracts/RWA1155WhitelistAnchor.sol`
- `test/rwa1155.test.ts`
- `scripts/deploy.ts`
- `server/index.ts`

## Requirements

- Node.js 20+
- npm

## Install

```bash
npm install
cp .env.example .env
```

## Environment Variables

- `RPC_URL`: JSON-RPC endpoint
- `PRIVATE_KEY`: signer key for deploy/admin/minter calls
- `CONTRACT_ADDRESS`: deployed contract address (required for server)
- `BASE_URI`: base metadata URI for deploy script (optional)
- `PORT`: server port (default `3000`)
- `STORE_PATH`: JSON persistence path for deal approvals (default `./server/store.json`)

## Smart Contract Features

- Roles:
  - `ADMIN_ROLE` (default admin/deployer)
  - `MINTER_ROLE`
  - `WHITELIST_ADMIN_ROLE`
- Whitelist enforcement:
  - `mint` only to whitelisted addresses
  - transfer/batch transfer blocked when recipient is not whitelisted
- Anchor:
  - `anchor(bytes32 commitment, string uriOrTag)` only by admin
  - duplicate commitment prevented
  - event `Anchored(...)`
- URI support:
  - base URI + per-token URI override
- Optional freeze:
  - frozen addresses cannot receive mint, send transfer, or receive transfer

## Run Tests

```bash
npx hardhat test
```

## Deploy

Local Hardhat network (example):

```bash
npx hardhat node
# in another terminal
npx hardhat run scripts/deploy.ts --network localhost
```

Amoy (example):

```bash
npx hardhat run scripts/deploy.ts --network amoy
```

## Run Server

```bash
npm run server
```

## API Endpoints

### 1) Add whitelist

`POST /whitelist/add`

```bash
curl -X POST http://localhost:3000/whitelist/add \
  -H "Content-Type: application/json" \
  -d '{"address":"0xYourWallet"}'
```

### 2) Remove whitelist

`POST /whitelist/remove`

```bash
curl -X POST http://localhost:3000/whitelist/remove \
  -H "Content-Type: application/json" \
  -d '{"address":"0xYourWallet"}'
```

### 3) Build approval package

`POST /approval/package`

```bash
curl -X POST http://localhost:3000/approval/package \
  -H "Content-Type: application/json" \
  -d '{
    "dealId":"DEAL-001",
    "tokenId":1001,
    "amount":500,
    "notaryApproval":{
      "docHash":"0x1111111111111111111111111111111111111111111111111111111111111111",
      "signerId":"NOTARY-A",
      "signedAt":"2026-03-02T09:00:00Z"
    },
    "managerApproval":{
      "docHash":"0x2222222222222222222222222222222222222222222222222222222222222222",
      "signerId":"MANAGER-A",
      "signedAt":"2026-03-02T09:15:00Z"
    },
    "kycSnapshotHash":"0x3333333333333333333333333333333333333333333333333333333333333333"
  }'
```

Response includes:
- `approvalPackageHash` (keccak256 of canonical JSON)
- `commitment` (Merkle root over `[approvalPackageHash, notaryDocHash, managerDocHash, kycSnapshotHash]`)
- `anchorTag` (`deal:<dealId>:token:<tokenId>`)

### 4) Anchor commitment

`POST /anchor`

```bash
curl -X POST http://localhost:3000/anchor \
  -H "Content-Type: application/json" \
  -d '{
    "dealId":"DEAL-001",
    "commitment":"0xYourCommitmentFromApprovalPackage",
    "tag":"deal:DEAL-001:token:1001"
  }'
```

### 5) Mint token (blocked unless anchored + whitelisted)

`POST /mint`

```bash
curl -X POST http://localhost:3000/mint \
  -H "Content-Type: application/json" \
  -d '{
    "to":"0xWhitelistedRecipient",
    "tokenId":1001,
    "amount":10,
    "data":"0x",
    "dealId":"DEAL-001"
  }'
```

Server pre-checks:
- recipient whitelisted on-chain
- `dealId` exists in store
- `dealId` has recorded anchor tx
- on-chain `anchoredCommitments(commitment)` is true
