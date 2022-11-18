import axios from "axios";

const client = axios.create({
    baseURL : 'https://jsonplaceholder.typicode.com/',
    timeout : 2000,
    // headers : {
    //     'auth-name' : 'scangift.com'
    // }
})

export default client