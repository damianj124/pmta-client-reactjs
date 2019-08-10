import * as React from 'react';
import {connect} from "react-redux";
import { sendInvoiceFileAction } from "../../actions/settings";
import { RouteComponentProps } from "react-router";
import Spinner from "../Spinner";


export interface Props {
    invoiceData: any,
    unhandledData: any,
    sendInvoiceFileAction: any,
    pending: boolean
}


class UploadInvoices extends React.Component<RouteComponentProps & Props, {}> {

    state = {
        dropAreaClassName: '',
        listeners: false
    };

    componentDidMount() {
        if(!this.props.pending && !this.props.invoiceData) {
            this.props.history.push('/invoicing')
        }
    }

    transformImages() {
        if (!this.state.listeners) {
            this.setState({ listeners: true });
            setTimeout(() => {
                const dropArea: any = document.querySelector('#drop-area');
                dropArea.addEventListener('dragenter', e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({ dropAreaClassName: 'bordered' });
                }, false);
                dropArea.addEventListener('dragleave', e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({ dropAreaClassName: '' });
                }, false);
                dropArea.addEventListener('dragover', e => {
                    this.setState({ dropAreaClassName: 'bordered' });
                    e.preventDefault();
                    e.stopPropagation();

                }, false);
                dropArea.addEventListener('drop', e => {
                    e.preventDefault();
                    e.stopPropagation();
                    const dt = e.dataTransfer;
                    const files = dt.files;
                    this.changeHandler({ target: { files, type: 'file' } });

                }, false);
            }, 0);
        }

        return this.props.invoiceData.map(data => {
            return data[0][0].image_path;
        });
    }

    onSubmitHandler = () => {
        // const data = new FormData();
        // for (const file of this.props.unhandledData.files) {
        //     data.append("files", file);
        // }
        //
        // this.props.sendInvoiceFileAction(data);
        // setTimeout(() => this.props.history.push('/uploaded-invoices/view-invoice'), 5000);
        this.props.history.push('/uploaded-invoices/view-invoice');
    };

    toArray(fileList) {
        return Array.prototype.slice.call(fileList);
    }

    changeHandler = (e: any) => {
        if(e.target.type === 'file') {
            const files = this.toArray(this.props.unhandledData.files).concat(this.toArray(e.target.files));
            let names = this.props.unhandledData.names;
            for(const f of files) {
                names = names + f.name + '\n';
            }
            const data = new FormData();

            for (const file of files) {
                data.append("files", file);
            }
            const unhandledData = { files, names };
            this.props.sendInvoiceFileAction(data, unhandledData);
        }
    };

    render() {
        if (!this.props.invoiceData) {
            return <Spinner />;
        }
        const images = this.transformImages();
        return (
            <div className="page-content uploaded-invoices">
                {this.props.pending && <Spinner />}
                <h1 className="page-title">Invoicing</h1>
                <span className="page-icon"> <i className="icon-invoice" /></span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">invoicing</h2>
                    <h6 className="page-desc">manage your invoices here</h6>
                    <form action="">

                            <div id='drop-area' className={"box drop-area " + this.state.dropAreaClassName}>
                                <div className="items">
                                    {
                                        images.map((image, index) => {
                                            return image.map((imagePath, i) => {
                                                return (
                                                    <div key={imagePath} className="item">
                                                        <p className="numbering">{index + 1}-{i + 1}</p>
                                                        <img src={imagePath} alt="Invoice image" className="file" />
                                                    </div>
                                                );
                                            })
                                        })
                                    }
                                </div>
                                <div className="flex align-center">
                                    <i className="icon-pdf">
                                        <span className="path1" />
                                        <span className="path2" />
                                        <span className="path3" />
                                        <span className="path4" />
                                        <span className="path5" />
                                    </i>
                                    <span className="file-upload-tertiary">
                                    <label className="file-upload-label">
                                        <input type="file"
                                               name='file'
                                               multiple
                                               onChange={ this.changeHandler}/>
                                        + add more PDF invoices
                                    </label>
                                </span>
                                </div>
                            </div>

                        <div className="text-right mt-6">
                            <button
                                type='button'
                                onClick={ this.onSubmitHandler }
                                className="btn filled primary w-lg"
                            >
                                process invoices
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        invoiceData: state.settings.invoiceData,
        pending: state.settings.pending,
        unhandledData: state.settings.unhandledData
    };
};

export default connect(mapStateToProps, { sendInvoiceFileAction })(UploadInvoices);
