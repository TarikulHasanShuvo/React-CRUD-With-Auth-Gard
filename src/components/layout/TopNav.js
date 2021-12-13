import React from "react";
import {Link, NavLink} from "react-router-dom";


class TopNav extends React.Component {
    state = {
        navigate: false,
    };

    render() {
        let user = JSON.parse(localStorage.getItem("userData"));

        let rightContent;

        if (user == null) {
            rightContent = <NavLink to='/signup' className="btn btn-outline-primary btn-sm" >Signup</NavLink>;
        } else {
            rightContent = <><h5 className="me-4">Welcome , {user.name}</h5>
                <button onClick={this.props.onLogoutHandler}
                        className="btn btn-outline-danger btn-sm">Logout
                </button></>;
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/home">React App</Link>
                        <Link className="nav-link" to="/about">About</Link>
                        <Link className="nav-link" to="/contact">Contact</Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="ms-auto d-flex">
                                {rightContent}
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default (TopNav);