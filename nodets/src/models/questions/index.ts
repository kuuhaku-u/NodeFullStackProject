import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';
interface Iques {
  question: string;
  tags: any;
  userID: Types.ObjectId;
  upvotes: number;
  downvotes: number;
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
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },

});
const Question = mongoose.model('Question', questionSchema);
export default Question;
