import * as React from 'react';
import {connect} from "react-redux";
// import moment from "moment";
import {getSinglePastInvoiceAction} from "../../actions/settings";
import { RouteComponentProps } from "react-router";
import Spinner from "../Spinner";
import * as moment from 'moment';

export interface Props {
    getSinglePastInvoiceAction: any,
    pastSingleInvoices: any,
    match: any
}

class AuditReport extends React.Component<RouteComponentProps & Props, {}> {

    componentDidMount() {
        this.props.getSinglePastInvoiceAction(this.props.match.params.id);
    }

    humanize(str) {
        const frags = str.split('_');
        for (let i = 0; i<frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
    }

    render() {
        const today = new Date();
        if(!this.props.pastSingleInvoices) {
            return <Spinner />
        }
        const { image, file_name, created_by, status, document_viewed_by, document_emailed_to, document_signed_by } = this.props.pastSingleInvoices;
        console.log('this.props.pastSingleInvoices: ', this.props.pastSingleInvoices);
        return (
            <div className="page-content single-invoice">
                <h1 className="page-title">Invoicing</h1>
                <span className="page-icon"><i className="icon-invoice"/></span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">invoicing</h2>
                    <h6 className="page-desc">manage your invoices here</h6>

                    <div className="view-container white-bg">
                        <div className="pdf-view inner-padd flex">
                            <div className="pdf-preview">
                                <img src={image[0]} alt=""/>
                            </div>
                            <div className="pdf-caption">
                                <h1 className="fw-300">{ file_name }</h1>
                                <h3 className="fw-300">Audit Report {today.toLocaleDateString()}</h3>
                                <table>
                                    <tr>
                                        <td>created:</td>
                                        <td>{ new Date(created_by.time).toLocaleDateString() }</td>
                                    </tr>
                                    <tr>
                                        <td>by:</td>
                                        <td>{ created_by.first_name }</td>
                                    </tr>
                                    <tr>
                                        <td>status:</td>
                                        <td>{ this.humanize(status) }</td>
                                    </tr>
                                    {/*<tr>*/}
                                        {/*<td>transaction ID:</td>*/}
                                        {/*<td>120397074</td>*/}
                                    {/*</tr>*/}
                                </table>
                            </div>
                        </div>
                        <div className="pdf-description">
                            <p className="h1">{ file_name } History</p>
                            <ul>
                                <li>
                                    <i className="icon-file"/>
                                    <p>Document created by {created_by.first_name} ({created_by.email})</p>
                                    <p>{ moment(created_by.time).format('MM/DD/YYYY - h:mm:ss A') } PST- IP address: {created_by.ip}</p>
                                </li>
                                {
                                    document_signed_by.map(signed => {
                                        return (
                                            <li key={signed.signed_date}>
                                                <i className="icon-edit"/>
                                                <p>Document e-signed by {created_by.first_name} ({signed.signed_user_email})</p>
                                                <p>Signature Date: { moment(signed.signed_date).format('MM/DD/YYYY - h:mm:ss A') } PST- Time Source:server-IP address: {signed.ip}</p>
                                            </li>
                                        );
                                    })
                                }
                                <li>
                                    <i className="icon-send-email"/>
                                    <p>Document emailed to {document_emailed_to.emailed_to[0]} for signature</p>
                                    <p>{  moment(document_emailed_to.time).format('MM/DD/YYYY - h:mm:ss A') } PST</p>
                                </li>
                                {
                                    document_viewed_by.map(doc => {
                                        return (
                                            <li key={doc.viewed_date}>
                                                <i className="icon-file"/>
                                                <p>Document viewed by {doc.viewed_by}</p>
                                                <p>{ moment(doc.viewed_date).format('MM/DD/YYYY - h:mm:ss A') } PST-IP address: {doc.ip}</p>
                                            </li>
                                        );
                                    })
                                }

                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pastSingleInvoices: state.settings.pastSingleInvoices
    };
};

export default connect(mapStateToProps, { getSinglePastInvoiceAction })(AuditReport);
