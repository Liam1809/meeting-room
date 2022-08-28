import {
  FETCH,
  CREATE,
  UPDATE,
  DELETE,
  UPDATEDEMAIL,
} from '../constants/Types';

const room = (Room = [], action) => {
  switch (action.type) {
    case FETCH:
      return action.payload;
    case CREATE:
      return [...Room, action.payload];
    case UPDATE:
    case UPDATEDEMAIL:
      return Room.map(theRoom =>
        theRoom._id === action.payload._id ? action.payload : theRoom
      );
    case DELETE:
      return Room.filter(theRoom => theRoom._id !== action.payload);

    default:
      return Room;
  }
};

export default room;
