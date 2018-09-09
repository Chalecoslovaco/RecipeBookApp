import * as AuthActions from "./auth.actions";

export interface State {
    token: string,
    auth: boolean
}

const initialState: State = {
    token: null,
    auth: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch(action.type) {
        case AuthActions.SIGN_UP:
        case AuthActions.SIGN_IN:
            return {...state, auth: true};
        case AuthActions.SIGN_OUT:
            return {...state, auth: false};
        case AuthActions.SET_TOKEN:
            return {...state, token: action.payload};
        default:
            return state;
    }
}