import { Types } from 'mongoose';
import Signup from '../models/signup';
const pointChecker = async (
  userID: Types.ObjectId,
): Promise<boolean> => {
  let idk: boolean = true;

  const user: any = await Signup.findOne({ _id: userID });

  console.log(user);


  user.userPoints  > 5 ? (idk = true) : (idk = false);

  return idk;
};

export default pointChecker;