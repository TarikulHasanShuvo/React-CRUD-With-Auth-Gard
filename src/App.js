import React from "react";
import 'react-toastify/dist/ReactToastify.css';
// import Login from "./components/auth/Login";
// import Signup from "./components/auth/Signup";
// import Home from "./components/pages/Home";
// import About from "./components/pages/About";
// import NoPageFound from "./components/pages/NotFound";
import routes from './router';
import { useRoutes } from 'react-router-dom';

function App() {
     const  isLoggedIn  = localStorage.getItem('accessToken');
    //const  isLoggedIn  = false;

    const routing = useRoutes(routes(isLoggedIn));

    return (
        <>
            {routing}
        </>
    );
}

// const App = () => (
//         <BrowserRouter>
//             <div className="w-100 d-flex justify-content-center mt-5">
//                 <div className="App w-50">
//                     {    getIsLoggedIn ? '':  <Switch>
//                         <div className="Tab">
//                             <NavLink to="/sign-in" activeClassName="activeLink" className="signIn">
//                                 Sign In
//                             </NavLink>
//                             <NavLink exact to="/" activeClassName="activeLink" className="signUp">
//                                 Sign Up
//                             </NavLink>
//                         </div>
//                     </Switch>  }
//                     <GuardProvider guards={[requireLogin]} error={NoPageFound}>
//                         <Switch>
//                             <GuardedRoute path="/sign-in" exact component={Login}/>
//                             <GuardedRoute path="/" exact component={Signup}/>
//                             <GuardedRoute path="/home" exact component={Home} meta={{auth: true}}/>
//                             <GuardedRoute path="/about" exact component={About} meta={{auth: true}}/>
//                             <GuardedRoute path="*" component={NoPageFound}/>
//                         </Switch>
//                     </GuardProvider>
//                 </div>
//             </div>
//         </BrowserRouter>
// );
export default App;
