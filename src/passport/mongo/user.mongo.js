import User from './models/user.model.js';

export default class UserMongo {
  getUsers = async () => User.find();
  getUserById = async (id) => User.findById(id);
  getUserByEmail = async (email) => User.findOne({ email: email });
  createUser = async (user) => User.create({ ...user });
}
