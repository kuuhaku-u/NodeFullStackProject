import mongoose from "mongoose";
import { Schema, model, Types } from "mongoose";
interface Iques {
  question: string;
  tags: any;
  userID: Types.ObjectId;
}
const questionSchema = new Schema<Iques>({
  question: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  userID : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
const Question = mongoose.model("Question", questionSchema);
export default Question;
