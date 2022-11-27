import { Component } from "react"
import { Link } from "react-router-dom"
import AuthenticationService from "./AuthenticationService.js"

class HeaderComponent extends Component {
    render() {

       
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

       // console.log('user check ' + isUserLoggedIn)

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="/login" className="navbar-brand">abhishekjaiswal.com</a></div>
                    <ul className="navbar-nav">
                        <li>
                            {isUserLoggedIn && <Link to="/welcome/" className="nav-link">Home</Link>}
                        </li>
                        <li>
                            {isUserLoggedIn && <Link to="/todos" className="nav-link">Todos</Link>}
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link to="/login" className="nav-link">Login</Link></li>}
                        {isUserLoggedIn && <li><Link to="/logout" onClick={AuthenticationService.logout} className="nav-link">Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }

}

export default HeaderComponent