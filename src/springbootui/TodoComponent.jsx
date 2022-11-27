import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment/moment";
import { Component } from "react";
import TodoDataService from '../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.params.id,
            description: "",
            targetDate: moment(new Date()).format('YYYY-MM-DD')

        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this)
    }

    componentDidMount(){
        let user = AuthenticationService.getLoggedInUsername();

        TodoDataService.executeTodoService(user, this.state.id)
        .then(response => {
            this.setState({
                description : response.data.description,
                targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
            })
        })
    }

    validateForm(values){
        let error = {}
       
            if(!values.description){
                error.description = 'Enter Description'
            }else if(values.description.length < 5){
                error.description = 'Enter atleast 5 character in Description'
            }

            if(!moment(values.targetDate).isValid){
                error.targetDate = 'Enter Valid target date.'
            }


        return error;
    }

    onSubmit(values){
        console.log("from submit")
        let user = AuthenticationService.getLoggedInUsername();
        
        let todo = {
            id : this.state.id,
            description : values.description,
            targetDate : values.targetDate
        }
        if(this.state.id === -1){
            TodoDataService.createTodoService(user, todo).then(() => {this.props.navigate('/todos')})
        }else{
            TodoDataService.updateTodoService(user, this.state.id, todo).then(() => {this.props.navigate('/todos')})
        }
        



    }

    render() {

        let {description,targetDate} = this.state;
        // let targetDate = this.state.targetDate;

        return (
            <div>
                <h1>Todo Page</h1>
                <div className="container">
                    <Formik
                        initialValues={{description, targetDate}}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit = {this.onSubmit}
                        validate = {this.validateForm}
                        enableReinitialize = {true}
                    >
                        {
                            (props) => (
                                <Form>
                                        <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                        <fieldset>
                                            <label >Descrption</label>
                                            <Field className="form-control" type="text" name="description" />
                                        </fieldset>
                                   
                                   
                                        <fieldset>
                                            <label>Target Date</label>
                                            <Field className="form-control" type="date" name="targetDate" />
                                        </fieldset>

                                        <button className="btn btn-success" type="submit">Save</button>
                                    
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>

        )
    }
}

export default TodoComponent