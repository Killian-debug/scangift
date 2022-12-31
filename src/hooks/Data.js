import axios from "axios";

const client = axios.create({
    baseURL : process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_VERSION ,
    timeout : 5000,
    // headers : {
    //     'auth-name' : 'scangift.com'
    // }
})

export default client