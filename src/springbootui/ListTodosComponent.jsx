import { Component } from "react"
import AuthenticationService from './AuthenticationService.js'
import TodoDataService from '../api/todo/TodoDataService.js'
import moment from "moment/moment.js"


class ListTodosComponent extends Component {
    constructor(props) {
        //console.log('from constructor')
        super(props)
        this.state = {
            todos: [],
            deleteSuccessMessage: null
        }

        this.deleteTodo = this.deleteTodo.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.createTodo = this.createTodo.bind(this);
    }

    render() {
        //console.log('from render')
        return (

            <div className="ListTodosComponent">

                <h1>List todos...</h1>
                {this.state.deleteSuccessMessage && <div className="alert alert-success">{this.state.deleteSuccessMessage}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Done</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodo(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodo(todo.id)}>Delete</button></td>
                                        </tr>
                                )

                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.createTodo}> Add </button>
                    </div>
                </div>
            </div>

        )
    }

    componentDidMount() {
        //console.log('from componentDidMount')
        this.refreshTodos();
    }

    refreshTodos() {
        let user = AuthenticationService.getLoggedInUsername();
        TodoDataService.executeTodoAllListService(user)
            .then(response => {

                console.log(response)
                this.setState({
                    todos: response.data
                })

            })
    }

    deleteTodo(id) {

        let user = AuthenticationService.getLoggedInUsername();
        console.log(id + " " + user);
        TodoDataService.deleteTodoService(user, id)
            .then(response => {
                this.setState({ deleteSuccessMessage: `Delete of todo ${id} Successfull.` })
                this.refreshTodos();
            })


    }

    updateTodo(id) {
            this.props.navigate(`/todos/${id}`)

    }

    createTodo(){
        this.props.navigate(`/todos/-1`)
    }

    // componentWillUnmount(){
    //     console.log('from componentWillUnmount')
    // }

    // shouldComponentUpdate(nextProps,nextState){
    //     console.log('from shouldComponentUpdate')
    //     console.log(nextProps)
    //     console.log(nextState)
    //     return true
    // }

}

export default ListTodosComponent