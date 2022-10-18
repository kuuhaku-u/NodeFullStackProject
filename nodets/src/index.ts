import express, {Request,Response,Application} from 'express';
import cors from 'cors'
import signupRoute from './routes/signup/signup';
import mongoose from 'mongoose';
import loginRoute from './routes/login/index';
import QuestionRoute from './routes/questions';
const app:Application = express();
const PORT =  8000;
app.use(cors())
app.use(express.json());


const url ='mongodb://localhost:27017/fullstack';

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(url, options).then(() => console.log("databse connected"));


app.use('/', signupRoute)
app.use('/', loginRoute)
app.use('/', QuestionRoute)

// app.get('/',  (req:Request, res:Response):void=> {
// res.send("ok")
// })

app.listen(PORT, () => {
    console.log(`Server Running here  http://localhost:${PORT}`);
  });