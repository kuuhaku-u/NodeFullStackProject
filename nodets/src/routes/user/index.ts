import express, { Request, Response } from "express";
import Question from "../../models/questions";
import Signup from "../../models/signup";
const userInfo = express.Router();
userInfo.get("/user/:id", async (req: Request, res: Response) => {
console.log("p");

  const userID = req.params.id;
  const currentUser = await Signup.findOne({ _id: userID });
  try {
    res.send(currentUser);
  } catch (err) {
    res.status(500).send("Not Found");
  }
});

userInfo.get("/allquestions/:id", async (req: Request, res: Response) => {
console.log("p");

  const userID = req.params.id;
  const allUserQuestions = await Question.find({ userID: userID });
  console.log(allUserQuestions);
  try {
    res.send(allUserQuestions);
  } catch (err) {
    res.status(500).send("Not Found");
  }
});
export default userInfo;
