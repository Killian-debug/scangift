import client from "../Axios";


const postSignUpDetails = ({email, password, tel, username,}) => {

    client.post("/annonceur/signup", {
        method: "POST",
        body: JSON.stringify({
            nom,
            email,
            password,
            tel,
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
                localStorage.setItem("number", resp.data.tel);
                //👇🏻 Navigates to the 2FA route
                navigate("/dashboard");
            }
        })
        .catch((err) => console.error(err));
};

// const handleSubmit = (e) => {
//     e.preventDefault();
//     //👇🏻 Call it within the submit function
//     postSignUpDetails();
//     setEmail("");
//     setTel("");
//     setUsername("");
//     setPassword("");
// };