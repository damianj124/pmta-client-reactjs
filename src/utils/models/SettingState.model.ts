import Results from "./Results.model";
import Property, {PropertyManagerProperty} from "./Proprty.model";
import {UploadedCois} from "./Cois.model";

export default interface SettingState {
    propertiesUserAccess: Results<Property> | null;
    propertyManagerProperty: Results<PropertyManagerProperty> | null;
    coisUploadedFiles: Results<UploadedCois> | null;
    managerApproval: any;
    invoicePageCount:any;
    coiPageCount:any;
    pastSingleInvoices: any;
    appDoc:any;
    pending: any;
    unhandledData: any;
    pastInvoices: any;
    searchedInvoices: any;
    glAccs: any;
    approvalDocs: any;
    invoiceData: any;
    glAccounts: any;
    templates: any;
    defaultTemplate: any;
    properties: any;
    tenants: any;
    coisData: any;
    vendorCategorys: any;
    errors: any;
    cois: any;
    coisErrors: any;
    coisError: any;
    coisValues: any;
    pastSingleCoi: any;
    campaignFailure: string;
}