import React from "react";
import {NavLink} from "react-router-dom";


class TopNav extends React.Component {
    state = {
        navigate: false,
    };

    render() {
        const user = JSON.parse(localStorage.getItem("userData"));
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/home">React App</NavLink>
                        <NavLink className="nav-link" to="/about">About</NavLink>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="ms-auto d-flex">
                                <h5 className="me-4">Welcome , {user.name}</h5>
                                <button onClick={this.props.onLogoutHandler}
                                        className="btn btn-outline-danger btn-sm">Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default (TopNav);