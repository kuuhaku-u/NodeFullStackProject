import React, { Fragment } from 'react';
import axios from 'axios';
const UerQuestion = (props: { questionData: any[] }) => {
	const render = props.questionData?.map((ele) => (
		<Fragment key={ele._id}>
			{ele.question}
			<br />
		</Fragment>
	));
	return (
		<>
			<div>UerQuestion</div>
			{render}
		</>
	);
};
export async function getServerSideProps(ctx: { query: { ID: any } }) {
	const id = ctx.query.ID;
	const res = await axios.get(`http://localhost:8000/allquestions/${id[0]}`);
	const questionData: any = res.data;
	return {
		props: { questionData },
	};
}
export default UerQuestion;
