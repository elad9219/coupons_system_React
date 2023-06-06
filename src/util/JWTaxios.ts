import axios from "axios";
import { updateToken, userLogin } from "../redux/authState";
import { store } from "../redux/store";

const jwtAxios = axios.create();

//Request interceptor - מה אנחנו רוצים לבצע בכל שליחת בקשה לשרת
jwtAxios.interceptors.request.use(request =>{
    request.headers = {
        //"authorization" : localStorage.getItem("jwt")
        "authorization" : store.getState().authState.userToken
    };

    
    //We must continue the delivery to the request server
    return request;
});

jwtAxios.interceptors.response.use(response =>{
    //localStorage.setItem("jwt", response.headers.authorization); 
    //Use store.dispatch instead of useDispatch, since we are inside a class and not a function...
    if ("authorization" in response.headers){
    store.dispatch(updateToken(response.headers.authorization));
}
    return response;
});






export default jwtAxios;