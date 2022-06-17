import Cookies from 'js-cookie';
const setCookie = (cookieName,data)=>{
  return  Cookies.set('userIn',JSON.stringify(data),{
        expires:1,
        sameSite:'strict',
        secure:true,
        path:'/'
    })
}
const getCookie = (cookiename)=>{
    return Cookies.get( cookiename)
}

const removeCookie = (cookiename)=>{
    return Cookies.remove(cookiename)
}
export default{setCookie,getCookie,removeCookie}