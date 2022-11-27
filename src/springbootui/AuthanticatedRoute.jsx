import { Component } from "react";
import { Navigate } from 'react-router-dom'
import AuthenticationService from "./AuthenticationService.js";

class AuthanticatedRoute extends Component{

    render(){
        if(AuthenticationService.isUserLoggedIn()){
              return {...this.props.children}
        }else{
           return <Navigate to="/login" />
        }
    }

}
export default AuthanticatedRoute
