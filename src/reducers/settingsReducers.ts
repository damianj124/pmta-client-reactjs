import {
    MANAGER_APPROVAL_SUCCESS,
    GET_PROPERTY_MANAGERS_SUCCESS,
    EMAIL_TEMPLATES_SUCCESS,
    GET_TENANTS_SUCCESS,
    NEW_CAMPAIGN_SUCCESS,
    GET_DEFAULT_TEMPLATE_SUCCESS,
    GET_GL_ACCOUNT_SUCCESS,
    INVOICE_DATA_SUCCESS,
    GET_APPROVAL_DOC_SUCCESS,
    GET_GL_ACC_SUCCESS,
    GET_PAST_INVOICE_SUCCESS,
    PENDING, GET_SINGLE_PAST_INVOICE_SUCCESS,
    COIS_DATA_SUCCESS,
    ERRORS,
    GET_PROPERTYS_SUCCESS,
    GET_PROPERTYS_FAILURE,
    GET_PROPERTY_MANAGER_PROPERTY_SUCCESS,
    GET_COIS_UPLOADED_FILES_SUCCESS,
    CLEAR_COIS_DATA_SUCCESS,
    NEW_CAMPAIGN_FAILURE,
    START_PENDING,
    END_PENDING,
    GET_SINGLE_PAST_COI_SUCCESS
} from '../actions/types';
import SettingState from "../utils/models/SettingState.model";

const initialState: SettingState = {
    managerApproval: null,
    coisUploadedFiles: null,
    propertyManagerProperty: null,
    invoicePageCount:null,
    coiPageCount:null,
    pastSingleInvoices: null,
    appDoc:null,
    pending: false,
    unhandledData: null,
    campaignFailure: '',
    pastInvoices: null,
    searchedInvoices: null,
    glAccs: null,
    approvalDocs: null,
    invoiceData: null,
    glAccounts: null,
    templates: null,
    defaultTemplate: null,
    properties: null,
    propertiesUserAccess: null,
    tenants: null,
    coisData: [],
    vendorCategorys: null,
    errors: {},
    cois: null,
    coisErrors: null,
    coisError: null,
    coisValues: [],
    pastSingleCoi:null,
};

export default (state:SettingState=initialState, action) => {
    switch(action.type) {
        case MANAGER_APPROVAL_SUCCESS:
            return { ...state, managerApproval: action.payload };
        case 'GET_COIS_ERRORS_SUCCESS':
            return { ...state, coisErrors: action.payload };
        case 'GET_COIS_ERROR_SUCCESS':
            return { ...state, coisError: action.payload };
        case "INVOICE_APP_DATA_SUCCESS":
            return { ...state, appDoc: action.payload };
        case GET_PROPERTY_MANAGERS_SUCCESS:
            return { ...state, properties: action.payload };
        case GET_PROPERTYS_SUCCESS:
            return { ...state, propertiesUserAccess: action.payload };
        case GET_PROPERTYS_FAILURE:
            return { ...state, propertiesUserAccess: action.payload };
        case 'COIS_VALUES_SUCCESS':
            return { ...state, coisValues: [...state.coisValues,action.payload] };
        case 'COIS_VALUES_CHANGE_SUCCESS':
            return { ...state, coisValues: action.payload };
        case GET_TENANTS_SUCCESS:
            return { ...state, tenants: action.payload };
        case EMAIL_TEMPLATES_SUCCESS:
            return { ...state, templates: action.payload };
        case 'START_EMAIL_TEMPLATES_SUCCESS':
            return { ...state, templates: null };
        case NEW_CAMPAIGN_SUCCESS:
            return { ...state, campaign: action.payload };
        case NEW_CAMPAIGN_FAILURE:
            return { ...state, campaignFailure: action.payload };
        case GET_DEFAULT_TEMPLATE_SUCCESS:
            return { ...state, defaultTemplate: action.payload };
        case 'GET_COIS_SUCCESS':
            return { ...state, cois: action.payload.results, coiPageCount: Math.ceil(action.payload.count/10) };
        case 'START_DEFAULT_TEMPLATES_SUCCESS':
            return { ...state, defaultTemplate: null };
        case GET_GL_ACCOUNT_SUCCESS:
            return { ...state, glAccounts: action.payload };
        case INVOICE_DATA_SUCCESS:
            return { ...state, invoiceData: action.payload, pending: false };
        case COIS_DATA_SUCCESS:
            const arr:any = [];

            for(const e of action.payload){
                let ifExist = false;
                for (const coisData of state.coisData){
                    if (coisData[0].id === e.id){
                        ifExist = true;
                    }
                }

                if(!ifExist) {
                    arr.push([e]);
                }
            }
            return { ...state, coisData: arr, pending: false };
        case CLEAR_COIS_DATA_SUCCESS:
            return { ...state, coisData: action.payload};
        case GET_APPROVAL_DOC_SUCCESS:
            return { ...state, approvalDocs: action.payload };
        case GET_GL_ACC_SUCCESS:
            return { ...state, glAccs: action.payload };
        case GET_SINGLE_PAST_INVOICE_SUCCESS:
            return { ...state, pastSingleInvoices: action.payload };
        case GET_COIS_UPLOADED_FILES_SUCCESS:
            return { ...state, coisUploadedFiles: action.payload };
        case GET_PROPERTY_MANAGER_PROPERTY_SUCCESS:
            return { ...state, propertyManagerProperty: action.payload };
        case GET_SINGLE_PAST_COI_SUCCESS:
            return { ...state, pastSingleCoi: action.payload };
        case GET_PAST_INVOICE_SUCCESS:
            return { ...state, pastInvoices: action.payload.results,invoicePageCount: Math.ceil(action.payload.count/10) };
        case 'VENDOR_CATEGORY_SUCCESS':
            return { ...state, vendorCategorys: action.payload};
        case 'GET_SEARCHED_INVOICE_SUCCESS':
            return { ...state, searchedInvoices: action.payload.results,invoicePageCount:  Math.ceil(action.payload.count/10)};
        case ERRORS:
            return { ...state, errors: action.payload };
        case END_PENDING:
            return { ...state, pending: false };
        case START_PENDING:
            return { ...state, pending: true };
        case PENDING:
            const data = { ...state, pending: true, pastSingleInvoices: null, unhandledData: action.payload };
            if(action.fromInvoicing) {
                data.invoiceData = null;
            }
            if(action.fromCois){
                data.coisData = [];
            }
            return data;
        default:
            return state;
    }
}

