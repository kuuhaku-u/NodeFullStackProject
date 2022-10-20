import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import Signup from '../../models/signup';
const loginRoute = express.Router();
loginRoute.post('/login', async (req: Request, res: Response) => {
	const { firstName, passWord } = req.body;
	const loggedinUser: any = await Signup.findOne({ firstName: firstName });
	const loggedInUserID: Types.ObjectId = await loggedinUser?._id;
	console.log(loggedInUserID);
	const isLoggedIn = await bcrypt.compare(passWord, loggedinUser.passWord);
	try {
		if (isLoggedIn) {
			res.send({ msg: 'logoed in', code: 200, userID: loggedInUserID });
		} else {
			res.send({ msg: 'not found', code: 500 });
		}
	} catch (err) {
		res.status(500).send('user not found');
	}
});
export default loginRoute;
