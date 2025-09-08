import React from 'react';
import './navbar.css';
import { formatoPrecio } from "../../utils/formatoPrecio";
import logo from '../../assets/img/logoCesarini.jpeg';



const Navbar = () => {
const total = 25000;
const token = false;
	
	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-dark" style={{ backgroundColor: "#000000ff" }}>
			<div className="container-fluid">
				<a href="#">
					<img src={logo} alt="Logo" style={{ width: "50px"}}/>
				</a>
				<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav nav-list ms-auto mb-1 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link" href="#Home">
								🏠Home
								</a>
							</li>

							{token ? (
							<>
								<li className="nav-item">
									<a className="nav-link" href="#Profile">
										🔓Profile
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#Logout">
										🔒Logout
									</a>
								</li>
							</>

							) : (								
							<>
								<li className="nav-item">
									<a className="nav-link" href="#Login">
										🔐Login
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#Register">
										🔐Register
									</a>
								</li>
							</>							
							)}							
							
							<li className="nav-item">
								<a className="nav-link" href="#Total">
								🛒 Total: {formatoPrecio(total)}
								</a>
							</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;