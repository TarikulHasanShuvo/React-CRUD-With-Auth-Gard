import React, {Component} from "react";
import ApiService from "../../services/apiService";
import {toast, ToastContainer} from "react-toastify";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email      : "",
            password   : "",
        };
    }


    onChangehandler = (e) => {
        let name   = e.target.name;
        let value  = e.target.value;
        let data   = {};
        data[name] = value;
        this.setState(data);
    };

    onSignInHandler = (e) => {
        e.preventDefault()
        ApiService.post(`/login`,{
            email   : this.state.email,
            password: this.state.password,
        }).then((response) => {
            if (response.status === 200) {
                toast.success(`Success Notification !  Login successfully`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                localStorage.setItem("accessToken", response.data.access_token);
                localStorage.setItem("userData", JSON.stringify(response.data.user));
                this.props.history.push("/home");
            }
            })
            .catch((error) => {
                toast.error(`Error Notification ! ${error}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    };

    render() {
        const login = localStorage.getItem("accessToken");
        if (login) {
           window.location = "/home";
        }
        return (
            <div>
                <form className="containers text-start">
                    <div className="mt-5 mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                               name="email"
                               value={this.state.email}
                               onChange={this.onChangehandler}
                               id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password"
                               name="password"
                               placeholder="Enter password"
                               value={this.state.password}
                               onChange={this.onChangehandler}
                               className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button onClick={this.onSignInHandler} className="btn btn-success mb-4"> Sign In</button>
                </form>
                <ToastContainer />
            </div>
        );
    }
}