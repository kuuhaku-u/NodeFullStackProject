import React from 'react'
import getSession from 'next-auth/next'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
const Dashboard: NextPage = () => {
    const router = useRouter()
    const handleQuestion = (): void => {
        router.push('/questions')
    }
    return (
        <>
            <h1 onClick={handleQuestion}>
                Questions
            </h1>
        </>
    )
}
export async function getServerSideProps(context: any) {
    const session = await getSession(context)
    console.log("sess", session);
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {}, // will be passed to the page component as props
    }
}
export default Dashboard