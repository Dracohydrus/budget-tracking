export const ACTIONS = {
    LOGIN_START: "LOGIN_START",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGOUT: "LOGOUT",
    USER_UPDATE: "USER_UPDATE",
}

export const LoginStart = (userCredentials) => ({
    type: ACTIONS.LOGIN_START
});

export const LoginSuccessful = (user) => ({
    type: ACTIONS.LOGIN_SUCCESS,
    payload: user
});

export const LoginFailure = () => ({
    type: ACTIONS.LOGIN_FAILURE
})

export const Logout = () => ({
    type: ACTIONS.LOGOUT
})

export const userUpdate = (user) => ({
    type: ACTIONS.USER_UPDATE,
    payload: user
})