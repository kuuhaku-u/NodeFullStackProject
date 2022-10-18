//Add Types Later


import { useState } from "react";
import type { NextPage } from "next";
import { Modal } from "@mui/material";
import { Field, Form, Formik, FieldArray } from "formik";
const Quesions: NextPage = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = (): void => {
    setShow((prv: boolean): boolean => !prv);
  };

const postFunction=async(val:any):Promise<void>=>{
console.log(val.tag, val.question);

}

  return (
    <>
      <div>Quesions</div>
      <h2 onClick={handleShow}>Add Ques</h2>
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
                question: "",
                tags: [""],
              }}
              onSubmit={async(val) => {
await postFunction(val)


            }}
              render={(props: any) => (
                <>
                  <Form>
                    <Field name="question" />
                    <FieldArray
                      name="tags"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.tags &&
                            props.values.tags.length &&
                            props.values.tags.map(
                              (tag: string, index: number) => (
                                <div key={index}>
                                  <Field name={`tag.${index}`} />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              )
                            )}
                        </div>
                      )}
                    />
                    <div>
                      <button type="submit">Submit</button>
                    </div>
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
export default Quesions;
