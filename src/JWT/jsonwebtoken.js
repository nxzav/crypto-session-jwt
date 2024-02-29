import jwt from 'jsonwebtoken';
import fs from 'fs';
import __dirname from './utils.js';

const PUB_KEY = fs.readFileSync(__dirname + '/pub_key.pem', 'utf-8');
const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem', 'utf-8');

const payloadObj = {
  sub: '1234567890',
  name: 'John Doe',
  admin: true,
  iat: 1516239022,
};

const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { algorithm: 'RS256' });

console.log(signedJWT);

jwt.verify(signedJWT, PUB_KEY, { algorithms: ['RS256'] }, (err, payload) => {
  console.log(payload);
});
