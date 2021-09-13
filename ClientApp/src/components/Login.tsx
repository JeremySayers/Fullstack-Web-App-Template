import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { AuthenticationContext } from "../App";

interface LoginDataInterface {
    username: string;
    password: string;
    isSubmitting: boolean;
    errorMessage: string | null;
};

export const Login: FC<any> = (props: any) => {
    const { dispatch: dispatch } = React.useContext(AuthenticationContext);

    const initialState: LoginDataInterface = {
        username: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    };

    const [data, setData] = React.useState<LoginDataInterface>(initialState);
    const [redirect, setRedirect] = React.useState<boolean>(false);

    const handleInputChange = (event: any) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        setData({ ...data, isSubmitting: true, errorMessage: null });

        const response = await fetch("/api/authentication", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: data.username,
                Password: data.password
            })
        });

        const authenticationInformation = await response.json();

        if (response.ok) {
            dispatch({ type: "LOGIN", payload: authenticationInformation });
            setRedirect(true);
        }
        else {
            setData({ ...data, isSubmitting: false, errorMessage: "Wrong username/password" });
        }
    }

    if (redirect) {
        return (
            <Redirect to='/' />
        );
    }

    return (
        <div className="login-container">
            <h2>$safeprojectname$</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className="col col-md-12 form-group mb-2">
                        <input
                            type="text"
                            placeholder="Username"
                            value={data.username}
                            onChange={handleInputChange}
                            name="username"
                            id="username"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col col-md-12 form-group mb-2">
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleInputChange}
                            name="password"
                            id="password"
                            className="form-control"
                        />
                    </div>
                </div>

                {data.errorMessage && (
                    <span className="form-error">{data.errorMessage}</span>
                )}

                <div className="row">
                    <div className="col col-md-12 form-group d-grid gap-2">
                        <button
                            type="submit"

                            disabled={data.isSubmitting}
                            className="btn btn-primary"
                        >
                            {data.isSubmitting ? (
                                "Loading..."
                            ) : (
                                    "Login"
                                )
                            }
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default Login;