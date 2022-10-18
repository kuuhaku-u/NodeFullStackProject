import express, {Request,Response,Application} from 'express';
import cors from 'cors'
 import signupRoute from './routes/signup/signup';



const app:Application = express();
app.use(express.json());
app.use(cors())
const PORT =  8000;

app.use('/', signupRoute)
// app.get('/',  (req:Request, res:Response):void=> {
// res.send("ok")
// })

app.listen(PORT, ():void => {
    console.log(`Server Running here  http://localhost:${PORT}`);
  });