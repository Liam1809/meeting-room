import axios from 'axios';
import { CONNECTION_URL, LOCALHOST } from '../constants/Types';

const API = axios.create({
  baseURL: CONNECTION_URL || LOCALHOST,
});

// send token back to server to verify authentication
API.interceptors.request.use(req => {
  if (localStorage.getItem('userProfile'))
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userProfile')).data.token
    }`;

  return req;
});

// ADMIN SIGN IN
export const signIn = formData => API.post('/user/signin', formData);

// CRUD ROOM
export const fetchRooms = () => API.get('/room');
export const createRoom = newRoom => API.post('/room', newRoom);
export const updateRoom = (id, updatedRoom) =>
  API.patch(`/room/${id}`, updatedRoom);
export const deleteRoom = id => API.delete(`/room/${id}`);
export const updateInvitedEmail = (id, guestEmail) =>
  API.patch(`/room/${id}/invitedEmail`, guestEmail);
