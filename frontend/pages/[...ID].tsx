import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { Typography, Button, Modal } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
const ParticularQuestion = (props: { questionData: any[] }) => {
  const router = useRouter();
  const { ID }: string | string[] | any = router.query;
  const [show, setShow] = useState<boolean>(false);
  const handleShow = (): void => {
    setShow((prv: boolean): boolean => !prv);
  };
  const URL: string = "http://localhost:8000/answer";
  const postFunction = async (val: { answer: string }): Promise<void> => {
    if (typeof window !== "undefined") {
      const userID: any = localStorage.getItem("userId");
      const res = await axios.post(URL, {
        answerDescription: val.answer,
        userID: userID,
        questionID: ID[1],
      });
    }
  };
  const render = props.questionData.map((ele) => (
    <Fragment key={ele._id}>
      <Typography>{ele.question}</Typography>
    </Fragment>
  ));
  return (
    <>
      <div>ParticularQuestion</div>
      {render}
      <Button onClick={handleShow}>Answer it</Button>
      {show && (
        <>
          <Modal
            style={{ backgroundColor: "red" }}
            open
            onClose={handleShow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Formik
              initialValues={{
                answer: "",
              }}
              onSubmit={async (val): Promise<void> => {
                await postFunction(val);
                // console.log(val);
              }}
              render={(props: any) => (
                <>
                  <Form>
                    <Field name="answer" />
                    <button type="submit">Submit</button>
                  </Form>
                </>
              )}
            />
          </Modal>
        </>
      )}
    </>
  );
};
export async function getServerSideProps(ctx: { query: { ID: any } }) {
  const id = ctx.query.ID[1];
  const res = await axios.get(`http://localhost:8000/question/${id}`);
  const questionData: any = res.data;
  return {
    props: { questionData },
  };
}
export default ParticularQuestion;
