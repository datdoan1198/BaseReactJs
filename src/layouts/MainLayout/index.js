import React from 'react';
import './styles.scss'

const MainLayout = (props) => {
	return (
		<div>
			<header>
				<div>Header</div>
			</header>
			<main>
				{props.children}
			</main>

			<footer>
				<div>Footer</div>
			</footer>
		</div>
	);
}

export default MainLayout
