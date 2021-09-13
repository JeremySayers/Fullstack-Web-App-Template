import React, { FC, useContext } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { AuthenticationContext } from "../App";

const PrivateRoute: FC<RouteProps> = ({...routeProps }) => {
    const authentication = useContext(AuthenticationContext);

    if (!authentication.state?.loaded) {
        return (<div>Loading authentication data...</div>)
    }

    if (authentication.state.isAuthenticated === false) {
        return <Redirect to='/login' />
    }

    return <Route {...routeProps}/>
}

export default PrivateRoute;