import express, { Request, Response, Application } from 'express';
const signupRoute = express.Router();
signupRoute.post("/register", async (req, res) => {
    try {
console.log(req.body);
      res.send("saved");
    } catch (err){
      res.status(500).send(err);
    }
  });

// loginRoute.get("/", (req:Request, res:Response): void=>{
// res.send("sup")

// })
export default signupRoute;