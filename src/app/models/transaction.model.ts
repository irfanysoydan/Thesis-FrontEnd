const CryptoJS = require("crypto-js");
const { SHA256, enc } = CryptoJS;
const EC = require("elliptic").ec,
  ec = new EC("secp256k1");
const BN = require("bn.js");

export class Transaction {
  fromAddress: string;
  toAddress: string;
  data: {};
  signature = { r: "", s: "", v: "" };

  constructor(fromAddress: string, toAddress: string, data: {}) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.data = data;
  }

  getHash() {
    return SHA256(JSON.stringify(this.fromAddress + this.toAddress + this.data)).toString(enc.hex);
  }

  sign(privateKey: string) {
    try {
      const keyPair = ec.keyFromPrivate(privateKey);
      const sigObj = keyPair.sign(this.getHash());
      this.signature = {
        v: sigObj.recoveryParam.toString(16),
        r: sigObj.r.toString(16),
        s: sigObj.s.toString(16),
      };
    } catch (error) {
      console.error("sign error", error);
    }
  }

  getPubKey() {
    try {
      const msgHash = this.getHash();
      const { r, s, v } = this.signature;
      const sigObj = {
        r: new BN(r, 16),
        s: new BN(s, 16),
        recoveryParam: parseInt(v, 16),
      };

      // Recover public key and get real address.
      const txSenderPubkey = ec.recoverPubKey(
        new BN(msgHash, 16).toString(10),
        sigObj,
        ec.getKeyRecoveryParam(msgHash, sigObj, ec.genKeyPair().getPublic())
      );

      return ec.keyFromPublic(txSenderPubkey).getPublic("hex");
    } catch (error) {
      console.error("getPubKey error", error);
    }
  }
}
