import React, { Component } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home";
import {BrowserRouter as Router, Route, NavLink, Switch, Redirect} from "react-router-dom";

export default class App extends Component {
    render() {
        let routes = (
            <Router>
                <Switch>
                    <div className="Tab">
                        <NavLink to="/sign-in" activeClassName="activeLink" className="signIn">
                            Sign In
                        </NavLink>
                        <NavLink exact to="/" activeClassName="activeLink" className="signUp">
                            Sign Up
                        </NavLink>
                    </div>
                    <Redirect to="/" />
                </Switch>
                <Route exact path="/" component={Signup}/>
                <Route path="/sign-in" component={Login}/>
            </Router>

        );
        const login = localStorage.getItem("accessToken");
        if (login) {
            routes = (
             <Router>
                 <Switch>
                     <Route path="/home" component={Home}/>
                     <Redirect to="/" />
                 </Switch>
             </Router>
            );
        }

        return (
            <div className="w-100 d-flex justify-content-center mt-5">
                <div className="App w-50">
                    {routes}
                </div>
            </div>

        );
    }
}