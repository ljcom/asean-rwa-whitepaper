import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT || 3000);
const RPC_URL = process.env.RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";
const STORE_PATH = process.env.STORE_PATH || path.join(__dirname, "store.json");

type ApprovalInput = {
  dealId: string;
  tokenId: string | number;
  amount: string | number;
  notaryApproval: {
    docHash: string;
    signerId: string;
    signedAt: string;
  };
  managerApproval: {
    docHash: string;
    signerId: string;
    signedAt: string;
  };
  kycSnapshotHash: string;
};

type DealRecord = {
  dealId: string;
  tokenId: string;
  amount: string;
  approvalPackageHash: string;
  commitment: string;
  tag: string;
  anchorTx?: string;
  anchoredAt?: string;
};

type StoreShape = {
  deals: Record<string, DealRecord>;
};

const ZERO_HASH = ethers.ZeroHash;

const CONTRACT_ABI = [
  "function setWhitelist(address user, bool allowed) external",
  "function whitelisted(address user) external view returns (bool)",
  "function anchoredCommitments(bytes32 commitment) external view returns (bool)",
  "function anchor(bytes32 commitment, string uriOrTag) external",
  "function mint(address to, uint256 id, uint256 amount, bytes data) external"
];

function ensureHex32(value: string, field: string): string {
  if (!ethers.isHexString(value, 32)) {
    throw new Error(`${field} must be bytes32 hex`);
  }
  return value.toLowerCase();
}

function canonicalize(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((v) => canonicalize(v)).join(",")}]`;
  }

  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalize(obj[k])}`).join(",")}}`;
}

function hashCanonicalJson(value: unknown): string {
  const normalized = canonicalize(value);
  return ethers.keccak256(ethers.toUtf8Bytes(normalized));
}

function merkleRoot(leaves: string[]): string {
  if (leaves.length === 0) return ZERO_HASH;
  let level = leaves.map((leaf, idx) => ensureHex32(leaf, `leaves[${idx}]`));

  while (level.length > 1) {
    const next: string[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = i + 1 < level.length ? level[i + 1] : level[i];
      const packed = ethers.solidityPacked(["bytes32", "bytes32"], [left, right]);
      next.push(ethers.keccak256(packed));
    }
    level = next;
  }

  return level[0];
}

function readStore(): StoreShape {
  if (!fs.existsSync(STORE_PATH)) {
    return { deals: {} };
  }
  const raw = fs.readFileSync(STORE_PATH, "utf-8");
  return JSON.parse(raw) as StoreShape;
}

function writeStore(store: StoreShape): void {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

function getChain() {
  if (!RPC_URL) throw new Error("RPC_URL is required");
  if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY is required");
  if (!ethers.isAddress(CONTRACT_ADDRESS)) {
    throw new Error("CONTRACT_ADDRESS is invalid");
  }

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  return { provider, signer, contract };
}

function asString(v: unknown, field: string): string {
  if (typeof v !== "string" || !v.trim()) throw new Error(`${field} is required`);
  return v.trim();
}

app.post("/whitelist/add", async (req: Request, res: Response) => {
  try {
    const address = asString(req.body?.address, "address");
    if (!ethers.isAddress(address)) throw new Error("address is invalid");
    const { contract } = getChain();
    const tx = await contract.setWhitelist(address, true);
    await tx.wait();
    res.json({ ok: true, txHash: tx.hash });
  } catch (error) {
    res.status(400).json({ ok: false, error: (error as Error).message });
  }
});

app.post("/whitelist/remove", async (req: Request, res: Response) => {
  try {
    const address = asString(req.body?.address, "address");
    if (!ethers.isAddress(address)) throw new Error("address is invalid");
    const { contract } = getChain();
    const tx = await contract.setWhitelist(address, false);
    await tx.wait();
    res.json({ ok: true, txHash: tx.hash });
  } catch (error) {
    res.status(400).json({ ok: false, error: (error as Error).message });
  }
});

app.post("/approval/package", (req: Request, res: Response) => {
  try {
    const input = req.body as ApprovalInput;
    const dealId = asString(input.dealId, "dealId");
    const tokenId = String(input.tokenId);
    const amount = String(input.amount);

    if (!input.notaryApproval || !input.managerApproval) {
      throw new Error("notaryApproval and managerApproval are required");
    }

    const notaryDocHash = ensureHex32(input.notaryApproval.docHash, "notaryApproval.docHash");
    const managerDocHash = ensureHex32(input.managerApproval.docHash, "managerApproval.docHash");
    const kycSnapshotHash = ensureHex32(input.kycSnapshotHash, "kycSnapshotHash");

    const approvalPayload = {
      dealId,
      tokenId,
      amount,
      notaryApproval: {
        docHash: notaryDocHash,
        signerId: asString(input.notaryApproval.signerId, "notaryApproval.signerId"),
        signedAt: asString(input.notaryApproval.signedAt, "notaryApproval.signedAt")
      },
      managerApproval: {
        docHash: managerDocHash,
        signerId: asString(input.managerApproval.signerId, "managerApproval.signerId"),
        signedAt: asString(input.managerApproval.signedAt, "managerApproval.signedAt")
      },
      kycSnapshotHash
    };

    const approvalPackageHash = hashCanonicalJson(approvalPayload);
    const commitment = merkleRoot([
      approvalPackageHash,
      notaryDocHash,
      managerDocHash,
      kycSnapshotHash
    ]);

    const tag = `deal:${dealId}:token:${tokenId}`;

    const store = readStore();
    store.deals[dealId] = {
      dealId,
      tokenId,
      amount,
      approvalPackageHash,
      commitment,
      tag,
      anchorTx: store.deals[dealId]?.anchorTx,
      anchoredAt: store.deals[dealId]?.anchoredAt
    };
    writeStore(store);

    res.json({
      ok: true,
      approvalPackageHash,
      commitment,
      anchorTag: tag
    });
  } catch (error) {
    res.status(400).json({ ok: false, error: (error as Error).message });
  }
});

app.post("/anchor", async (req: Request, res: Response) => {
  try {
    const commitment = ensureHex32(asString(req.body?.commitment, "commitment"), "commitment");
    const tag = asString(req.body?.tag, "tag");
    const optionalDealId = typeof req.body?.dealId === "string" ? req.body.dealId : undefined;

    const { contract } = getChain();
    const tx = await contract.anchor(commitment, tag);
    await tx.wait();

    const store = readStore();
    let dealId = optionalDealId;

    if (!dealId) {
      for (const [k, v] of Object.entries(store.deals)) {
        if (v.commitment.toLowerCase() === commitment.toLowerCase()) {
          dealId = k;
          break;
        }
      }
    }

    if (dealId && store.deals[dealId]) {
      store.deals[dealId].anchorTx = tx.hash;
      store.deals[dealId].anchoredAt = new Date().toISOString();
      writeStore(store);
    }

    res.json({ ok: true, txHash: tx.hash });
  } catch (error) {
    res.status(400).json({ ok: false, error: (error as Error).message });
  }
});

app.post("/mint", async (req: Request, res: Response) => {
  try {
    const to = asString(req.body?.to, "to");
    const tokenId = String(req.body?.tokenId);
    const amount = String(req.body?.amount);
    const dealId = asString(req.body?.dealId, "dealId");
    const data = typeof req.body?.data === "string" ? req.body.data : "0x";

    if (!ethers.isAddress(to)) throw new Error("to address is invalid");

    const store = readStore();
    const deal = store.deals[dealId];
    if (!deal) throw new Error("dealId not found in approval store");
    if (!deal.anchorTx) throw new Error("deal is not anchored yet");

    const { contract } = getChain();

    const isWhitelisted = await contract.whitelisted(to);
    if (!isWhitelisted) throw new Error("recipient is not whitelisted on-chain");

    const isAnchored = await contract.anchoredCommitments(deal.commitment);
    if (!isAnchored) throw new Error("deal commitment is not anchored on-chain");

    const tx = await contract.mint(to, BigInt(tokenId), BigInt(amount), data);
    await tx.wait();

    res.json({ ok: true, txHash: tx.hash });
  } catch (error) {
    res.status(400).json({ ok: false, error: (error as Error).message });
  }
});

app.get("/deals/:dealId", (req: Request, res: Response) => {
  const store = readStore();
  const deal = store.deals[req.params.dealId];
  if (!deal) {
    return res.status(404).json({ ok: false, error: "deal not found" });
  }
  return res.json({ ok: true, deal });
});

app.listen(PORT, () => {
  console.log(`RWA MVP server listening on http://localhost:${PORT}`);
  console.log(`Store path: ${STORE_PATH}`);
});
