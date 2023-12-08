import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserModel = mongoose.models.users || mongoose.model('users', userSchema);

export default UserModel;
