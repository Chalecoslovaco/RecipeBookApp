export interface State {
    token: string,
    auth: boolean
}

const initialState: State = {
    token: null,
    auth: false
};

export function authReducer(state = initialState, action) {
    return state;
}