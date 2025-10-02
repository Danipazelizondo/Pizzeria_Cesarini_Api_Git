import React from 'react';
import './navbar.css';
import { formatoPrecio } from "../../utils/formatoPrecio";
import logo from '../../assets/img/logoCesarini.jpeg';
import {Link} from 'react-router-dom';
import { useCart } from "../../context/CartContext";



const Navbar = () => {
const { cart, total } = useCart();
const totalProductos = cart.reduce((acc, item) => acc + item.count, 0);
const token = false;
	
	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-dark" style={{ backgroundColor: "#000000ff" }}>
			<div className="container-fluid">
				<Link to="/">
					<img src={logo} alt="Logo" style={{ width: "50px"}}/>
				</Link>
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
							<Link className="nav-link" to="/">
								🏠Home
							</Link>
						</li>

							{token ? (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="#Profile">
										🔓Profile
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="#Logout">
										🔒Logout
									</Link>
								</li>
							</>

							) : (								
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/Login">
										🔐Login
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to='/Register'>
										🔐Register
									</Link>
								</li>
							</>							
							)}							
							
							<li className="nav-item">
								<Link className="nav-link position-relative" to='/Cart'>
								🛒 {totalProductos} {totalProductos === 1 ? "producto" : "productos"} - {formatoPrecio(total)}
								</Link>
							</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;