import * as React from 'react';
import {connect} from 'react-redux';
import {sendInvoiceFileAction, getPastInvoiceAction, getSearchedInvoiceAction} from '../../actions/settings';
import {RouteComponentProps} from "react-router";
import ReactPaginate from 'react-paginate';


export interface Props {
    sendInvoiceFileAction: any,
    getPastInvoiceAction: any,
    getSearchedInvoiceAction: any,
    searchedInvoices: any,
    pastInvoices: any,
    invoicePageCount: any
}

export interface State {
    files: any,
    names: any,
    dropAreaClassName: any,
    error: any,
    searchValue: any,
}

class Invoicing extends React.Component<Props & RouteComponentProps, State> {

    state = {
        files: [],
        names: '',
        dropAreaClassName: '',
        error: null,
        searchValue: '',
    };

    componentDidMount() {
        this.props.getPastInvoiceAction(0);
        setTimeout(() => {
            const dropArea: any = document.querySelector('#drop-area');
            dropArea.addEventListener('dragenter', e => {
                this.prevent(e);
                this.setState({dropAreaClassName: 'bordered'});
            }, false);
            dropArea.addEventListener('dragleave', e => {
                this.prevent(e);
                this.setState({dropAreaClassName: ''});
            }, false);
            dropArea.addEventListener('dragover', e => {
                this.setState({dropAreaClassName: 'bordered'});
                this.prevent(e);

            }, false);
            dropArea.addEventListener('drop', e => {
                this.prevent(e);
                const dt = e.dataTransfer;
                const files = dt.files;
                this.changeHandler({target: {files, type: 'file'}});

            }, false);
        }, 0);
    };

    prevent(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    onChange = (e) => {
        this.props.getSearchedInvoiceAction(e.target.value,0);
        this.setState({searchValue: e.target.value});
    };

    changeHandler = (e: any) => {
        if (e.target.type === 'file') {
            const files = e.target.files;
            let names = '';
            for (const f of files) {
                names = names + f.name + '\n';
            }
            const data = new FormData();
            for (const file of files) {
                data.append("files", file);
            }

            const unhandledData = {files, names};
            this.props.sendInvoiceFileAction(data, unhandledData, true);

            this.setState({files, names});
            this.props.history.push('/uploaded-invoices');
        }
    };

    onSubmitHandler = () => {
        if (this.state.files.length > 0) {
            const data = new FormData();
            for (const file of this.state.files) {
                data.append("files", file);
            }

            this.props.history.push('/uploaded-invoices/view-invoice');
            this.props.sendInvoiceFileAction(data);
        } else {
            this.setState({error: 'All fields are required.'})
        }
    };

    goToAudit = (id) => {
        this.props.history.push('/single-invoice/' + id);
    };
    pageChange = (data) => {
        if(this.state.searchValue){
            this.props.getSearchedInvoiceAction(this.state.searchValue,data.selected);
        }else {
            this.props.getPastInvoiceAction(data.selected);
        }
    };

    render() {
        const {searchedInvoices, pastInvoices} = this.props;
        const {searchValue} = this.state;
        const invoices = searchValue && searchedInvoices || pastInvoices && pastInvoices;
        return (
            <div className="page-content invoice">
                <h1 className="page-title">Invoicing</h1>
                <span className="page-icon"><i className="icon-invoice"/></span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">invoicing</h2>
                    <h6 className="page-desc">manage your invoices here</h6>
                    <form action="" className="upload-form">
                        <div id='drop-area' className="file-upload-primary">
                            <div className={"image-upload-wrap " + this.state.dropAreaClassName}>
                                <label htmlFor="file-upload" className="file-upload-label">
                                    <input
                                        id="file-upload"
                                        name='file'
                                        multiple
                                        onChange={this.changeHandler}
                                        className="file-upload-input"
                                        type="file"
                                    />
                                </label>
                                <div className="drag-text">
                                    <i className="icon-pdf">
                                        <span className="path1"/>
                                        <span className="path2"/>
                                        <span className="path3"/>
                                        <span className="path4"/>
                                        <span className="path5"/>
                                    </i>
                                    {this.state.files.length === 0 && <p className="text-capitalize mt-9">
                                      drop PDF(
                                      <span className="text-lowercase">s</span>) invoice here
                                    </p>}
                                    {this.state.files.length === 0 && <p className="underline">choose file</p>}
                                    {this.state.names && <pre className="underline">{this.state.names}</pre>}
                                </div>
                            </div>
                        </div>
                        {this.state.names &&
                        <a onClick={this.onSubmitHandler} className="btn filled primary w-lg mt-6 pointer">
                          process new invoices
                        </a>}
                    </form>


                    <div className="previous-invoices flex justify-between align-center mr-10 ml-10 mt-10">
                        <p className="italic">previously processed invoices</p>
                        <div className="text-field icon">
                            <input className="italic" onChange={this.onChange}
                                   value={this.state.searchValue} placeholder="search invoices" style={{fontStyle:'normal'}} type="text"/>
                            <i className="icon-search">{""}</i>
                        </div>
                    </div>
                    <div className="table-secondary prev-invoices-table mt-4">
                        <table>
                            <thead>
                            <tr>
                                <th>Company</th>
                                <th>Building</th>
                                <th>$ Amount</th>
                                <th>Data processed</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                invoices && invoices.map(invoice => {
                                    const style = invoice.status && invoice.status === 'out_of_signature' ? {color: 'red'} : {};
                                    return (
                                        <tr style={style} className="pointer" onClick={() => this.goToAudit(invoice.id)}
                                            key={invoice.created_at}>
                                            <td data-label="Company">{invoice.company}</td>
                                            <td data-label="Building">{invoice.building}</td>
                                            <td data-label="$ Amount">{invoice.amount}</td>
                                            <td data-label="Data processed">{new Date(invoice.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                        <ReactPaginate previousLabel={"previous"}
                                       nextLabel={"next"}
                                       breakLabel={"..."}
                                       breakClassName={"break-me"}
                                       pageCount={this.props.invoicePageCount && this.props.invoicePageCount || 1}
                                       marginPagesDisplayed={2}
                                       pageRangeDisplayed={5}
                                       onPageChange={this.pageChange}
                                       containerClassName={"pagination"}
                                       subContainerClassName={"pages pagination"}
                                       activeClassName={"active"} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pastInvoices: state.settings.pastInvoices,
        searchedInvoices: state.settings.searchedInvoices,
        invoicePageCount: state.settings.invoicePageCount,
    };
};


export default connect(mapStateToProps, {sendInvoiceFileAction, getPastInvoiceAction, getSearchedInvoiceAction})(Invoicing);
