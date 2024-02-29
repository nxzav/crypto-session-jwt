import crypto from 'crypto';
import fs from 'fs';
import { packageOfDataToSend as receivedData } from './signMessage.js';
import { decryptWithPublicKey } from './decrypt.js';
import __dirname from './utils.js';

// This is the data that we are receiving from the sender
const hash = crypto.createHash(receivedData.algorithm);
const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8');
const decryptedMessage = decryptWithPublicKey(
  publicKey,
  receivedData.signedAndEncryptedData
);
const decryptedMessageHex = decryptedMessage.toString();

const hashOfOriginal = hash.update(JSON.stringify(receivedData.originalData));
const hashOfOriginalHex = hash.digest('hex');

if (hashOfOriginalHex === decryptedMessageHex) {
  console.log(hashOfOriginalHex)
  console.log(decryptedMessageHex);
  console.log('Success! The data has not been tampered with. Sender is valid');
} else {
  console.log('Uh oh... Someone is trying to manipulate the data');
}
