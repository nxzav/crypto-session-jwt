import crypto from 'crypto';
import fs from 'fs';
import __dirname from './utils.js';

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // Public key cryptography standards 1
      format: 'pem', // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // Public key cryptography standards 1
      format: 'pem', // Most common formatting choice
    },
  });

  // Create the public key file
  fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);

  // Create the private key file
  fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
}

genKeyPair();
