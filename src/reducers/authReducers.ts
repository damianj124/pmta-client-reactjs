import {
    AUTHENTICATED,
    AUTHENTICATION_ERROR,
    UNAUTHENTICATED,
    UPDATE_EMAIL_SETTING_SUCCESS,
    UPDATE_MANAGER_APPROVAL_SUCCESS,
    REGISTER_USER_FAILURE,
    USER_TOKEN_FAILURE,
} from '../actions/types';

const initialState = {
    userData: {},
    registerUserError:[],
    userTokenError:[],
};

export default (state=initialState, action) => {
    switch(action.type) {
        case AUTHENTICATED:
            return { ...state, authenticated: true, userData: action.payload ,error: null};
        case UNAUTHENTICATED:
            return { ...state, authenticated: false, userData: {},error: null};
        case AUTHENTICATION_ERROR:
            return { ...state, error: action.payload };
        case UPDATE_EMAIL_SETTING_SUCCESS:
            const userData = state.userData;
            return { ...state, userData: { ...userData, email: action.payload} };
        case REGISTER_USER_FAILURE:
            return { ...state, registerUserError: action.payload };
        case USER_TOKEN_FAILURE:
            return { ...state, userTokenError: action.payload };
        case UPDATE_MANAGER_APPROVAL_SUCCESS:
            const data = state.userData;
            return { ...state, userData: { ...data, manager_approval_settings: action.payload} };
        default:
            return state;
    }
}
