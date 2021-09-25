import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const COOKIE_NAME = "token"
const DEFAULT_RESPONSE = {
    "is_success": true,
    "msg": ""
}
export async function CreateUser(username, password) {
    let response = DEFAULT_RESPONSE
    await axios.post('/users', { username, password })
        .then(function (res) {
            // handle success
            response.is_success = true
            response.msg = res.data
        })
        .catch(function (error) {
            // handle error
            response.is_success = false
            response.msg = error.response.data 
        })
    return response
}

export async function UserLogin(username, password) {
    let response = DEFAULT_RESPONSE
    await axios.post('/login/oauth', { username, password })
        .then(function (res) {
            // handle success
            response.is_success = true
            response.msg = res.data
            if(res.data.token){
                SetBrowserCookie(username, res.data.token)
            }
        })
        .catch(function (error) {
            // handle error
            response.is_success = false
            response.msg = error.response.data
        })
    return response
}

export function GetBrowserCookie(){
    let username = cookies.get("username")
    let token = cookies.get("token")
    return { username, token }
}

export function SetBrowserCookie(username, token){
    cookies.set("username", username)
    cookies.set("token", token)
}
export function ClearBowserCookie(){
    cookies.remove("username")
    cookies.remove("token")
}
export async function GetTokenByUsername(username) {
    let response = DEFAULT_RESPONSE
    await axios.get(`/login/oauth?username=${username}`)
        .then(function (res) {
            // handle success
            response.is_success = true
            response.msg = res.data
        })
        .catch(function (error) {
            // handle error
            response.is_success = false
            response.msg = error.response.data
        })
    return response
}

