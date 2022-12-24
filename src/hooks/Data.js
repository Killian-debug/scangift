import axios from "axios";

const client = axios.create({
    baseURL : 'https://meliocar.ml/v1/',
    timeout : 5000,
    // headers : {
    //     'auth-name' : 'scangift.com'
    // }
})

export default client