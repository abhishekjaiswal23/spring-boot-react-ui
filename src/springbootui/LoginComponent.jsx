
import React, { Component } from "react";

import AuthenticationService from './AuthenticationService.js'

///Users/abhishekjaiswal/Documents/Java-react-fullstack-workspace/spring-boot-react-ui/src/authentication

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            isSuccess: false,
            isFailed: false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onClickedLogin = this.onClickedLogin.bind(this)
    }

    // handleUsernameChange(event){
    //     console.log(event.target.value)
    //     this.setState({
    //         username:event.target.value
    //     })
    // }

    // handlePasswordChange(event){
    //     console.log(event.target.value)
    //     this.setState({
    //         password:event.target.value
    //     })

    // }

    handleChange(event) {
        console.log(this.state)
        this.setState({
            [event.target.name]: event.target.value
        })

    }


    onClickedLogin() {

        // if (this.state.username === 'abc' && this.state.password === 'abc') {
        //     AuthenticationService.registeredSuccessLogin(this.state.username,this.state.password)
        //     this.props.navigate(`/welcome/${this.state.username}`)
        //     //  this.setState({ isSuccess: true })
        //     //this.setState({ isFailed: false })
        //     console.log("success...")
        // } else {
        //     this.setState({ isSuccess: false })
        //     this.setState({ isFailed: true })
        //     console.log("failed...")

        // }

        // AuthenticationService.executeBasicAuthenticationService(this.state.username,this.state.password)
        // .then( () => {
        //     AuthenticationService.registeredSuccessLogin(this.state.username,this.state.password)
        //     this.props.navigate(`/welcome/${this.state.username}`)
        // })
        // .catch( () => {
        //     this.setState({ isSuccess: false })
        //     this.setState({ isFailed: true })
        // })


        AuthenticationService.executeJwtAuthenticationService(this.state.username,this.state.password)
        .then( (response) => {
            AuthenticationService.registeredSuccessLoginForJwt(this.state.username,response.data.token)
            this.props.navigate(`/welcome/${this.state.username}`)
        })
        .catch( () => {
            this.setState({ isSuccess: false })
            this.setState({ isFailed: true })
        })

    }


    render() {
        return (
            <div className="LoginComponent">

                <h1>Login </h1>
                <div className="container">
                    {/* <ShowInvalidCredentails isFailedCred = {this.state.isFailed}/>
                <ShowSuccessCredentials isSuccessCred = {this.state.isSuccess}/> */}

                    {this.state.isFailed && <div className="alert alert-warning" role="alert"> Invalid Credentails </div>}
                    {this.state.isSuccess && <div className="alert alert-success" role="alert"> Login Successfull, Welcome !!! you are growing abhishek....</div>}

                    Username <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /> <br></br>
                    Password <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /> <br></br>
                    <button className="btn btn-success" onClick={this.onClickedLogin}>Login</button>
                </div>
            </div>
        )
    }
}

// function ShowInvalidCredentails(props){
//         if(props.isFailedCred){
//                 return <div> Invalid Credentails </div>
//         }
//         return null 
// }


// function ShowSuccessCredentials(props){
//         if(props.isSuccessCred){
//             return <div> Login Successfull, Welcome !!! you are growing abhishek....</div>
//         }
//         return null 
// }

export default LoginComponent