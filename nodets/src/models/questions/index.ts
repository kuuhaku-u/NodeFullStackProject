import mongoose from "mongoose";
import { Schema, model } from 'mongoose';


interface Iques  {
    title: string;
    tags: any;
}

const questionSchema = new  Schema <Iques>({
  title: {
    type: String,
    required: true,
  },

  tags: {
    type: Array,
    default: [],
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question