import fs from 'fs';
import { encryptWithPublicKey } from './encrypt.js';
import { decryptWithPrivateKey } from './decrypt.js';
import __dirname from './utils.js';

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8');

// Stores a Buffer object
const encryptedMessage = encryptWithPublicKey(
  publicKey,
  'Super secret message'
);

// If you try and "crack the code", you will just get gibberish
console.log(encryptedMessage.toString());

const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf-8');

const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString());
