import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import Signup from '../../models/signup';
const loginRoute = express.Router();
interface dataI {
    firstName: string,
    passWord: string
}
loginRoute.post("/login", async (req: Request, res: Response) => {
    const { firstName, passWord } = req.body
    const loggedinUser: any = await Signup.findOne({ firstName: firstName });
    const isLoggedIn = await bcrypt.compare(passWord, loggedinUser.passWord)

    try {
if(isLoggedIn){
res.send({msg:"loogi=ed in", code:200})
}else{
res.send({msg:"not found", code:500})
}
    }
    catch (err) {
        res.status(500).send("user not found");
    }
});
export default loginRoute;