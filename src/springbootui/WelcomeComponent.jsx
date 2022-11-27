
import { Component } from "react"
import { Link } from "react-router-dom"
import HelloWoldService from '../api/todo/HelloWorldService.js'


class WelcomeComponent extends Component {
    constructor(prop){
        super(prop)

        this.state = {
            welcomeMessage : '',
            statusCall : '' 
        }

        this.getWelcomeMessageFromJava = this.getWelcomeMessageFromJava.bind(this);
        this.displayWelcomeMessage = this.displayWelcomeMessage.bind(this);
        this.handleExceptionMessage = this.handleExceptionMessage.bind(this);

    }
    
    render() {



        return (
            <>
                    <h1>Welcome to todos app</h1>
                    <div className="WelcomeComponent">{this.props.params.name}, You can manage your todos <Link to="/todos">here</Link></div>

                    <div className="container">{this.props.params.name}, 
                    click on button to talk to java back end API 
                        <button className="btn btn-success" onClick={this.getWelcomeMessageFromJava}>Get Welcome Message</button>
                    </div>
                    <div className="container">
                            {this.state.welcomeMessage}
                             {this.state.statusCall} 
                    </div>


            </>
        )
    }

    getWelcomeMessageFromJava(){

        HelloWoldService.executeHelloService()
        .then(response => this.displayWelcomeMessage(response))
       //.then(response => console.log(response))
        .catch( error => this.handleExceptionMessage(error))

    }

    displayWelcomeMessage(response){
        this.setState({
            welcomeMessage : response.data.str,
            statusCall : response.status
        })
    }

    // handleExceptionMessage(error){
    //     console.log(error.response)
    // }

   //  executeExceptionHandle
   handleExceptionMessage(error) {

    console.log(error.response)

    let errorMessage = '';

    if (error.message)
        errorMessage += error.message

    if (error.response && error.response.data) {
        errorMessage += error.response.data.message
    }

    this.setState({ welcomeMessage: errorMessage })
}


}

export default WelcomeComponent

