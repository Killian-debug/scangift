import axios from "axios";

const client = axios.create({
    baseURL : 'http://localhost:7070/v1/',
    timeout : 5000,
    // headers : {
    //     'auth-name' : 'scangift.com'
    // }
})

export default client