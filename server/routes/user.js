import express from 'express';

// create router
const router = express.Router();
// import controller
import { signIn } from '../controllers/user.js';

router.post('/signin', signIn);

export default router;
