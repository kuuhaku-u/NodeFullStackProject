import React from 'react'
import axios from "axios"
import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
interface values {
    firstName: string;
    passWord: string;
}
// const initialVal:<Values>={}
const URL: string = " http://localhost:8000/login"
const Login: NextPage = () => {
    const router = useRouter()
    const postFun = async (val: values): Promise<void> => {
        const payload: values = {
            firstName: val.firstName,
            passWord: val.passWord
        }
        const res = await axios.post(URL, payload)
        if (res.data.code == 500) {
            router.push('/signup')
        } else {
            router.push('/dashboard ')
        }



    }
    return (
        <>
            <h3>
                Login
            </h3>
            <Formik
                initialValues={{
                    firstName: "",
                    passWord: ""
                }}
                onSubmit={(val: values): void => {
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
                    <button type="submit">Log in</button>
                </Form>
            </Formik>
        </>
    )
}

export default Login