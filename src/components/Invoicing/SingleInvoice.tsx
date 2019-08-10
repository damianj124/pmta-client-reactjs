import * as React from 'react';
import {connect} from "react-redux";
import {getSinglePastInvoiceAction ,removeInvoiceAction} from "../../actions/settings";
import { Slide } from 'react-slideshow-image';
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

export interface Props {
    invoiceData: any,
    unhandledData: any,
    getSinglePastInvoiceAction: any,
    pastSingleInvoices: any,
    pending: boolean,
    match: any,
    removeInvoiceAction: any,
}

class SingleInvoice extends React.Component<RouteComponentProps & Props, {}> {

    state = {
        dropAreaClassName: '',
        listeners: false
    };

    componentDidMount() {
        this.props.getSinglePastInvoiceAction(this.props.match.params.id);
    }

    downloadURI(uri, name) {
        const url = window.URL.createObjectURL(new Blob([uri]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        link.click();
    }

    onDownloadPdf = () => {

        axios({
            url: this.props.pastSingleInvoices.file,
            method: 'GET',
            responseType: 'blob', // important
        }).then(result => {
            this.downloadURI(result.data,'file.pdf');
        })
    };
    deleteInvoice = () => {
        const res = this.props.removeInvoiceAction(this.props.match.params.id);
        res.then(()=> this.props.history.push('/invoicing'))
    };
    render() {
        if(!this.props.pastSingleInvoices) {
            return <Spinner />
        }
        const SlideProperties = {
            duration: 10000000000,
            // transitionDuration: 500,
            infinite: false,
            indicators: true,
            arrows: true
        };

        const { image } = this.props.pastSingleInvoices;
        return (
            <div className="page-content single-invoice">
                <h1 className="page-title">Invoicing</h1>
                <span className="page-icon"><i className="icon-invoice"/></span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">invoicing</h2>
                    <h6 className="page-desc">manage your invoices here</h6>
                    <div className="view-container">
                        <div className="view-actions">
                            <a onClick={this.onDownloadPdf}>
                                <i className="icon-pdf">
                                    <span className="path1" />
                                    <span className="path2" />
                                    <span className="path3" />
                                    <span className="path4" />
                                    <span className="path5" />
                                </i>
                                <span>Download PDF</span>
                            </a>
                            <Link to={'/audit-report/' + this.props.match.params.id}>
                                <i className="icon-file"/>
                                <span>Audit Report</span>
                            </Link>
                            <a onClick={this.deleteInvoice} className="delete"><span>Delete</span></a>
                        </div>
                        <div className="pdf-view">
                            <Slide {...SlideProperties}>
                                {
                                    image.map(d => {
                                        return (
                                            <div key={d} >
                                                <img src={d} alt=""/>
                                            </div>
                                        );
                                    })
                                }
                            </Slide>
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

export default connect(mapStateToProps, { getSinglePastInvoiceAction ,removeInvoiceAction})(SingleInvoice);
