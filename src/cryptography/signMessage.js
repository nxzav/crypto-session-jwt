import crypto from 'crypto';
import fs from 'fs';
import { encryptWithPrivateKey, encryptWithPublicKey } from './encrypt.js';
import { decryptWithPrivateKey, decryptWithPublicKey } from './decrypt.js';
import __dirname from './utils.js';

const hash = crypto.createHash('sha256');

const myData = {
  firstName: 'Noe',
  lastName: 'Zavala',
  socialSecurityNumber:
    'NOO, never put personal info in a digitally signed message\
    since this for of cryptography does not hide the data',
};

// String version of our data that can be hashed
const myDataString = JSON.stringify(myData);

// Sets the value on the hash object (requires string format)
hash.update(myDataString);

// Hashed data in Hexadecimal format
const hashedData = hash.digest('hex');

const senderPrivateKey = fs.readFileSync(
  __dirname + '/id_rsa_priv.pem',
  'utf-8'
);

const signedMessage = encryptWithPrivateKey(senderPrivateKey, hashedData);

export const packageOfDataToSend = {
  algorithm: 'sha256',
  originalData: myData,
  signedAndEncryptedData: signedMessage,
};
