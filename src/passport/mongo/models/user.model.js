import mongoose from 'mongoose';

const User = mongoose.model('User',
  new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
  })
);

export default User;
