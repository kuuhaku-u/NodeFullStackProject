import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

interface IUser  {
    firstName: string;
    passWord: string;
}

const signup =  new Schema<IUser>({
  firstName: { type: String, required: true },
  passWord: { type: String, required: true },

});
const Signup = mongoose.model("user", signup);
export default Signup
