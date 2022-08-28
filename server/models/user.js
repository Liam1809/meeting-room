import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  userID: { type: String },
});

export default mongoose.model('User', userSchema);
