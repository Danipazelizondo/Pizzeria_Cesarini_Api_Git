import React from 'react';
import './navbar.css';
import { formatoPrecio } from "../../utils/formatoPrecio";
import logo from '../../assets/img/logoCesarini.jpeg';
import {Link, NavLink} from 'react-router-dom';
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";


const Navbar = () => {
const { cart, total } = useCart();
const totalProductos = cart.reduce((acc, item) => acc + item.count, 0);
const { token, logout } = useUser();
const validateRoot = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

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
							<NavLink to="/" className={validateRoot}>🏠Home</NavLink>
						</li>

							{token ? (
							<>
								<li className="nav-item">
									<NavLink to="#Profile" className={validateRoot}>🔓Profile</NavLink>
								</li>
								<li className="nav-item">
									<button className="nav-link btn btn-link text-decoration-none" onClick={logout}>
										🔒Logout
									</button>
								</li>
							</>

							) : (								
							<>
								<li className="nav-item">
									<NavLink to="/Login" className={validateRoot}>🔐Login</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/Register" className={validateRoot}>🔐Register</NavLink>
								</li>
							</>							
							)}							
							
						<li className="nav-item">
							<Link to="/Cart" className="nav-link position-relative">
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