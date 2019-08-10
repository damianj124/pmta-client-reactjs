import * as React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Accont from "./Accounts/Accont";
import ApprovalDocs from "./ApprovalDocs/ApprovalDocs";
import AddDoc from "./ApprovalDocs/AddDoc";
import AccountsReceivable from "./Accounts/AccountsReceivable";
import CreateContract from "./Vendor/CreateContract";
import ContractLicense from "./Vendor/ContractLicense";
import ContractDetails from './Vendor/ContractDetails'
import Dashboard from "./Home/Dashboard";
import Vendor from "./Vendor/Vendor";
import OwnerContract from './Vendor/OwnerContract'
import LicenseCheck from "./Vendor/LicenseCheck";
import ProjectAddress from './Vendor/ProjectAddress'
import NewCampaign from "./Accounts/NewCampaign";
import Invoicing from "./Invoicing/Invoicing";
import UploadInvoices from "./Invoicing/UploadInvoices";
import ComCast from "./Invoicing/ComCast";
import Settings from "./Settings/Settings";
import EmailSettings from "./Settings/EmailSettings";
import EmailTemplates from "./Settings/EmailTemplates";
import UserAccess from "./Settings/UserAccess";
import TentatAccess from "./Settings/TentatAccess";
import Properties from "./Settings/Properties";
import VendorCoi from "./Settings/VendorCoi";
import CategoryView from "./Settings/CategoryView";
import Cois from "./Cois/Cois";
import UploadCois from "./Cois/UploadCois";
import CoisUploaded from "./Cois/CoisUploaded";
import CoisWarning from "./Cois/CoisWarning";
import CoisEmailCheck from "./Cois/CoisEmailCheck";
import ManagerApproval from "./Settings/ManagerApproval";
import ChartOfAccounts from "./Settings/ChartOfAccounts";
import ViewDoc from "./ApprovalDocs/ViewDoc";
import SaveDoc from "./ApprovalDocs/SaveDoc";
import ViewInvoice from "./Invoicing/ViewInvoice";
import SingleInvoice from "./Invoicing/SingleInvoice";
import AuditReport from "./Invoicing/AuditReport";
import Aside from "./Asside";
import requireAuth from './hoc/require_auth';
import BudgetCalendar from "./BudgetCalendar/BudgetCalendar";
import ReforecastItems from "./ReforecastItems/ReforecastItems";
import CoisView from "./Cois/CoisView";
import SingleCoi from "./Cois/SingleCoi";


class Content extends React.Component {
    state = {
        asideMinimize: false,
    };

    handleClick = () => {
        this.setState({asideMinimize: !this.state.asideMinimize})
    };

    render() {
        const token = localStorage.getItem('pmt-token');
        // @ts-ignore
        return (!token && <Redirect to={'/signin'}/>) || (
            <div className={"flex main " + ((this.state.asideMinimize && 'space-sm') || '')}>

                <Aside asideMinimize={this.state.asideMinimize} handleClick={this.handleClick}/>
                <div className="container">
                    <Switch>
                        <Redirect from="/" exact to="/dashboard"/>
                        <Route exact path="/dashboard" component={requireAuth(Dashboard)}/>

                        <Route exact path="/vendor" component={requireAuth(Vendor)}/>
                        <Route
                            exact
                            path="/vendor/create-contract/"
                            component={requireAuth(CreateContract)}
                        />
                        <Route
                            exact
                            path="/vendor/create-contract/contract-license"
                            component={requireAuth(ContractLicense)}
                        />
                        <Route
                            exact
                            path="/vendor/create-contract/contract-license/license-check"
                            component={requireAuth(LicenseCheck)}
                        />
                        <Route
                            exact
                            path="/vendor/create-contract/contract-license/license-check/contract-license"
                            component={requireAuth(ProjectAddress)}
                        />
                        <Route
                            exact
                            path="/vendor/create-contract/contract-license/license-check/contract-license/owner-contract"
                            component={requireAuth(OwnerContract)}
                        />
                        <Route
                            exact
                            path="/vendor/create-contract/contract-license/license-check/contract-license/owner-contract/contract-details"
                            component={requireAuth(ContractDetails)}
                        />

                        <Route exact path="/account" component={requireAuth(Accont)}/>
                        <Route exact path="/account/new-campaign" component={requireAuth(NewCampaign)}/>
                        <Route
                            path="/account/new-campaign/accounts-receivable"
                            component={requireAuth(AccountsReceivable)}
                        />
                        <Route exact path="/invoicing" component={requireAuth(Invoicing)}/>
                        <Route path="/cois" exact component={requireAuth(Cois)}/>
                        <Route exact path="/uploaded-invoices" component={requireAuth(UploadInvoices)}/>
                        <Route exact path="/uploaded-invoices/view-invoice" component={requireAuth(ViewInvoice)}/>
                        <Route exact path="/single-invoice/:id" component={requireAuth(SingleInvoice)}/>
                        <Route exact path="/single-coi/:id" component={requireAuth(SingleCoi)}/>
                        <Route exact path="/audit-report/:id" component={requireAuth(AuditReport)}/>
                        <Route exact path="/comcast" component={requireAuth(ComCast)}/>
                        <Route exact path="/approval-docs" component={requireAuth(ApprovalDocs)}/>
                        <Route path="/approval-docs/add-doc-upload" component={requireAuth(AddDoc)}/>
                        <Route exact path="/approval-docs/view-doc" component={requireAuth(ViewDoc)}/>
                        <Route path="/approval-docs/view-doc/save-doc" component={requireAuth(SaveDoc)}/>
                        <Route exact path="/settings" component={requireAuth(Settings)}/>
                        <Route path="/settings/email-settings" component={requireAuth(EmailSettings)}/>
                        <Route path="/settings/email-template" component={requireAuth(EmailTemplates)}/>
                        <Route path="/settings/user-access" component={requireAuth(UserAccess)}/>
                        <Route path="/settings/chart-of-accounts" component={requireAuth(ChartOfAccounts)}/>
                        <Route path="/settings/tenant-emails" component={requireAuth(TentatAccess)}/>
                        <Route path="/settings/properties" component={requireAuth(Properties)}/>
                        <Route path="/Settings/vendor-coi" component={requireAuth(VendorCoi)}/>

                        <Route path="/settings/category-view/:name" component={requireAuth(CategoryView)}/>
                        <Route path="/settings/category-view" component={requireAuth(CategoryView)}/>
                        <Route path="/cois/upload-cois" exact component={requireAuth(UploadCois)}/>
                        <Route path="/cois/cois-uploaded" exact component={requireAuth(CoisUploaded)}/>
                        <Route path="/cois/cois-view" exact component={requireAuth(CoisView)}/>
                        <Route path="/cois/cois-warning/:prop_id" exact  component={requireAuth(CoisWarning)}/>
                        <Route path="/cois/cois-check/:id" exact component={requireAuth(CoisEmailCheck)}/>
                        <Route path="/settings/manager-approval" component={requireAuth(ManagerApproval)}/>
                        <Route exact path="/budget-calendar" component={requireAuth(BudgetCalendar)}/>
                        <Route exact path="/reforecast-items" component={requireAuth(ReforecastItems)}/>
                        <Redirect to="/signin"/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Content;
