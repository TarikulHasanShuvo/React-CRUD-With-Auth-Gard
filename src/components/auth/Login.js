import React, {useState} from "react";
import ApiService from "../../services/apiService";
import {toast, ToastContainer} from "react-toastify";
import TopNav from "../layout/TopNav";
import {useHistory, useNavigate} from "react-router-dom";



const Login = (props) =>  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

   let onSignInHandler = (e) => {
        e.preventDefault()
        ApiService.post(`/login`, {
            email,
            password
        }).then((response) => {
            if (response.status === 200) {

                toast.success(`Success Notification !  Login successfully`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                localStorage.setItem("accessToken", response.data.access_token);
                localStorage.setItem("userData", JSON.stringify(response.data.user));
                // navigate("../home", { replace: true });
                window.location.href = '/home'
            }
        })
            .catch((error) => {
                toast.error(`Error Notification ! ${error}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    };


        return (
            <div className="container">
                <TopNav/>
                <form onSubmit={onSignInHandler} className="containers text-start">
                    <div className="mt-5 mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                               name="email"
                               value={email}
                               onChange={(e)=> setEmail(e.target.value)}
                               id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password"
                               name="password"
                               placeholder="Enter password"
                               value={password}
                               onChange={(e)=> setPassword(e.target.value)}
                               className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button type="submit" className="btn btn-success mb-4"> Sign In</button>
                </form>
                <ToastContainer/>
            </div>
        );
}

export default Login;