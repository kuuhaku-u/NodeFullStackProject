import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { Button } from '@mui/material';
const USerDetails: NextPage = (props) => {
	const [data, setData] = useState([]);
	const [show, setShow] = useState<boolean>(false);
	const getData = async (): Promise<void> => {
		const id = localStorage.getItem('userId');
		const res = await axios.get(`http://localhost:8000/user/${id}`);
		const userData: any = res.data;
		setData(userData);
	};
	useEffect(() => {
		getData();
	}, []);
	const handleAllQuestion = (): void => {};
	const render = [data]?.map((ele: any) => (
		<>
			{ele?.firstName}
			<Link href={`user/${ele?._id}`}>
				<Button>All Question</Button>
			</Link>
		</>
	));
	return (
		<>
			<div>USerDetails</div>
			{render}
		</>
	);
};
export default USerDetails;
