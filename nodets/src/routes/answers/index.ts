import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import Answer from '../../models/answers';
const AnswerRoute = express.Router();
AnswerRoute.post('/answer', async (req: Request, res: Response) => {
  interface dataA {
    answerDescription: string;
    userID: Types.ObjectId;
    questionID: Types.ObjectId;
  }
  const { answerDescription, userID, questionID } = req.body;
  const data: dataA = {
    answerDescription: answerDescription,
    userID: userID,
    questionID: questionID,
  };
  const addAnswer = new Answer(data);
  console.log(data);
  try {
    await addAnswer.save();
    res.send(addAnswer);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default AnswerRoute;
