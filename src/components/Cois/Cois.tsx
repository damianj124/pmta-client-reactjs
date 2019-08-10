import * as React from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import ReactSelect from "../Invoicing/Select";
import {connect} from 'react-redux';
import Spinner from "../Spinner";
import ReactPaginate from 'react-paginate';
import {
    getPropertyManagersAction,
    getCoisAction,
    getCoisErrorsAction,
    sendNewCoisFileAction,
    getCoisFilesAction,
    sendCoisFileAction,
    getCoisDataAction,
    getAllVendorCategoryAction,
    stopPennding
} from "../../actions";
import Results from "../../utils/models/Results.model";
import {UploadedCois} from "../../utils/models/Cois.model";
import ProcessedCoiView from './ProcessedCoiView';

export interface Props {
    pending: boolean;
    stopPennding: any;
    properties: any;
    getPropertyManagersAction: any;
    getCoisAction: any;
    cois: any;
    coiPageCount: any;
    coisErrors: any;
    getCoisErrorsAction: any;
    getAllVendorCategoryAction:any;
    vendorCategorys:any;
    coisUploadedFiles: Results<UploadedCois>;
    sendNewCoisFileAction(data, unhandledData, fromCois);
    getCoisFilesAction();
    getCoisDataAction(data);
    sendCoisFileAction(data, unhandledData, fromCois);
}

export interface State {
    property: any;
    searchValue: any;
}

const ENTER_KEY = 13;

class Cois extends React.Component <Props & RouteComponentProps, State> {
    state = {
        property: '',
        propertyItem: '',
        sort: {value: 'processed_at', label: 'date added'},
        searchValue: '',
    };

    searchData = () => {
        return {
            property: this.state.propertyItem,
            search: this.state.searchValue,
            [this.state.sort.value]:0,
        }
    };

    async componentDidMount() {
        this.props.getAllVendorCategoryAction();
        const prom = this.props.getPropertyManagersAction();
        const resp = await prom;
        // @ts-ignore
        await this.setState( {propertyItem: resp.data.results[0].property});
        this.props.getCoisAction(this.searchData());
        this.props.getCoisErrorsAction(resp.data.results[0].property);
        this.setState({property:{value: resp.data.results[0].property, label: resp.data.results[0].property_name}});
        this.props.getCoisFilesAction();
        this.props.stopPennding();
    }


    handleChange = async (name, value) => {
        if (name === 'property') {
            // @ts-ignore
            await this.setState({[name]: value, propertyItem: value.value});
            this.props.getCoisAction(this.searchData());
            this.props.getCoisErrorsAction(value.value);
        } else {
            // @ts-ignore
            await this.setState({[name]: value});
            this.props.getCoisAction(this.searchData());
        }


    };

    onSearchInpCHange = (e) => {
        this.setState({searchValue: e.target.value});
    };

    onSearchInpKeyUp = (e) => {
        if (e.keyCode === ENTER_KEY) {
            this.onClickSearchIcon();
        }
    };

    onClickSearchIcon = () => {
        this.props.getCoisAction(this.searchData());
    };

    onProcessNewCoi = (e) => {
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
            this.props.sendNewCoisFileAction(data, unhandledData, true).then(this.props.getCoisFilesAction);
        }
    };

    onClickToNext = (id:number) => {
        this.props.getCoisDataAction({pk:id}).then(() => {
            this.props.history.push('/cois/upload-cois');
        });
    };

    goToViewPage = (id) => {
        this.props.history.push('/single-coi/' + id);
    };

    pageChange = (page) => {
        const data = this.searchData();
        data.page = page.selected + 1;
        this.props.getCoisAction(data);
    };


    render() {
        const {property, sort, searchValue} = this.state;
        const {properties, cois, coisErrors, coisUploadedFiles, pending, vendorCategorys} = this.props;
        const prop = properties && properties.map((pro) => {
                return {value: pro.property, label: pro.property_name}
            });
        const vendCategorys = vendorCategorys && vendorCategorys.map((vend) => {
            return {value: vend.id, label: vend.name}
        });
        return !cois && <Spinner/> || (
                <div className="page-content invoice cois">
                    <h1 className="page-title" data-aos="fade-in">cois</h1>
                    <span className="page-icon">
                      <i className="icon-cois"/>
                    </span>
                    {pending && <Spinner />}
                    <div className="main-content mt-6">
                        <h2 className="page-subtitle">cois</h2>
                        <h6 className="page-desc">manage your cois here</h6>
                        <form action="" className="upload-form">

                     {/*       <Link className="btn filled primary w-lg mt-6 mr-4" to="/cois/upload-cois">process new cois</Link>*/}
           {/*                 <button type='button' className="btn filled primary w-lg mt-6 mr-4" onClick={this.onProcessNewCoi}>process new cois</button>*/}
                            <span className="file-upload-tertiary">
                                <label className="file-upload-label">
                                    <input type="file"
                                           name='file'
                                           onChange={this.onProcessNewCoi}/>
                                        + File upload
                                    </label>
                            </span>
                        </form>
                        {coisErrors && !!coisErrors.erors_cois_count &&
                        <div className="block-warning flex align-center justify-center mt-10 pb-10">
                            <i className="icon-exclamation mr-2">{''}</i>
                            <p className="text-warning mr-6">THERE
                                ARE {coisErrors && coisErrors.erors_cois_count} DEFICIENT CERTIFICATES ON FILE FOR THIS
                                BUILDING</p>
                            {
                                // @ts-ignore

                                <Link to={'/cois/cois-warning/' + this.state.property.value}>view</Link>

                            }
                        </div>
                        }
                        <div className="previous-cois mr-3 mt-10">
                            <p className="italic mb-9">Uploaded COIS</p>
                        </div>
                        <div className="table-secondary mt-4 uploaded-cois-table">
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Processed Cois count</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {coisUploadedFiles && coisUploadedFiles.results && coisUploadedFiles.results.map((coi,index) => {
                                    const arr = coi.file.split('/');
                                    return (
                                        <tr key={index}>
                                            <td data-label="Name"><a href={coi.file} target="_blank">{arr[arr.length - 1]}</a></td>
                                            <td data-label="Status">{coi.status}</td>
                                            <td data-label="Status">{coi.processed_count.successed_cois_count + '/' + coi.processed_count.cois_count}</td>
                                            <td data-label="Action">{coi.status === 'success' && <button className="btn filled primary h-sm w-sm mt-5" onClick={()=> {this.onClickToNext(coi.id)}}>Next</button>}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className="previous-cois mr-3 mt-10">
                            <p className="italic mb-9">COIs on file</p>
                            <div className="flex justify-between align-center options">
                                {/* Please add select box here */}
                                <div className="select-box no-outline no-bg">
                                    {properties &&
                                    <ReactSelect options={prop}
                                                 setFieldValue={(name, value) => this.handleChange('property', value)}
                                                 field='property'
                                                 value={property}/>
                                    }
                                </div>
                                <div className="flex align-center justify-end half-width data">
                                    <div className="select-box no-outline no-bg mr-2">
                                        <ReactSelect
                                            options={[
                                                {value: 'processed_at', label: 'date added'},
                                                {value: 'exp_date', label: 'expires'},
                                                {value: 'company', label: 'company'},
                                                {value: 'category', label: 'category'}
                                            ]}
                                            setFieldValue={(name, value) => this.handleChange('sort', value)}
                                            field='sort'
                                            value={sort}/>
                                    </div>
                                    <div className="text-field primary icon no-bg no-margin">
                                        <input className="italic" placeholder="search COIs" type="text" value={searchValue}
                                               onChange={this.onSearchInpCHange} onKeyUp={this.onSearchInpKeyUp}/>
                                        <i className="icon-search" onClick={this.onClickSearchIcon}>{""}</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-secondary mt-4 uploaded-cois-table">
                            <table>
                                <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Date Added</th>
                                    <th>Expires</th>
                                    <th>Category</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cois && cois.map((coi,index) => {
                                    return <ProcessedCoiView key={index}
                                                             coi={coi}
                                                             goToViewPage={this.goToViewPage}
                                                             vendCategorys={vendCategorys}
                                    />
                                })}
                                </tbody>
                            </table>
                            <ReactPaginate previousLabel={"previous"}
                                           nextLabel={"next"}
                                           breakLabel={"..."}
                                           breakClassName={"break-me"}
                                           pageCount={this.props.coiPageCount && this.props.coiPageCount || 1}
                                           marginPagesDisplayed={2}
                                           pageRangeDisplayed={5}
                                           onPageChange={this.pageChange}
                                           containerClassName={"pagination"}
                                           subContainerClassName={"pages pagination"}
                                           activeClassName={"active"} />
                        </div>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        coisData: state.settings.coisData,
        properties: state.settings.properties,
        pending: state.settings.pending,
        cois: state.settings.cois,
        coiPageCount: state.settings.coiPageCount,
        coisErrors: state.settings.coisErrors,
        coisUploadedFiles: state.settings.coisUploadedFiles,
        vendorCategorys: state.settings.vendorCategorys
    }
};

export default connect(mapStateToProps,
    {
        getPropertyManagersAction,
        getCoisAction,
        getCoisErrorsAction,
        sendNewCoisFileAction,
        getCoisFilesAction,
        sendCoisFileAction,
        getCoisDataAction,
        getAllVendorCategoryAction,
        stopPennding
    })(Cois);
