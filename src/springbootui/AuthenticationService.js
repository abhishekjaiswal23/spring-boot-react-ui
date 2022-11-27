import axios from "axios"
import {API_URL} from '../springbootui/Constants.js'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authanticatedUser'

class AuthenticationService {


    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`, 
            {headers: {authorization: this.createBasicAuthToken(username,password)}})
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, 
            {
                username,
                password
            })
    }

    createBasicAuthToken(username,password) {
        return 'Basic ' +  window.btoa(username + ":" + password)
    }

    registeredSuccessLogin(username, password) {
      //  let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))

    }

    // registeredSuccessLoginForJwt

    registeredSuccessLoginForJwt(username, token) {
       
          sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
          this.setupAxiosInterceptors(this.createJwtToken(token))
  
      }


      // createJwtToken(token)

      createJwtToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }


    getLoggedInUsername() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                   config.headers.authorization = token
                }
                return config
            }
        )
    }

}

export default new AuthenticationService()
