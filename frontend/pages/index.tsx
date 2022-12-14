import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
const Home: NextPage = () => {
	const router = useRouter();
	const go = () => {
		router.push('/login');
	};
	return (
		<div className={styles.container}>
			<button onClick={go}>GottoDashboard</button>
		</div>
	);
};
export default Home;
