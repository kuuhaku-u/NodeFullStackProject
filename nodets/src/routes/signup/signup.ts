import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt'
const signupRoute = express.Router();
import signup from '../../models/signup/index'
signupRoute.post("/register", async (req: Request, res: Response) => {
    // const saltRounds:number = 10
    interface dataI {
        firstName: string,
        passWord: string
    }
    const salt = await bcrypt.genSalt(10);
    const { firstName, passWord } = req.body
    const secpassword = await bcrypt.hash(passWord, salt);
    const data: dataI = { firstName,passWord : secpassword }
    // now we set user password to hashed password
    const newUser = new signup(data);
    try {
        await newUser.save()
        res.send(newUser);
    } catch (err) {
        res.status(500).send(err);
    }
});
export default signupRoute;