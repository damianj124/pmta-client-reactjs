import {
    AUTHENTICATED,
    AUTHENTICATION_ERROR,
    UNAUTHENTICATED,
    REGISTER_USER_FAILURE,
    USER_TOKEN_FAILURE
} from './types';
import axios from 'axios';


const URL = process.env.REACT_APP_API_URL;
const endpoints = {
    checkAccount: `${URL}/auth-users/check-account/`,
    confirmAccount: `${URL}/auth-users/confirm-account/`,
    forgotPassword: `${URL}/auth-users/forgot-password/`,
    changePassword: `${URL}/auth-users/change-password/`,
    login: `${URL}/auth-users/login/`,
    resetPassword: `${URL}/auth-users/reset-password/`,
};


export const signInAction = ({ email, password }, history) => {
    return async dispatch => {
        try {
            const res = await axios.post(endpoints.login, { username: email, password });
            localStorage.setItem('pmt-token', res.data.token);
            localStorage.setItem('pmt-email', res.data.token);
            localStorage.setItem('pmt-user-data', JSON.stringify(res.data));
            // axios.interceptors.request.use(config => {
            //     config.headers.Authorization =  res.data.token ? `Bearer ${res.data.token}` : '';
            //     return config;
            // });
            dispatch({ type: AUTHENTICATED , payload: res.data});
            history.push('/dashboard');

        } catch(error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: 'Invalid email or password'
            });
        }
    };
};

export const checkUserTokenAction = (data) => {
    return async dispatch => {
        try {
            await axios.post(`${URL}/auth-users/check-account/`, data);

        } catch (error) {
            dispatch({
                type: USER_TOKEN_FAILURE,
                payload: error.response.data
            });
            throw error;
        }
    };
};

export const clearUserTokenAction = () => {
    return async dispatch => {
        dispatch({
            type: USER_TOKEN_FAILURE,
            payload: []
        });
    };
};

export const registerUserAction = (data) => {
    return async dispatch => {
        try {
            await axios.post(`${URL}/auth-users/sign-up/`, data);

        } catch (error) {
            dispatch({
                type: REGISTER_USER_FAILURE,
                payload: error.response.data
            });
            throw error;
        }
    };
};

export const clearRegisterUserAction = () => {
    return async dispatch => {
        dispatch({
            type: REGISTER_USER_FAILURE,
            payload: []
        });
    };
};

export const checkAccountAction = token => {
    return async dispatch => {
        return axios.post(endpoints.checkAccount, { token });
    };
};

export const signOutAction = () => {
    localStorage.clear();
    return {
        type: UNAUTHENTICATED
    };
};

export const confirmAccountAction = data => {
    return async dispatch => {
        return axios.post(endpoints.confirmAccount, data);
    };
};


