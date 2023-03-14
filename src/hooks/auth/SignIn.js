import client from "../Axios";
import { useNavigate } from "react-router-dom";


const postLoginDetails = ({number, password}) => {
    
    const navigate = useNavigate();

    client.post("/annonceur/login", {
        method: "POST",
        body: JSON.stringify({
            number,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((resp) => {
            if (!resp.data.sucess) {
                alert(resp.data.msg);
            } else {
                //👇🏻 Logs the username to the console
                console.log(resp.data.data);
                //👇🏻 save the username to the local storage
                localStorage.setItem("number", resp.data.username);
                //👇🏻 Navigates to the 2FA route
                navigate("/dashboard");
            }
        })
        .catch((err) => console.error(err));
};