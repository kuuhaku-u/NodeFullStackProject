import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import Question from '../../models/questions';
import Tags from '../../models/tags';
const QuestionRoute = express.Router();
QuestionRoute.post('/question', async (req: Request, res: Response) => {
	interface dataQ {
		question: string;
		tags: unknown;
		userID: Types.ObjectId;
	}
	const { question, tags, userID } = req.body;
	const data: dataQ = { question: question, tags: tags, userID: userID };
	const addQuestoin = new Question(data);
	try {
		await addQuestoin.save();
		const idOfQuestion = addQuestoin._id;
		const questTags = req.body.tags;
		console.log(idOfQuestion, questTags);
		// const Userquery = { _id: req.body.userID };
		// const UserupdateDocument = { $push: { qurstionID: idOfQuestion } };
		// await Users.updateOne(Userquery, UserupdateDocument);
		questTags.forEach(async (element: unknown) => {
			const checking = await Tags.findOne({ tag: element });
			console.log(checking);
			if (checking) {
				const query = { tag: element };
				const updateDocument = { $push: { qurstionID: idOfQuestion } };
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
});
QuestionRoute.get('/question', async (req: Request, res: Response) => {
	const allQuestoin: unknown = await Question.find({});
	try {
		res.send(allQuestoin);
	} catch (err) {
		res.status(500).send(err);
	}
});
QuestionRoute.get('/question/:id', async (req: Request, res: Response) => {
	const questionID = req.params.id;
	const foundedQuestoin: unknown = await Question.find({ _id: questionID });
	try {
		res.send(foundedQuestoin);
	} catch (err) {
		res.status(500).send(err);
	}
});
export default QuestionRoute;
