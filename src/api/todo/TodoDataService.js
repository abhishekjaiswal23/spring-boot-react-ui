import axios from "axios";

import {API_URL} from '../../springbootui/Constants.js'

class TodoDataService{


    executeTodoAllListService(name){

        return axios.get(`${API_URL}/users/${name}/todos`);
    }

    executeTodoService(name, id){

        return axios.get(`${API_URL}/users/${name}/todos/${id}`);
    }

    deleteTodoService(name, id){

        return axios.delete(`${API_URL}/users/${name}/todos/${id}`);
    }

    updateTodoService(name, id, todo){

        return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo);
    }

    createTodoService(name, todo){

        return axios.post(`${API_URL}/users/${name}/todos`, todo);
    }

}

export default new TodoDataService()