import * as React from 'react';
import {connect} from "react-redux";
import {getCoisErrorAction,sendErrorEmailAction} from "../../actions/settings";
import Spinner from "../Spinner";
import {RouteComponentProps} from "react-router";

export interface Props extends RouteComponentProps<any> {
    getCoisErrorAction: any,
    match: any,
    coisError: any,
    sendErrorEmailAction: any,


}

class CoisEmailCheck extends React.Component <Props> {
    state = {
        textAreaValue: '',
        email: '',
        files: [],
        subject: '',
        emailErr: false,
        subjectErr: false,
        textAreaErr: false,
        insuredArray: {
            coi_file_name: ''
        },
    };

    componentDidMount(): void {
        const prom = this.props.getCoisErrorAction(this.props.match.params.id);
        prom.then(coi => {
            const coisError = coi.errors[0];
            let arrayOfObjectErrors = coisError.filter((err) => {
                // @ts-ignore
                const values = Object.values(err);
                const keys = Object.keys(err);
                return keys.length === 1 && !Array.isArray(values[0]) && keys[0] !== 'sent_notes' && values[0]
            });
            const arrayOfErrors = coisError.filter((err) => {

                // @ts-ignore
                const values = Object.values(err);
                const keys = Object.keys(err);

                return keys.length === 1 &&  Array.isArray(values[0]) && values[0]
            });
            for (const arrayOfError of arrayOfErrors) {

                // @ts-ignore
                const arrOFemailValues = Object.values(arrayOfError)[0].map(err=> {
                    const emailStr = Object.keys(err).filter(str=> {
                        return str.search('email') !== -1 && str
                    });
                   // @ts-ignore
                    return {[emailStr]:err[emailStr]};
                });
                // @ts-ignore
                arrayOfObjectErrors = arrayOfObjectErrors.concat(arrOFemailValues);
            }
            const insuredArray = coisError.filter((err) => {
                return err.cois_id && err
            });
            if(insuredArray[0]){
                this.setState({insuredArray: insuredArray[0]});
            }
            let textArea = '';

            textArea += insuredArray[0].insured_email + '\n\n';

            for(const str of arrayOfObjectErrors){
                // @ts-ignore
                const val = Object.values(str);
                textArea += '• ' + val[0] + '\n'
            }
            textArea += '\nA corrected certificate is required before any work can be done.\n\nThe COI is attached here.\n\n\n' + 'Thank you,';
            this.setState({textAreaValue:textArea})
        })
    }

    onChange = (e) => {
        const validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        switch(e.target.type) {
            case "file":
                const files:any[] = [];
                for (const file of e.target.files){
                    files.push(file);
                }

                this.setState({[e.target.name]: [...this.state[e.target.name], ...files]});
                break;
            case "email":
                // @ts-ignore
                this.setState({emailErr: !validation.test(e.target.value), [e.target.name]: e.target.value});
                break;
            case "text":
                this.setState({subjectErr: !e.target.value, [e.target.name]: e.target.value});
                break;
            default:
                this.setState({[e.target.name]: e.target.value})
        }
    };

    deleteAttachedFile = (id:number) => {
        const {files} = this.state;
        if(files[id]) {
            delete files[id];
            this.setState({files});
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {email,textAreaValue, subject} = this.state;
        const {match} = this.props;
        const validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(validation.test(email) && textAreaValue && subject){
            const context = '<pre>' + textAreaValue + '</pre>';

            const data = new FormData();
            data.append("email", email);
            data.append("context", context);
            data.append("subject", subject);
            data.append("cois_id", match.params.id);
            for (const file of this.state.files) {
                data.append("files", file);
            }

            this.props.sendErrorEmailAction(data).then(() => {
                this.props.history.push('/cois');
            });
            this.setState({emailErr: false,textAreaErr: false, subjectErr:false});
        } else {
            this.setState({emailErr: !validation.test(email),textAreaErr: !textAreaValue, subjectErr: !subject});
        }
    };

    render() {
        const {coisError} = this.props;
        const {files, insuredArray} = this.state;
        return !coisError && <Spinner/> || (
            <div className="page-content check-email">
                <h1 className="page-title">cois</h1>
                <span className="page-icon"><i className="icon-cois"/></span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">cois</h2>
                    <div className="cois-email">
                        <form action="">
                            <div className={"text-field icon half-width " + (this.state.emailErr ? "invalid" : '')}>

                                <input type="email" value={this.state.email} onChange={this.onChange} name='email'/>
                                {this.state.emailErr && <p className="error-text">Filed is required</p>}

                                <span className="input-icon color-black">to:</span>
                            </div>
                            <div className={"text-field outline " + (this.state.subjectErr ? "invalid" : '')}>
                                <input type="text" placeholder="Subject" onChange={this.onChange} name="subject"/>
                                {this.state.subjectErr && <p className="error-text">Filed is required</p>}
                            </div>
                            <div className={"manage-email text-field column align-end " + (this.state.textAreaErr ? "invalid" : '')}>
                                <textarea value={this.state.textAreaValue} onChange={this.onChange} name='textAreaValue'/>
                                    {this.state.textAreaErr && <p className="error-text relative">Filed is required</p>}
                            </div>
                            <div className="flex justify-between manage-section">
                                <div className="files">
                                    <ul className="attachments">
                                        {insuredArray.coi_file_name &&
                                            <li>
                                                <i className="icon-attachment color-black mr-5">{''}</i>
                                                <button className="btn-simple color-black" type="button">
                                                    {insuredArray.coi_file_name}
                                                </button>
                                            </li>
                                        }
                                        {
                                            files.map((file, i) => {
                                                // @ts-ignore
                                                const name = file.name;
                                                // @ts-ignore
                                                const size = (file.size/1024).toFixed(2);
                                                return (
                                                    <li key={i}>
                                                        <button className="btn-simple font-sm" type="button" onClick={() => {this.deleteAttachedFile(i)}}><i
                                                            className="icon-delete color-warning mr-3">{''}</i></button>
                                                        <i className="icon-attachment color-black mr-5">{''}</i>
                                                        <button className="btn-simple color-black" type="button">
                                                            {name} ({size} kb)
                                                        </button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <span className="file-upload-tertiary">
                                        <label className="file-upload-label">
                                            <input type="file"
                                                   name='files'
                                                   onChange={this.onChange}
                                                   multiple/>
                                            + add attachment
                                        </label>
                                    </span>
                                </div>
                                <button className="btn filled black h-sm w-xxs" onClick={this.handleSubmit}>send now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        coisError: state.settings.coisError,
    }
};

export default connect(mapStateToProps, {getCoisErrorAction,sendErrorEmailAction})(CoisEmailCheck);
