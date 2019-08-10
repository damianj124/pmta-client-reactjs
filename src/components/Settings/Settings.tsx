import * as React from 'react';
import { Link, RouteComponentProps} from "react-router-dom";
import { connect } from "react-redux";
import { signOutAction } from "../../actions/auth";

export interface Props {
    signOutAction: any
}

class Settings extends React.Component<Props & RouteComponentProps, {}>{

    signOut = () => {
        this.props.signOutAction();
        this.props.history.push('/signin')
    };

    render() {
        return (
            <div className="page-content">
                <h1 className="page-title">settings</h1>
                <span className="page-icon">
          <i className="icon-settings" />
        </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">settings</h2>
                    <h6 className="page-desc">manage your settings here</h6>
                    <ul className="settings">
                        <li>
                            <Link to={`/settings/email-settings`}>Email settings</Link>
                        </li>
                        <li>
                            <Link to={`/settings/email-template`}>Email templates</Link>
                        </li>
                        <li>
                            <Link to={`/settings/user-access`}>User access</Link>
                        </li>
                        <li>
                            <Link to={`/settings/tenant-emails`}>Tenant emails</Link>
                        </li>
                        <li>
                            <Link to={`/settings/properties`}>Properties</Link>
                        </li>
                        <li>
                            <Link to={`/settings/vendor-coi`}>Vendor COI</Link>
                        </li>
                        <li>
                            <Link to={`/settings/chart-of-accounts`}>Chart of Accounts</Link>
                        </li>
                        <li>
                            <Link to={`/settings/manager-approval`}>Manager approval</Link>
                        </li>
                        <li>
                            <a onClick={this.signOut} style={{ cursor: 'pointer' }}>Log out</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

export default connect(null, { signOutAction })(Settings);
