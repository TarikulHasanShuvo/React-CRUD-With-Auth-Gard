import React, {Component} from "react";
import {Link} from "react-router-dom";
import ApiService from "../../services/apiService";
import { ToastContainer, toast } from 'react-toastify';

export default class Signup extends Component {
    userData;

    constructor(props) {
        super(props);
        this.state = {
            signupData: {
                name     : "",
                email    : "",
                password : "",
            },
        };
    }

    onChangehandler = (e, key) => {
        const {signupData}        = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({signupData});
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        ApiService.post(`/register`,this.state.signupData)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        signupData: {
                            name    : "",
                            email   : "",
                            password: "",
                        },
                    });

                    toast.success(`Success Notification !  Sign up successfully`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                  setTimeout(()=>{
                      this.props.history.push("/sign-in");
                  },1000)
                }
            }).catch((error) => {
                toast.error(`Error Notification ! ${error}`, {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    };

    render() {
        return (
            <div>
                <form className="containers text-start">
                    <div className="mt-5 mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name </label>
                        <input type="text" className="form-control" name="name"
                               placeholder="Enter name"
                               value={this.state.signupData.name}
                               onChange={this.onChangehandler}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email"
                               placeholder="Enter email"
                               value={this.state.signupData.email}
                               onChange={this.onChangehandler}
                               id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password"
                               name="password"
                               placeholder="Enter password"
                               value={this.state.signupData.password}
                               onChange={this.onChangehandler}
                               className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button onClick={this.onSubmitHandler} className="btn btn-warning mb-4">Sign Up</button><br/>
                    <Link to="/sign-in" className="text-white my-5">I'm already member</Link>
                </form>
                <ToastContainer />
            </div>
        );
    }
}