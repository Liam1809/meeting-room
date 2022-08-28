import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
  roomName: { type: String, required: true },
  roomID: { type: String },
  invitedEmail: { type: [String], default: [] },
  capacity: { type: String },
  creator: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('Room', roomSchema);
