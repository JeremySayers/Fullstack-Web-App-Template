import React, { useEffect } from "react";
import {Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/Login"
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthenticationReducer from "./reducers/authenticationReducer";
import './index.css';
import { QueryClient, QueryClientProvider } from "react-query";
import SideNav from "./components/SideNav";


export interface AuthenticationReducerState {
    loaded: boolean
    isAuthenticated: boolean;
    username: string | null;
    token: string | null;
}

export interface AuthenticationReducerAction {
    type: string;
    payload: any;
}

export interface AuthenticationContextInterface {
    state: AuthenticationReducerState | null;
    dispatch: any;
}

const initialContext = {
    state: null,
    dispatch: null
};

export const AuthenticationContext = React.createContext<AuthenticationContextInterface>(initialContext);
const queryClient = new QueryClient()

const initialState: AuthenticationReducerState = {
    loaded: false,
    isAuthenticated: false,
    username: null,
    token: null
};

export const App = () => {
    const [state, dispatch] = React.useReducer(AuthenticationReducer, initialState);

    useEffect(() => {
        const restoreAuthentication = async () => {
            const usernameJSON = localStorage.getItem("username");
            const tokenJSON = localStorage.getItem("token");

            if (usernameJSON == null || tokenJSON == null) {
                dispatch({ type: "SETLOADED" });
                return;
            }

            const username = JSON.parse(usernameJSON);
            const token = JSON.parse(tokenJSON);

            if (username != null && token != null) {
                dispatch({ type: "LOGIN", payload: { username, token } });
            } else {
                dispatch({ type: "SETLOADED"});
            }        
        }

        restoreAuthentication();
    }, []);

    return (
        <AuthenticationContext.Provider value={{ state, dispatch }}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                        </Switch>
                        {state.isAuthenticated ? <React.Fragment><Navbar /> <SideNav/></React.Fragment>: <div></div>}
                        <main className="mt-5 pt-3">
                            <Switch>
                                <PrivateRoute exact path="/">
                                    <Home />
                                </PrivateRoute>                   
                            </Switch>
                        </main>
                    </div>
                </Router>
            </QueryClientProvider>
        </AuthenticationContext.Provider>
    );
}

export default App;