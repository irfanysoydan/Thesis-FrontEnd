const EC = require("elliptic").ec,
  ec = new EC("secp256k1");

export function initWallet() {
  const privateKey = generatePrivateKey();
  const key = ec.keyFromPrivate(privateKey, "hex");
  const publicKey = key.getPublic().encode("hex");
  return { publicKey, privateKey };
}

const generatePrivateKey = () => {
  const keyPair = ec.genKeyPair();
  const privateKey = keyPair.getPrivate();
  return privateKey.toString(16);
};
