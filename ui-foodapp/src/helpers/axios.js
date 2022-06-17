import axios from 'axios';
import config from '../config';
//import Cookies from 'js-cookie'
import Cookie from './cookie'
const user = Cookie.getCookie('userIn')
function Header() {
    let header = {
        "content-Type": "application/json",
        Accept: "application/json,"
    }
    if (user) {
        header["x-access-token"] = JSON.parse(user).token
    }
    return header
}
function newHeader() {
    let header = {
        "content-Type": "multipart/form-data",
        Accept: "application/json,"
    }
    if (user) {
        header["x-access-token"] = JSON.parse(user).token
    }
    return header
}

function api() {
    let data = {
        baseURL: config.api.trim(),
        headers: Header(),
    };
    return axios.create(data);
}
function newApi (){
    let data = {
        baseURL: config.api.trim(),
        headers: newHeader(),
    };
    return axios.create(data);
 
}
export {api,newApi}