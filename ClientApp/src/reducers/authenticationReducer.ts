const AuthenticationReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("username", JSON.stringify(action.payload.username));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                ...state,
                loaded: true,
                isAuthenticated: true,
                username: action.payload.username,
                token: action.payload.token
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                username: null
            };
        case "SETLOADED":
            return {
                ...state,
                loaded:true
            };
        default:
            return state;
    }
};

export default AuthenticationReducer;