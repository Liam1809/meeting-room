import express from 'express';

// import controller
import {
  getRooms,
  createRoom,
  updateRoom,
  updateInvitedEmail,
  deleteRoom,
} from '../controllers/room.js';

// import authentication
import auth from '../middlewares/auth.js';

// create router
const router = express.Router();

router.get('/', getRooms);
router.post('/', auth, createRoom);
router.patch('/:id', auth, updateRoom);
router.patch('/:id/invitedEmail', auth, updateInvitedEmail);
router.delete('/:id', auth, deleteRoom);
export default router;
