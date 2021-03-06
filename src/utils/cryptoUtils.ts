import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";

export const encrypt = (pubKeyUInt8Array: Uint8Array, data: any) => {
  const ephemeralKeyPair = nacl.box.keyPair();
  const msgParamsUInt8Array = naclUtil.decodeUTF8(data);
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const encryptedMessage = nacl.box(
    msgParamsUInt8Array,
    nonce,
    pubKeyUInt8Array,
    ephemeralKeyPair.secretKey
  );

  return {
    version: "x25519-xsalsa20-poly1305",
    nonce: nonce,
    ephemPublicKey: ephemeralKeyPair.publicKey,
    ciphertext: encryptedMessage,
  };
};
