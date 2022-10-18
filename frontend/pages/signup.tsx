import React from 'react'
import axios from "axios"
import type { NextPage } from 'next'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router';
interface values {
    firstName: string;
    passWord: string;
}
const URL: string = " http://localhost:8000/register"
const Signup: NextPage = () => {

const router=useRouter()

    const postFun =async (val: values): Promise<void> => {
        const payload: values = {
            firstName: val.firstName,
            passWord: val.passWord
        }
        const res = await axios.post(URL, payload)
router.push("/dashboard")
    }
    return (
        <Formik
            initialValues={{
                firstName: "",
                passWord: ""
            }}
            onSubmit={(val: values):void => {
                postFun(val)
            }}
        >
            <Form>
                <Field
                    name="firstName"
                />
                <Field
                    name="passWord"
                />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}
export default Signup