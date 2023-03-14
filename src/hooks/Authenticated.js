import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

const Authenticated = (props) => {

    return props.isAuthenticated ? <Route {...props}></Route> : <Redirect to={props.redirectTo}></Redirect>
    
};

export default Authenticated;