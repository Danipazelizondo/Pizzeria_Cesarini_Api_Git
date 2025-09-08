import React from 'react'
import './Header.css';

const Header = () => {
    return (
        <header className="header-bg container-fluid text-light text-end py-5 mt-3 mb-4 w-100">
            <div className="container-fluid header-content">
                <div className="ms-auto col-12 col-md-7">
                    <h1 className="hind-madurai-bold display-2 fw-bold my-1">
                        Pizzería Cesarini
                    </h1>
                    <p className="hind-madurai-semibold my-1">100% artesanal</p>
                </div>
            </div>
        </header>
    );
};

export default Header;