import express, { Request, Response } from "express";
import Question from "../../models/questions";
const QuestionRoute = express.Router();
QuestionRoute.post("/question", async (req: Request, res: Response) => {
  interface dataQ {
    question: string;
    tags: any;
  }
  const { question, tags } = req.body;
  const data: dataQ = { question: question, tags: tags };
  const addQuestoin = new Question(data);
  try {
    await addQuestoin.save();
    res.send(addQuestoin);
  } catch (err) {
    res.status(500).send(err);
  }
});
QuestionRoute.get("/question", async (req: Request, res: Response) => {
    const allQuestoin: any = await Question.find({});
    try {
      res.send(allQuestoin);
    } catch (err) {
      res.status(500).send(err);
    }
  });
export default QuestionRoute;
