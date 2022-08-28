import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = async (req, res, next) => {
  try {
    // check token
    // console.log("The current token \n", req.headers);
    // split token from authorization
    const token = req.headers.authorization.split(' ')[1];

    let decodedData;
    //verify and assign decoded id to userId
    // if isCustomUser
    if (token) {
      // verify token with secret text and assign data to decodedData
      decodedData = jwt.verify(token, process.env.KEY_TOKEN);
      // add decoded's id to userId of req object
      req.userID = decodedData?.id;
      req.userName = decodedData?.name;
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default auth;
