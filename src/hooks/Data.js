import axios from "axios";

const client = axios.create({
    baseURL : 'http://localhost:7070/v1/',
    timeout : 2000,
    // headers : {
    //     'auth-name' : 'scangift.com'
    // }
})

export default client