import httpRequest from "../utils/httpRequest";



export function login(){
    console.log('发起login请求')
    return httpRequest.get('anything');
}

export function validate(){
    console.log('发起validate请求')
    return httpRequest.get('anything');
}