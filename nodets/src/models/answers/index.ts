import mongoose from "mongoose";
import { Schema, model, Types } from "mongoose";
interface Ians {
  answerDescription: string;
  questionID: Types.ObjectId;
  userID: Types.ObjectId;
}
const answerSchema = new Schema<Ians>({
  answerDescription: {
    type: String,
    required: true,
  },
  questionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
const Answer = mongoose.model("answer", answerSchema);
export default Answer;
