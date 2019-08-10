import axios from 'axios';
import {
    MANAGER_APPROVAL_SUCCESS,
    MANAGER_APPROVAL_FAILURE,
    GET_PROPERTY_MANAGERS_SUCCESS,
    ADD_MANAGER_APPROVAL_FAILURE,
    GET_PROPERTY_MANAGERS_FAILURE,
    GET_TENANTS_SUCCESS,
    GET_TENANTS_FAILURE,
    EMAIL_TEMPLATES_SUCCESS,
    EMAIL_TEMPLATES_FAILURE,
    GET_DEFAULT_TEMPLATE_SUCCESS,
    GET_DEFAULT_TEMPLATE_FAILURE,
    GET_GL_ACCOUNT_SUCCESS,
    INVOICE_DATA_SUCCESS,
    INVOICE_DATA_FAILURE,
    GET_GL_ACCOUNT_FAILURE,
    GET_APPROVAL_DOC_SUCCESS,
    GET_APPROVAL_DOC_FAILURE,
    UPDATE_EMAIL_SETTING_SUCCESS,
    GET_GL_ACC_SUCCESS,
    GET_GL_ACC_FAILURE,
    GET_PAST_INVOICE_SUCCESS,
    GET_PAST_INVOICE_FAILURE,
    GET_SINGLE_PAST_INVOICE_SUCCESS,
    COIS_DATA_FAILURE,
    COIS_DATA_SUCCESS,
    UNAUTHENTICATED,
    NEW_CAMPAIGN_SUCCESS,
    NEW_CAMPAIGN_FAILURE,
    PENDING,
    ERRORS,
    GET_PROPERTYS_FAILURE,
    GET_PROPERTYS_SUCCESS,
    UPDATE_MANAGER_APPROVAL_SUCCESS,
    GET_PROPERTY_MANAGER_PROPERTY_SUCCESS,
    GET_PROPERTY_MANAGER_PROPERTY_FAILURE,
    GET_COIS_UPLOADED_FILES_FAILURE,
    GET_COIS_UPLOADED_FILES_SUCCESS,
    CLEAR_COIS_DATA_SUCCESS,
    START_PENDING,
    END_PENDING,
    GET_SINGLE_PAST_COI_SUCCESS
} from "./types";
import {changeLoaclStorageData} from 'src/utils/helpers/Storage';
import UserData from "../utils/models/UserData.model";
import {PropertyManagerProperty} from "../utils/models/Proprty.model";


const URL = process.env.REACT_APP_API_URL;

export const getManagerApprovalAction = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/manager-approval/`, {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: MANAGER_APPROVAL_SUCCESS, payload: res.data.results});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: MANAGER_APPROVAL_FAILURE,
                payload: error
            });
        }
    };
};

export const changeCoisValuesArrayAction = (values) => {
    return dispatch => {
        try {
            dispatch({type: "COIS_VALUES_SUCCESS", payload: values});
        } catch (error) {
            console.log(error)
        }
    };
};

export const rewriteCoisValuesArrayAction = (coisValues) => {
    return dispatch => {
        try {
            dispatch({type: "COIS_VALUES_CHANGE_SUCCESS", payload: coisValues});
        } catch (error) {
            console.log(error)
        }
    };
};

export const getApprovalDocumentsAction = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/approval-documents/`, {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: GET_APPROVAL_DOC_SUCCESS, payload: res.data.results});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_APPROVAL_DOC_FAILURE,
                payload: error
            });
        }
    };
};

export const getPastInvoiceAction = (page) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/get-invoice/?page=` + (page + 1), {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: GET_PAST_INVOICE_SUCCESS, payload: res.data});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_PAST_INVOICE_FAILURE,
                payload: error
            });
        }
    };
};

export const getSearchedInvoiceAction = (searchVal, page) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/get-invoice/?search=` + searchVal + '&page=' + (page + 1), {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: 'GET_SEARCHED_INVOICE_SUCCESS', payload: res.data});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_PAST_INVOICE_FAILURE,
                payload: error
            });
        }
    };
};

export const getSinglePastInvoiceAction = (id) => {
    return async dispatch => {
        dispatch({type: PENDING});
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/get-invoice/${id}/`, {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: GET_SINGLE_PAST_INVOICE_SUCCESS, payload: res.data});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_PAST_INVOICE_FAILURE,
                payload: error
            });
        }
    };
};

export const getSinglePastCoiAction = (id) => {
    return async dispatch => {
        dispatch({type: START_PENDING});
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/coise-view/${id}/`, {
                headers: {Authorization: "Token " + token}
            });
            dispatch({type: GET_SINGLE_PAST_COI_SUCCESS, payload: res.data});
            dispatch({type: END_PENDING});
        } catch (error) {
            dispatch({type: END_PENDING});
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const getGlAccountAction = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/gl-code/?show_all=true`, {
                headers: {Authorization: "Token " + token}
            });

            const ids: any = [];
            const data: any = [];

            for (const item of res.data.results) {
                if (ids.indexOf(item.property) === -1) {
                    ids.push(item.property)
                }
            }

            for (const id of ids) {
                const d: any = [];
                for (const item of res.data.results) {
                    if (item.property === id) {
                        d.push(item);
                    }
                }
                data.push({id, data: d});
            }

            dispatch({type: GET_GL_ACCOUNT_SUCCESS, payload: data});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_GL_ACCOUNT_FAILURE,
                payload: error
            });
        }
    };
};

export const getGlAccAction = (id) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/gl-code/?show_all=true&property_id=${id}`, {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: GET_GL_ACC_SUCCESS, payload: res.data.results});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_GL_ACC_FAILURE,
                payload: error
            });
        }
    };
};

export const getVendorCategoryAction = (proprtyId) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/vendor-category/`, {
                headers: {Authorization: "Token " + token},
                params: {property: proprtyId}
            });
            dispatch({type: "VENDOR_CATEGORY_SUCCESS", payload: res.data});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: 'VENDOR_CATEGORY_FAILURE',
                payload: error
            });
        }
    };
};

export const getAllVendorCategoryAction = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/vendor-category/`, {
                headers: {Authorization: "Token " + token},
            });
            dispatch({type: "VENDOR_CATEGORY_SUCCESS", payload: res.data});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: 'VENDOR_CATEGORY_FAILURE',
                payload: error
            });
        }
    };
};

export const editVendorCategoryt = (coiId, categoryId) => {
    const token = localStorage.getItem('pmt-token');
    return async () => {
        axios.patch(`${URL}/coise-view/` + coiId + '/', {category: categoryId}, {
            headers: {Authorization: "Token " + token},
        });
    }
};

export const sendInvoiceData = data => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/invoice-data/`, data , {
                headers: {Authorization: "Token " + token}
            });
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const sendSignPdfData = data => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/sign-pdf/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const getPdfSign = (sign, id) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.get(`${URL}/get-pdf-sign/?token=${sign}&id=${id}`, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            return Promise.reject(error);
        }
    };
};

export const addGlAccountAction = data => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/gl-code/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};


export const sendInvoiceFileAction = (data, unhandledData, fromInvoicing) => {
    return async dispatch => {
        try {
            dispatch({type: 'PENDING', payload: unhandledData, fromInvoicing});
            const token = localStorage.getItem('pmt-token');
            const res = await axios.post(`${URL}/invoice-file/invoice_file_create/`, data, {
                headers: {Authorization: "Token " + token}
            });
            dispatch({type: INVOICE_DATA_SUCCESS, payload: res.data.result});
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: INVOICE_DATA_FAILURE,
                payload: error
            });
        }
    };
};

export const sendCoisFileAction = (data, unhandledData, fromCois) => {
    return async dispatch => {
        try {
            dispatch({type: 'PENDING', payload: unhandledData, fromCois});
            const token = localStorage.getItem('pmt-token');
            const res = await axios.post(`${URL}/cois_create/`, data, {
                headers: {Authorization: "Token " + token}
            });
            dispatch({type: COIS_DATA_SUCCESS, payload: res.data});
            return res;
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: COIS_DATA_FAILURE,
                payload: error
            });
        }
    };
};

export const clearCoisDataStorAction = () => {
    return async dispatch => {
        dispatch({type: CLEAR_COIS_DATA_SUCCESS, payload: []});
    };
};

export const getCoisDataAction = (data) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/pending-coise-view/`, {
                headers: {Authorization: "Token " + token},
                params: data
            });

            dispatch({type: COIS_DATA_SUCCESS, payload: res.data.results});
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: COIS_DATA_FAILURE,
                payload: error
            });
        }
    };
};

export const sendNewCoisFileAction = (data, unhandledData, fromCois) => {
    return async dispatch => {
        dispatch({type: START_PENDING});
        try {
            dispatch({type: 'PENDING', payload: unhandledData, fromCois});
            const token = localStorage.getItem('pmt-token');
            const res = await axios.post(`${URL}/cois_create/`, data, {
                headers: {Authorization: "Token " + token}
            });
            dispatch({type: END_PENDING});
            return res;
        } catch (error) {
            dispatch({type: END_PENDING});
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: COIS_DATA_FAILURE,
                payload: error
            });
        }
    };
};

export const getCoisFilesAction = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/processed-coise-view/`, {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: GET_COIS_UPLOADED_FILES_SUCCESS, payload: res.data});
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }

            dispatch({
                type: GET_COIS_UPLOADED_FILES_FAILURE,
                payload: error
            });
        }
    };
};


export const addCoisDataAction = (data) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/cois-data/cois_data_create`, data, {
                headers: {Authorization: "Token " + token}
            }).then((res) => {
                dispatch({type: "ADD_COIS_DATA_SUCCESS", payload: res.data});
            })


        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: 'ADD_COIS_DATA_FAILURE',
                payload: error
            });
        }
    };
};

export const addApprovalDocumentAction = (data) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/approval-documents/`, data, {
                headers: {Authorization: "Token " + token}
            }).then(resp => {
                dispatch({type: 'INVOICE_APP_DATA_SUCCESS', payload: resp.data.result});
                return resp;
            })


        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const editEmailTemplateAction = (id, data) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.patch(`${URL}/email-templates/${id}/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const addEmailTemplateAction = data => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/email-templates/add_email_template/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const makeDefaultsAction = data => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/default-template/add_default_email_template/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const sendErrorEmailAction = data => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/send-cois-email/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const getEmailTemplatesAction = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/email-templates/`, {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: EMAIL_TEMPLATES_SUCCESS, payload: res.data.results});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: EMAIL_TEMPLATES_FAILURE,
                payload: error
            });
        }
    };
};


export const getDefaultTemplateAction = () => {
    return async dispatch => {
        dispatch({type: 'START_DEFAULT_TEMPLATES_SUCCESS'});
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/default-template/`, {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: GET_DEFAULT_TEMPLATE_SUCCESS, payload: res.data.results[0]});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_DEFAULT_TEMPLATE_FAILURE,
                payload: error
            });
        }
    };
};

export const getCoisAction = (data) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/coise-view/`, {
                headers: {Authorization: "Token " + token},
                params: data
            });
            dispatch({type: "GET_COIS_SUCCESS", payload: res.data});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: "GET_COIS_FAILURE",
                payload: error
            });
        }
    };
};

export const getCoisErrorsAction = (property) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/coise-errors/?property=${property}`, {
                headers: {Authorization: "Token " + token}
            });
            dispatch({type: "GET_COIS_ERRORS_SUCCESS", payload: res.data});

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: "GET_COIS_ERRORS_FAILURE",
                payload: error
            });
        }
    };
};

export const getCoisErrorAction = (id) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.get(`${URL}/coise-errors/?pk=${id}`, {
                headers: {Authorization: "Token " + token}
            }).then(res => {
                dispatch({type: "GET_COIS_ERROR_SUCCESS", payload: res.data});
                return res.data;
            });


        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: "GET_COIS_ERROR_FAILURE",
                payload: error
            });
        }
    };
};

export const sendNewCampaign = (data) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.post(`${URL}/new-campaign/`, data, {
                headers: {Authorization: "Token " + token}
            });
            console.log()
            if (Array.isArray(res.data.result)) {
                dispatch({type: NEW_CAMPAIGN_SUCCESS, payload: res.data.result});
            }else {
                dispatch({
                    type: NEW_CAMPAIGN_FAILURE,
                    payload: res.data.result
                });
                throw (res.data.result);
            }

        } catch (error) {
            console.log(error)
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: NEW_CAMPAIGN_FAILURE,
                payload: 'Something goes wrong on the server. Please try again later.'
            });
            throw (error);
        }
    };
};

export const removeManagerApprovalAction = (id) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.delete(`${URL}/manager-approval/${id}/`, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const removeInvoiceAction = (id) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.delete(`${URL}/get-invoice/${id}/`, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const removeCoiAction = (id) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.delete(`${URL}/coise-view/${id}/`, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            throw error;
        }
    };
};

export const removeGLAction = (id) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.delete(`${URL}/gl-code/${id}/`, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const addManagerApprovalAction = (data) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/manager-approval/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: ADD_MANAGER_APPROVAL_FAILURE,
                payload: error
            });
        }
    };
};

export const addVendorCategoryAction = (data) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/vendor-category/vendor_category_create/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: "ADD_VENDOR_CATEGORY_FAILURE",
                payload: error
            });
        }
    };
};


export const editTenantAction = (id, data) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.patch(`${URL}/tenant-email/${id}/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const addTenantEmailDataAction = (data) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/tenant-emails-data/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};


export const addTenantAction = (data) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/tenant-email/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const getTenantsAction = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/tenant-email/`, {
                headers: {Authorization: "Token " + token}
            });
            dispatch({
                type: GET_TENANTS_SUCCESS,
                payload: res.data.results
            })
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_TENANTS_FAILURE,
                payload: error
            });
        }
    };
};

export const getPropertyManagersAction = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/property-managers/`, {
                headers: {Authorization: "Token " + token}
            });
            dispatch({type: GET_PROPERTY_MANAGERS_SUCCESS, payload: res.data.results});
            return Promise.resolve(res);
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_PROPERTY_MANAGERS_FAILURE,
                payload: error
            });
        }
    };
};

export const getPropertyManagerPropertyAction = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/property-manager-property/`, {
                headers: {Authorization: "Token " + token}
            });
            dispatch({type: GET_PROPERTY_MANAGER_PROPERTY_SUCCESS, payload: res.data.results});
            return Promise.resolve(res);
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_PROPERTY_MANAGER_PROPERTY_FAILURE,
                payload: error
            });
        }
    };
};

export const updatePropertyManagerPropertyAction = (id: number, data: PropertyManagerProperty) => dispatch => {
    const token = localStorage.getItem('pmt-token');
    return axios.patch(`${URL}/property-manager-property/${id}/`, data, {
        headers: {Authorization: "Token " + token}
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }

            throw error.response.data;
        });
};

// ToDO handel backend error
export const updateUserDataAction = (id: number, data: any) => {
    return async dispatch => {
        // dispatch({type: PENDING});
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.patch(`${URL}/users/${id}/`, data, {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: UPDATE_EMAIL_SETTING_SUCCESS, payload: res.data.email});

            const userData = JSON.parse(localStorage.getItem('pmt-user-data') || '{}');
            localStorage.setItem('pmt-user-data', JSON.stringify({...userData, email: res.data.email}));
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }

            dispatch({
                type: ERRORS,
                payload: error.response.data
            });
        }
    };
};

export const getPropertiesAction = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            const res = await axios.get(`${URL}/properties/`, {
                headers: {Authorization: "Token " + token}
            });

            dispatch({type: GET_PROPERTYS_SUCCESS, payload: res.data});
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
            dispatch({
                type: GET_PROPERTYS_FAILURE,
                payload: null
            });
        }
    };
};

export const removePropertyManagerAction = (id: number) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.delete(`${URL}/property-managers/${id}/`, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const removeEmailTemplatesAction = (id: number) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.delete(`${URL}/email-templates/${id}/`, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const inviteManagerToPropertyAction = (data) => {
    return dispatch => {
        const token = localStorage.getItem('pmt-token');
        return axios.post(`${URL}/invite-property-manager/property_manager/`, data, {
            headers: {Authorization: "Token " + token}
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                if (error.status === 401) {
                    localStorage.clear();
                    return dispatch({
                        type: UNAUTHENTICATED
                    })
                }

                if (error.response.data && error.response.data.user) {
                    return error.response.data.user;
                } else {
                    throw error.response.data.detail;
                }
            });
    };
};

export const addManagerToPropertyAction = (data) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.post(`${URL}/property-managers/`, data, {
                headers: {Authorization: "Token " + token}
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const addPropertyAction = (data) => {
    return dispatch => {
        const token = localStorage.getItem('pmt-token');
        return axios.post(`${URL}/property-manager-property/`, data, {
            headers: {Authorization: "Token " + token}
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                if (error.status === 401) {
                    localStorage.clear();
                    return dispatch({
                        type: UNAUTHENTICATED
                    })
                }

                throw error.response.data;
            });
    };
};

export const changeManagerApprovalAction = (data: { manager_approval_settings: boolean }) => {
    return dispatch => {
        const token = localStorage.getItem('pmt-token');
        return axios.post(`${URL}/manager-approval-settings/add_manager_approval_setting/`, data, {
            headers: {Authorization: "Token " + token}
        })
            .then(response => {
                dispatch({type: UPDATE_MANAGER_APPROVAL_SUCCESS, payload: data.manager_approval_settings});

                const userData: UserData = changeLoaclStorageData('pmt-user-data', data);
                return userData;
            })
            .catch(error => {
                if (error.status === 401) {
                    localStorage.clear();
                    return dispatch({
                        type: UNAUTHENTICATED
                    })
                }

                throw error.response.data;
            });
    };
};

export const removeVendorCategoryAction = (id: number) => {
    return dispatch => {
        try {
            const token = localStorage.getItem('pmt-token');
            return axios.delete(`${URL}/vendor-category_delete/${id}/`, {
                headers: {Authorization: "Token " + token}
            }).then((res) => {
                return res;
            });

        } catch (error) {
            if (error.status === 401) {
                localStorage.clear();
                return dispatch({
                    type: UNAUTHENTICATED
                })
            }
        }
    };
};

export const stopPennding = () => dispatch => {
    return dispatch({type:END_PENDING})
};
