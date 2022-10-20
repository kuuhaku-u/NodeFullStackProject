//Add Types Later
//Remove anytype
import { Fragment, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Modal, Typography } from '@mui/material';
import { Field, Form, Formik, FieldArray } from 'formik';
import axios from 'axios';
const Quesions: NextPage = (props: any) => {
	const [show, setShow] = useState<boolean>(false);
	const handleShow = (): void => {
		setShow((prv: boolean): boolean => !prv);
	};
	const URL: string = 'http://localhost:8000/question';
	const postFunction = async (val: any): Promise<void> => {
		if (typeof window !== 'undefined') {
			const userID: any = localStorage.getItem('userId');
			const res = await axios.post(URL, {
				question: val.question,
				tags: val.tag,
				userID: userID,
			});
		}
	};
	const renderData = props.questionData.map(
		(ele: {
			_id: Key | null | undefined;
			question:
				| string
				| number
				| boolean
				| ReactElement<any, string | JSXElementConstructor<any>>
				| ReactFragment
				| ReactPortal
				| null
				| undefined;
		}) => (
			<>
				<Fragment key={ele._id}>
					<Typography>
						<Link href={`/question/${ele._id}`}>{ele.question}</Link>
					</Typography>
				</Fragment>
			</>
		),
	);
	return (
		<>
			<div>Quesions</div>
			<h2 onClick={handleShow}>Add Ques</h2>
			{renderData}
			{show && (
				<>
					<Modal
						style={{ backgroundColor: 'red' }}
						open
						onClose={handleShow}
						aria-labelledby='modal-modal-title'
						aria-describedby='modal-modal-description'>
						<Formik
							initialValues={{
								question: '',
								tags: [''],
							}}
							onSubmit={async (val) => {
								await postFunction(val);
							}}
							render={(props: any) => (
								<>
									<Form>
										<Field name='question' />
										<FieldArray
											name='tags'
											render={(arrayHelpers) => (
												<div>
													{props.values.tags &&
														props.values.tags.length &&
														props.values.tags.map((tag: string, index: number) => (
															<div key={index}>
																<Field name={`tag.${index}`} />
																<button type='button' onClick={() => arrayHelpers.remove(index)}>
																	-
																</button>
																<button type='button' onClick={() => arrayHelpers.insert(index, '')}>
																	+
																</button>
															</div>
														))}
												</div>
											)}
										/>
										<div>
											<button type='submit'>Submit</button>
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
export async function getServerSideProps() {
	const res = await axios.get('http://localhost:8000/question');
	console.log(res.data);
	const questionData: any = res.data;
	return {
		props: { questionData },
	};
}
export default Quesions;
