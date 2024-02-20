import {useNavigation } from 'react-router-dom'



function MainNavBar() {
	const { state } = useNavigation();
	return <>
		<nav className="navbar navbar-expand-lg shadow-sm bg-white sticky-top">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Toto</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">Home</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Story</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Map</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</>;
}

export default MainNavBar;
