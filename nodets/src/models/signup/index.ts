import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
interface IUser {
  firstName: string;
  passWord: string;
  userPoints:number
}
const signup = new Schema<IUser>({
  firstName: { type: String, required: true },
  passWord: { type: String, required: true },
  userPoints :{type:Number, default : 0}
});
const Signup = mongoose.model("user", signup);
export default Signup
