import './App.css';
import './bootstrap.css';
import LoginComponent from './springbootui/LoginComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Component } from 'react';
import WelcomeComponent from './springbootui/WelcomeComponent'
import withNavigation from './springbootui/WithNavigation'
import ErrorComponent from './springbootui/ErrorComponent';
import withParams from './springbootui/withParams';
import ListTodosComponent from './springbootui/ListTodosComponent';
import FooterComponent from './springbootui/FooterComponent';
import HeaderComponent from './springbootui/HeaderComponent';
import LogoutComponent from './springbootui/LogoutComponent';
import AuthanticatedRoute from './springbootui/AuthanticatedRoute';
import TodoComponent from './springbootui/TodoComponent';

class App extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);
    const WelcomeComponentWithParams = withParams(WelcomeComponent);
    const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
    const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent);
    const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));
    return (
      <div className="App">



        <Router>
          <HeaderComponentWithNavigation />
          <Routes>
            <Route path="/" exact element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponentWithNavigation />} />
            <Route path="/welcome/:name" element={
              <AuthanticatedRoute>
                <WelcomeComponentWithParams />
              </AuthanticatedRoute>
            } />
            <Route path="/todos/:id" element={
              <AuthanticatedRoute>
                <TodoComponentWithParamsAndNavigation/>
              </AuthanticatedRoute>
            }/>
            <Route path="/todos" element={
              <AuthanticatedRoute>
                <ListTodosComponentWithNavigation />
              </AuthanticatedRoute>
            } />
            <Route path="/logout" element={
              <AuthanticatedRoute>
                <LogoutComponent />
              </AuthanticatedRoute>
            } />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </Router>
      </div>
    )
    /// before react 6 we never use Rountes inside tag. after react 6 we are using  <Routes> tag before Route
    // before we use component in route tag after we are using element
  }
}



export default App;


