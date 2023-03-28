import httpRequest from "../utils/httpRequest";
// console.log('httpRequest',httpRequest);



export function getSlideList(){
    return httpRequest.post('anything');
}