import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
  
    const logout = () => {
      localStorage.removeItem("user");
      navigate("/signup");
    };
  
    return (
        <div>
            <div className="nav">
                <img alt="logo" className='logo' src={logo}></img>
                {auth ? (
                    <ul className="nav-ul">
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Products</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth)?.name})</Link></li>
                    </ul>
                ) : (
                    <ul className="nav-ul nav-right">
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Nav;
