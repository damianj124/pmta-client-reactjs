import * as React from 'react';
import {connect} from "react-redux";
import {getSinglePastCoiAction, removeCoiAction} from "../../actions/settings";
import { Slide } from 'react-slideshow-image';
import { RouteComponentProps } from "react-router";
// import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

export interface Props {
    getSinglePastCoiAction: any;
    pastSingleCoi: any;
    match: any;
    removeCoiAction(id:number);
}

class SingleCoi extends React.Component<RouteComponentProps & Props, {}> {
    componentDidMount() {
        this.props.getSinglePastCoiAction(this.props.match.params.id);
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
            url: this.props.pastSingleCoi.file,
            method: 'GET',
            responseType: 'blob', // important
        }).then(result => {
            this.downloadURI(result.data,'file.pdf');
        })
    };

    deleteCoi = () => {
        const res = this.props.removeCoiAction(this.props.match.params.id);
        res.then(()=> this.props.history.push('/cois'))
    };

    render() {
        if(!this.props.pastSingleCoi) {
            return <Spinner />
        }
        const SlideProperties = {
            duration: 10000000000,
            // transitionDuration: 500,
            infinite: false,
            indicators: true,
            arrows: true
        };

        const { image } = this.props.pastSingleCoi;
        return (
            <div className="page-content single-invoice">
                <h1 className="page-title">COI</h1>
                <span className="page-icon"><i className="icon-invoice"/></span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">COI</h2>
                    <h6 className="page-desc">manage your COI here</h6>
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
                            {/*<Link to={'/audit-report/' + this.props.match.params.id}>*/}
                                {/*<i className="icon-file"/>*/}
                                {/*<span>Audit Report</span>*/}
                            {/*</Link>*/}
                            <a onClick={this.deleteCoi} className="delete"><span>Delete</span></a>
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
        pastSingleCoi: state.settings.pastSingleCoi
    };
};

export default connect(mapStateToProps, { getSinglePastCoiAction, removeCoiAction })(SingleCoi);
