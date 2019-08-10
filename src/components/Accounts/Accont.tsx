import * as React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getDefaultTemplateAction} from "../../actions";

export interface Props {
    defaultTemplate: any;
    getDefaultTemplateAction();
}

class Accont extends React.Component<Props> {
    componentDidMount(): void {
        this.props.getDefaultTemplateAction();
    }

    render() {
        const {defaultTemplate} = this.props;
        return (
            <div className="page-content account-receivable">
                <h1 className="page-title">accounts receivable</h1>
                <span className="page-icon">
                    <i className="icon-account"/>
                </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">accounts receivable campaigns</h2>
                    <h6 className="page-desc">
                        AR Campaigns let you know which tenants still owe on past due
                        charges and automates tenant outreach to ensure payment is received
                        in a timely manner.
                    </h6>
                    {!defaultTemplate &&
                        <p>You have not default template. Please <Link style={{color: 'blue'}} to={"/settings/email-template"} > add </Link> it.</p>
                    }
                    {defaultTemplate &&
                        <Link
                            to={"account/new-campaign"}
                            className="btn filled primary w-lg mt-6"
                        >
                            create new campaign
                        </Link>
                    }
                </div>
            </div>
        );
    }
};


const mapStateToProps = state => {
    return {
        defaultTemplate: state.settings.defaultTemplate
    };
};


export default connect(mapStateToProps, { getDefaultTemplateAction })(Accont);

