import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Typography, Button , Modal } from "@mui/material";
import axios from "axios";
const ParticularQuestion = (props: { questionData: any[]; }) => {
  const router = useRouter();
  const { questionID }: string | string[] | any = router.query;

const handleAnswer=():void=>{
console.log("l");

}

  const render = props.questionData.map((ele) => (
    <Fragment key={ele._id}>
      <Typography>{ele.question}</Typography>
    </Fragment>
  ));
  return (
    <>
      <div>ParticularQuestion</div>
      {render}
<Button onClick={handleAnswer}>
Answer it
</Button>

    </>
  );
};
export async function getServerSideProps(ctx: { query: { ID: any } }) {
  const id = ctx.query.ID[1];
  console.log(id);
  const res = await axios.get(`http://localhost:8000/question/${id}`);
  const questionData: any = res.data;
  return {
    props: { questionData },
  };
}
export default ParticularQuestion;
