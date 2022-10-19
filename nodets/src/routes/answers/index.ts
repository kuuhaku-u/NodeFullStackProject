import express, { Request, Response } from "express";
import { Types } from "mongoose";
import Answer from "../../models/answers";
const AnswerRoute = express.Router();
AnswerRoute.post("/answer", async (req: Request, res: Response) => {
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

// const ansRoute = express.Router();
// //Answers
// ansRoute.post("/add_ans/:id", async (req, res) => {
//   const ans = new Answers(req.body);
//   const questoinID = req.params.id;
//   ans.queId = questoinID;
//   try {
//     await ans.save();
//     res.send(ans);
//     return ans;
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
// ansRoute.get("/ans", async (req, res) => {
//   const answer = await Answers.find({});
//   try {
//     res.status(200).send(answer);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
// //Particular Questin Answer
// //All Answer
// ansRoute.get("/q1/ans/:id", async (req, res) => {
//   const id = req.params.id;
//   //   const query =
//   const answer = await Answers.find({ queId: id });
//   try {
//     console.log("question", answer);
//     res.status(200).send(answer);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// //Only 1 Answer
// ansRoute.get("/:id/:Aid", async (req, res) => {
//   const id = req.params.id;
//   const Aid = req.params.Aid;
//   console.log("Answer", id, "uihjsfbghv", Aid);
//   const answer = await Answers.find({ queId: id, _id: Aid });
//   try {
//     res.status(200).send(answer);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// module.exports = ansRoute;
