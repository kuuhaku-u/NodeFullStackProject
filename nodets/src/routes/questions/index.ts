import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import Question from '../../models/questions';
import Signup from '../../models/signup';
import Tags from '../../models/tags';
const QuestionRoute = express.Router();
QuestionRoute.post(
  '/question',
  async (req: Request, res: Response) => {
    interface dataQ {
      question: string;
      tags: unknown;
      userID: Types.ObjectId;
    }
    const { question, tags, userID } = req.body;
    const data: dataQ = {
      question: question,
      tags: tags,
      userID: userID,
    };
    const addQuestoin = new Question(data);
    try {
      await addQuestoin.save();
      const idOfQuestion = addQuestoin._id;
      const questTags = req.body.tags;
      questTags.forEach(async (element: unknown) => {
        const checking = await Tags.findOne({
          tag: element,
        });
        if (checking) {
          const query = { tag: element };
          const updateDocument = {
            $push: { qurstionID: idOfQuestion },
          };
          await Tags.updateOne(query, updateDocument);
          res.send(200);
        } else {
          Tags.create({
            tag: element,
            qurstionID: idOfQuestion,
          });
          res.status(200).send('saved');
        }
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
);
QuestionRoute.get(
  '/question',
  async (req: Request, res: Response) => {
    const allQuestoin: unknown = await Question.find({});
    try {
      res.send(allQuestoin);
    } catch (err) {
      res.status(500).send(err);
    }
  },
);
QuestionRoute.get(
  '/question/:id',
  async (req: Request, res: Response) => {
    const questionID = req.params.id;
    const foundedQuestoin: unknown = await Question.find({
      _id: questionID,
    });
    try {
      res.send(foundedQuestoin);
    } catch (err) {
      res.status(500).send(err);
    }
  },
);

QuestionRoute.post(
  '/upvote/:id',
  async (req: Request, res: Response) => {
    const questionID: Types.ObjectId | string =
      req.params.id;
    const { userId } = req.body;
    console.log(userId);

    try {
      const checking = await Question.findOne({
        _id: questionID,
      });
      const userToFound: any = await Signup.findOne({
        _id: userId,
      });
      if (checking) {
        let point: number = userToFound.userPoints + 1;
        //  point >= 0.5 && point=0.5
        const upvoteNumber: number = checking.upvotes + 1;
        const queryUp = { _id: questionID };
        const updateDocumentUp = { upvotes: upvoteNumber };

        const query = { _id: userId };
        const updateDocument = { userPoints: point };

        const f = await Question.updateOne(
          queryUp,
          updateDocumentUp,
        );

        await Signup.updateOne(query, updateDocument);

        res.send('200');
      } else {
        res.status(200).send('not found');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
);

QuestionRoute.post(
  '/downvote/:id',
  async (req: Request, res: Response) => {
    const questionID: Types.ObjectId | string =
      req.params.id;
    const { userId } = req.body;

    try {
      const checking:any = await Question.findOne({
        _id: questionID,
      });

      const userToFound: any = await Signup.findOne({
        _id: checking.userID,
      });

	  console.log(userToFound);


      if (checking) {
        //  point >= 0.5 && point=0.5
        let point: number = userToFound.userPoints - 0.5;
        const downvoteNumber: number =
          checking.downvotes + 1;
        const queryDown = { _id: questionID };
        const updateDocumentDown = {
          downvotes: downvoteNumber,
        };

        const query = { _id: userToFound._id };
        const updateDocument = { userPoints: point };

        const f = await Question.updateOne(
          queryDown,
          updateDocumentDown,
        );

        await Signup.updateOne(query, updateDocument);

        res.send('200');
      } else {
        console.log('pe');

        res.status(200).send('not found');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
);

export default QuestionRoute;
