// import express, { Request, Response } from "express";
// import { Types } from "mongoose";
// import Question from "../../models/questions";
// import Tags from "../../models/tags";Tags
// const tagRoute = express.Router();
// tagRoute.get("/user/:id", async (req: Request, res: Response) => {
// console.log("p");

//   const userID = req.params.id;
//   const currentUser = await Tags.findOne({ _id: userID });
//   try {
//     res.send(currentUser);
//   } catch (err) {
//     res.status(500).send("Not Found");
//   }
// });





// tagRoute.get("/tag/:tagName/:idTag", async (req, res) => {
//   const id = req.params.idTag;
//   const tagName = req.params.tagName;

//   try {
//     const tagToFind = await Tags.find({ _Id: id, tag: tagName });
//     const allQuestion:Array<Types.ObjectId> = [];
//     const lengthOfQIcd = tagToFind[0].QIcd.length;
//     tagToFind[0].QIcd.forEach(async (element) => {
//       const all = await Questions.findById({ _id: element });
//       allQuestion.push(all)
//       allQuestion.length == lengthOfQIcd && res.status(200).send(allQuestion);
//     });
// } catch (error) {
//     res.status(500).send(error);
// }
// });

// export default tagRoute;
