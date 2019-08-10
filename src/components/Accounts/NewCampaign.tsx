import * as React from 'react';
import { RouteComponentProps} from "react-router";
import { connect } from "react-redux";
import { sendNewCampaign } from "../../actions/settings";


export interface Props {
    sendNewCampaign: any;
    campaignFailure: any;
}


class NewCampaign extends React.Component<Props & RouteComponentProps, {}> {

    state = {
        fileOne: '',
        fileOneName: '',
        fileTwo: '',
        fileTwoName: '',
        period: '',
        error: ''
    };

    changeHandler = (e: any) => {
        if(e.target.type === 'file') {
            const name = e.target.name;
            const file = e.target.files[0];
            this.setState({ [name]: file, [name + 'Name']: file.name});
            // const reader = new FileReader();
            // reader.onload = (event: any) => {
            //     this.setState({ [name]: event.target.result });
            // };
            // reader.readAsDataURL(file);
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    };

    onSubmitHandler = () => {
        if(this.state.fileOne && this.state.fileTwo && this.state.period) {
            const data = new FormData();
            this.setState({error: ''});
            data.append('lease_file',  this.state.fileOne);
            data.append('aging_file',  this.state.fileTwo);
            // data.append('property',  '1');
            data.append('past_due_date',  this.state.period);

            this.props.sendNewCampaign(data).then(() => {
                this.props.history.push('/account/new-campaign/accounts-receivable');
            });
        } else{
            this.setState({error: 'All fields are required.'})
        }
    };

    render() {
        const {campaignFailure} = this.props;
        return (
            <div className="page-content new-campaign">
                <h1 className="page-title">accounts receivable</h1>
                <span className="page-icon"><i className="icon-account"/></span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">new campaign</h2>
                    <h6 className="page-desc">
                        AR CAMPAIGNS LET YOU KNOW WHICH TENANTS STILL OWE ON PAST DUE
                        CHARGES AND AUTOMATES TENANT OUTREACH TO ENSURE PAYMENT IS RECEIVED
                        IN A TIMELY MANNER.
                    </h6>
                    <div className="items">
                        <div className="item">
                            <p className="label">
                                <span className="number">1</span>
                                Attach your most recent lease ledger here
                                <span className="sign"><i className="icon-info-icon-2"/></span>
                            </p>
                            <div className="file-upload-secondary">
                                <div className="image-upload-wrap">
                                    <label htmlFor="file-upload-1" className="file-upload-label">
                                        <input
                                            onChange={ this.changeHandler }
                                            name='fileOne'
                                            id="file-upload-1"
                                            className="file-upload-input"
                                            type="file"
                                        />
                                    </label>
                                    <div className="drag-text">
                                        {
                                            !this.state.fileOneName ?  <p className="text">
                                                drop approval doc here <span>(or choose file)</span>
                                            </p> : <p className="text">{this.state.fileOneName}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <p className="label">
                                <span className="number">2</span>
                                Attach your most recent aging report here
                                <span className="sign"><i className="icon-info-icon-2"/></span>
                            </p>
                            <div className="file-upload-secondary">
                                <div className="image-upload-wrap">
                                    <label htmlFor="file-upload-2" className="file-upload-label">
                                        <input
                                            onChange={ this.changeHandler }
                                            name='fileTwo'
                                            id="file-upload-2"
                                            className="file-upload-input"
                                            type="file"
                                        />
                                    </label>
                                    <div className="drag-text">
                                        {
                                            !this.state.fileTwoName ?  <p className="text">
                                                drop approval doc here <span>(or choose file)</span>
                                            </p> : <p className="text">{this.state.fileTwoName}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <p className="label">
                                <span className="number">3</span>
                                Select past due date range:
                            </p>
                            <ul className="date-range">

                                <li>
                                    <div className="radio-buttons">
                                        <input
                                            onChange={ this.changeHandler }
                                            value='00-30-days'
                                            type="radio"
                                            className="checkbox-control"
                                            id="first-period"
                                            name="period"
                                        />
                                        <label htmlFor="first-period" className="main-label">
                                            <span className="custom">00-30</span> days
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="radio-buttons">
                                        <input
                                            onChange={ this.changeHandler }
                                            type="radio"
                                            value='31-60-days'
                                            className="checkbox-control"
                                            id="second-period"
                                            name="period"
                                        />
                                        <label htmlFor="second-period" className="main-label">
                                            <span className="custom">31-60</span> days
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="radio-buttons">
                                        <input
                                            onChange={ this.changeHandler }
                                            type="radio"
                                            value='61-90-days'
                                            className="checkbox-control"
                                            id="third-period"
                                            name="period"
                                        />
                                        <label htmlFor="third-period" className="main-label">
                                            <span className="custom">61-90</span> days
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="radio-buttons">
                                        <input
                                            onChange={ this.changeHandler }
                                            type="radio"
                                            value='over-90-days'
                                            className="checkbox-control"
                                            id="forth-period"
                                            name="period"
                                        />
                                        <label htmlFor="forth-period" className="main-label">
                                            <span className="custom">over 90</span> days
                                        </label>
                                    </div>
                                </li>
                                <li>

                                    <div className="radio-buttons">
                                        <input
                                            onChange={ this.changeHandler }
                                            type="radio"
                                            value='select all'
                                            className="checkbox-control"
                                            id="all-periods"
                                            name="period"
                                        />
                                        <label htmlFor="all-periods" className="main-label">
                                            <span className="custom">select all</span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {campaignFailure &&
                            <p style={{color: 'red'}}>
                                {campaignFailure}
                            </p>
                        }
                        <p style={{color: 'red'}}>
                            {this.state.error}
                        </p>
                    </div>
                    <div>
                        <button onClick={this.onSubmitHandler} className="btn filled primary w-sm">continue</button>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        campaignFailure: state.settings.campaignFailure,
    }
};

export default connect(mapStateToProps, { sendNewCampaign })(NewCampaign);
