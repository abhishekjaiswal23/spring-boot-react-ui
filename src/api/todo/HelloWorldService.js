import axios from "axios"


class HelloWoldService{

    executeHelloService(){

        console.log("calling from js service class...")
        return axios.get('http://localhost:8080/api/sample-string');
    }

    executeExceptionHandle(){
        return axios.get('http://localhost:8080/api/sample-string-exception');
    }

}

export default new HelloWoldService()