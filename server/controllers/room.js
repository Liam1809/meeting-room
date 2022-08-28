import mongoose from 'mongoose';

// import Room model
import Room from '../models/room.js';

// GET ALL ROOMS
export const getRooms = async (req, res) => {
  try {
    const ROOMS = await Room.find();

    res.status(200).json(ROOMS);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE NEW ROOM
export const createRoom = async (req, res) => {
  try {
    // retrieve from front-end
    const { roomName, capacity } = req.body;

    // create new room with given data
    const newRoom = new Room({
      roomName,
      capacity,
      roomID: req.userID,
      creator: req.userName,
      createdAt: new Date().toISOString(),
    });

    // save to DB
    await newRoom.save();

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// UPDATE CURRENT ROOM
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomName, capacity, invitedEmail } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'NO DATA FOUND WITH THE ID' });

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        roomName: roomName,
        capacity: capacity,
        invitedEmail: invitedEmail,
      },
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// DELETE CURRENT ROOM
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'NO DATA FOUND WITH THE ID' });

    await Room.findByIdAndDelete(id);

    res.status(204).json({ message: 'DELETED SUCCESSFULLY' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// UPDATE INVITED PEOPLE OF CURRENT ROOM
export const updateInvitedEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { guest_Email } = req.body;

    if (!req.userID)
      return res.status(404).json({ message: 'UNAUTHOURIZED USERS' });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'NO DATA FOUND WITH THE ID' });

    const room = await Room.findById(id);

    const index = room.invitedEmail.findIndex(
      element => element === guest_Email
    );

    if (index === -1) {
      room.invitedEmail.push(guest_Email);
    } else {
      return res.status(404).json({ message: 'EMAIL ALREADY INVITED' });
    }

    const updatedRoom = await Room.findByIdAndUpdate(id, room, { new: true });

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
