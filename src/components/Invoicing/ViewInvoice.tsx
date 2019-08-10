import * as React from 'react';
import ReactSelect from "./Select";
import SelectMA from '../Settings/Select'
import ReactMultiSelect from "./MultiSelect";
import SliderCarusel from "./Slider";
import Modal from "react-responsive-modal";
import {connect} from 'react-redux';
import {
    getGlAccAction,
    getApprovalDocumentsAction,
    sendInvoiceData,
    getPropertyManagersAction,
    getManagerApprovalAction,
    addGlAccountAction,
    addManagerApprovalAction,
    addApprovalDocumentAction, getPropertiesAction
} from '../../actions';
import {Form, Formik, Field} from "formik";
import validate from "../../utils/form/validate";
import getValidationSchema from "../../utils/form/getValidationSchema";
import {RouteComponentProps} from "react-router";
import Spinner from "../Spinner";
import UserData from "../../utils/models/UserData.model";


export interface Props {
    invoiceData: any;
    getGlAccAction: any;
    glAccs: any;
    approvalDocs: any;
    managerApproval: any;
    getApprovalDocumentsAction: any;
    getManagerApprovalAction: any;
    addGlAccountAction: any;
    getPropertyManagersAction: any;
    properties: any;
    pending: any;
    sendInvoiceData: any;
    addManagerApprovalAction: any;
    addApprovalDocumentAction: any;
    validateForm: any;
    userData: UserData;
}

export interface State {
    openAppDoc: any,
    open: any,
    openPropManag: any,
    property: any,
    currentIndex: any,
    edit: any,
    data: any[],
    errors: any,
    disabled: any,
    errorGlAccount: any,
    glIndex: any
    manAppNone: any,
    files: any,
    imgIndex: any,
    showslider: any,
}


class ViewInvoice extends React.Component<RouteComponentProps & Props, State> {
    state = {
        openAppDoc: false,
        open: false,
        openPropManag: false,
        property: null,
        currentIndex: 0,
        edit: true,
        manAppNone: false,
        imgIndex: 1,
        data: [],
        errors: {},
        glIndex: 0,
        errorGlAccount: false,
        disabled: false,
        files: [],
        showslider: true,
    };

    componentDidMount() {
        // const d:any = [...this.state.data];
        // this.props.getGlAccAction(d[this.state.currentIndex].building);
        this.props.getApprovalDocumentsAction();
        this.props.getManagerApprovalAction();
        this.props.getPropertyManagersAction();
        if (!this.props.pending && !this.props.invoiceData) {
            this.props.history.push('/invoices');
        }
    };

    onSubmitAppDoc = (values) => {
        const data = new FormData();
        // @ts-ignore
        data.append("file", this.state.files);
        data.append("name", values.name);
        // @ts-ignore
        data.append("property", this.state.data[0].building.value);

        const appDoc = this.props.addApprovalDocumentAction(data);
        appDoc.then((resp) => {
            this.props.getApprovalDocumentsAction();
            const res = this.state.data;
            const {id, name} = resp.data;
            // @ts-ignore
            res[0].approvalDocuments = {value: id, label: name};
            this.setState({
                data: res,
                openAppDoc: false,
            });
        })

    };

    onSubmit = values => {
        const {managerApproval} = this.props;
        const data: any = [...this.state.data];
        this.props.addManagerApprovalAction({
            name: values.name,
            email: values.email,
            property: values.property.value
        }).then(() => {
            this.setState({openPropManag: false});
            this.props.getManagerApprovalAction();
            data[this.state.currentIndex].managerApproval = [...data[this.state.currentIndex].managerApproval, {
                value: managerApproval[managerApproval.length - 1].id + 1,
                label: values.name
            }];
            this.setState({data});
            this.isValid();
        })
    };

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false, property: null});
    };

    setData = () => {
        const {userData, invoiceData} = this.props;
        if (this.state.data.length === 0) {
            const data = invoiceData.map(d => {
                const buildingObj = (d[1].building_list.find(b => b.name === d[0][0].building));
                const building = buildingObj ? {value: buildingObj.id, label: buildingObj.name}
                    : {value: d[1].building_list[0].id, label: d[1].building_list[0].name};
                let am: any = 0;
                const glAccounts = d[0][0].owed.map(o => {
                    am = am + Number.parseFloat(o.replace(',', ''));
                    return ({
                        name: '',
                        price: Number.parseFloat(o.replace(',', '')).toFixed(2)
                    });
                });

                if (glAccounts.length === 0) {
                    glAccounts.push({name: '', price: ''});
                }

                const initData = {
                    building,
                    ammount: am.toFixed(2),
                    image_path: d[0][0].image_path,
                    digitalStamp: true,
                    approvalDocuments: '',
                    notes: '',
                    company: '',
                    submitted: false,
                    glAccounts,
                    invoice_pdf_file: d[2].invoice_pdf_file,
                    property_id: d[1].building_list[0].id,
                    fees: false,
                    tax: false,
                    totalTax: '',
                    totalFees: ''
                };

                if (userData.manager_approval_settings) {
                    initData['managerApproval'] = '';
                }

                return initData;
            });
            this.props.getGlAccAction(data[this.state.currentIndex].building.value);
            this.setState({data});
        }
        // this.isValid();
    };

    incrementGlAccount = () => {
        const data: any = [...this.state.data];
        data[this.state.currentIndex].glAccounts.push({name: '', price: ''});
        this.setState({data, errorGlAccount: false});
    };

    decrementGlAccount = index => {
        const data: any = [...this.state.data];

        if (data[this.state.currentIndex].glAccounts.length === 1 && data[this.state.currentIndex].totalTax && Number(data[this.state.currentIndex].totalTax) > 0) {
            return this.setState({errorGlAccount: true});
        }
        this.setState({errorGlAccount: false});

        const price = Number(data[this.state.currentIndex].glAccounts[index].price);
        data[this.state.currentIndex].glAccounts.splice(index, 1);

        data[this.state.currentIndex].ammount = (Number(data[this.state.currentIndex].ammount) - price).toFixed(2);

        this.setState({data});
    };

    isValid = () => {
        let error = false;
        // let glError = false;
        const data: any = this.state.data[this.state.currentIndex];
        console.log(data)
        const errors: any = {};
        for (const key in data) {
            if (key === 'glAccounts') {
                errors.glAccounts = [];
                for (const d of data[key]) {

                    // if (!Boolean(d.name)) {
                    //     glError = true;
                    // }

                    errors.glAccounts.push({name: !Boolean(d.name), price: !Boolean(d.price)});
                    if (!d.price || !d.name) {
                        error = true;
                    }
                }
            } else {
                if (!data[key]
                    && key !== 'fees'
                    && key !== 'tax'
                    && key !== 'totalFees'
                    && key !== 'totalTax' &&
                    key !== 'notes' &&
                    key !== 'invoice_pdf_file'
                    && key !== 'property_id' &&
                    key !== 'digitalStamp' &&
                    key !== 'image_path' &&
                    'approvalDocuments' !== key
                    && 'managerApproval' !== key
                ) {

                    errors[key] = true;
                    error = true;
                }
            }
        }

        if (data.submitted) {
            this.setState({errors});
            // if (errors.company) {
            //     window.scrollTo(0, 400);
            // }
            //
            // if (glError) {
            //     window.scrollTo(0, 500);
            // }

            return error;
        }
        return false;
    };

    componentDidUpdate(): void {
        if (!this.state.showslider) {
            this.setState({showslider: true});
        }
    }

    setIndex = (isPlus) => {
        const data: any = [...this.state.data];
        data[this.state.currentIndex].submitted = true;
        this.setState({data});
        if (isPlus && this.isValid()) {
            return;
        }
        this.setState((prevState: any) => {
            return {currentIndex: isPlus ? prevState.currentIndex + 1 : prevState.currentIndex - 1}
        })
    };

    addGlHandler = values => {
        const data = {
            gl_code: values.gl_code,
            gl_account: values.gl_account,
            property: values.property.value
        };
        this.changeHandler('building', values.property);
        this.props.addGlAccountAction(data).then(async res => {
            const d: any = [...this.state.data];
            await this.props.getGlAccAction(d[this.state.currentIndex].building.value);
            this.onCloseModal();
            this.changeHandler('glAccounts', {
                value: res.data.id,
                label: res.data.gl_account
            }, this.state.glIndex, 'name');
            d[this.state.currentIndex].glAccounts[this.state.glIndex].name = {
                value: res.data.id,
                label: res.data.gl_account
            };
            this.setState({data: d});
            this.transformGlAccounts(d[this.state.currentIndex].glAccounts);
            this.isValid();
        });

    };

    changeHandler = (name: any, value: any, index?: any, field?: any) => {
        this.isValid();
        const data: any = [...this.state.data];
        if (name === 'managerApproval') {

            const addValue = value.filter(val => {
                return val.value === 0 && val
            });
            const noneValue = value.filter(val => {
                return val.value === 1 && val
            });

            if (addValue.length > 0) {
                this.setState({openPropManag: true});
            } else if (noneValue.length > 0 && !this.state.manAppNone) {
                this.setState({manAppNone: true});
                data[this.state.currentIndex][name] = [{value: 1, label: 'none'}];
                this.setState({data});
            } else {
                value = value.filter(val => {
                    return val.value !== 1 && val;
                });
                data[this.state.currentIndex][name] = value;
                this.setState({data, manAppNone: false});
            }
            if (value.length === 0) {
                this.setState({errors: {managerApproval: true}})
            } else {
                this.setState({errors: {managerApproval: false}})
            }

        } else if (name === 'glAccounts') {
            if (value.value === '0') {
                this.onOpenModal();
                this.setState({glIndex: index})
            } else {

                let currentPrice = Number(String(data[this.state.currentIndex][name][index][field]).replace('-', ''));
                if (String(data[this.state.currentIndex][name][index][field]).indexOf('-') !== -1) {
                    currentPrice = currentPrice - (currentPrice * 2)
                }
                if (field === 'price') {
                    if (Number(value) < 0) {
                        data[this.state.currentIndex][name][index][field] = value;
                        data[this.state.currentIndex].ammount = (Number(data[this.state.currentIndex].ammount)
                            - currentPrice + Number(value)).toFixed(2);

                    } else if (value === '-') {
                        data[this.state.currentIndex][name][index][field] = value;

                        data[this.state.currentIndex].ammount = (Number(data[this.state.currentIndex].ammount)
                            - currentPrice).toFixed(2);

                    } else if ((!Number.isNaN(Number(data[this.state.currentIndex].ammount))
                        && !Number.isNaN(currentPrice)
                        && !Number.isNaN(Number(value)))) {
                        data[this.state.currentIndex][name][index][field] = value;

                        data[this.state.currentIndex].ammount = (Number(data[this.state.currentIndex].ammount)
                            - currentPrice + Number(value)).toFixed(2);

                    }
                    this.setState({data});

                } else {
                    data[this.state.currentIndex][name][index][field] = value;

                    this.setState({data});
                }
                this.isValid();
            }
        } else if (name === 'approvalDocuments') {
            if (value.value === 0) {
                this.setState({openAppDoc: true});
            } else {
                data[this.state.currentIndex][name] = value;
                this.setState({data});
                this.isValid();
            }
        } else {
            data[this.state.currentIndex][name] = value;
            this.setState({data});
            this.isValid();
        }

        if (name === 'building') {
            this.props.getGlAccAction(value.value);
            for (const g of data[this.state.currentIndex]['glAccounts']) {
                g['name'] = '';
            }
            data[this.state.currentIndex]['managerApproval'] = "";
        }
    };

    transformGlAccounts = (glAccounts): any => {
        const glAccountObj: any = {};

        for (const acc of glAccounts) {

            if (acc.name.value && this.props.glAccs) {
                const name: any = this.props.glAccs.find(d => d.id === acc.name.value);
                if (name && name.gl_code) {
                    glAccountObj[name.gl_code] = glAccountObj[name.gl_code] ? glAccountObj[name.gl_code] + Number(acc.price) : Number(acc.price)
                }
            }
        }
        const glAccount: any = [];

        for (const key of Object.keys(glAccountObj)) {
            glAccount.push({id: key, price: glAccountObj[key]})
        }
        return glAccount;
    };

    sendInvoiceData = () => {
        const datas: any = [...this.state.data];
        datas[this.state.currentIndex].submitted = true;
        this.setState({data: datas});

        if (this.isValid()) {
            return;
        }
        const data: any = this.state.data.map((d: any, i) => {
            // const glAccountIds = d.gl_account.map(gl => gl.name);
            const glAccountObj = {};

            for (const acc of d.glAccounts) {
                const taxA = !acc.nonTax ? (Number(acc.price) * (Number(d.totalTax) / Number(this.getAmount(i)))).toFixed(2) : 0;
                const feeA = !acc.nonFees ? (Number(acc.price) * (Number(d.totalFees) / Number(this.getAmount(i)))).toFixed(2) : 0;
                glAccountObj[acc.name.value + ''] = glAccountObj[acc.name.value + ''] ? glAccountObj[acc.name.value + ''] + (Number(acc.price) + Number(taxA) + Number(feeA)) : (Number(acc.price) + Number(taxA) + Number(feeA))
            }
            const glAccount: any = [];

            for (const key of Object.keys(glAccountObj)) {
                glAccount.push({id: key, price: glAccountObj[key]})
            }


            let managerApprov: any = [];
            if (d.managerApproval) {
                if (d.managerApproval.map) {
                    managerApprov = d.managerApproval.map(a => a.value);
                } else {
                    managerApprov = [d.managerApproval.value]
                }

            }
            return [{
                building: d.building.label,
                digital_stamp: Number(d.digitalStamp),
                ammount: d.ammount,
                invoice_pdf_file: d.invoice_pdf_file,
                approval_document: d.approvalDocuments.value || [],
                approval_attachments: managerApprov[0] !== 1 && managerApprov || [],
                company: d.company,
                notes: d.notes,
                image_path: d.image_path,
                gl_account: glAccount,
                property_id: d.property_id
            }]
        });
        this.setState({disabled: true});
        this.props.sendInvoiceData({data}).then(() => this.props.history.push('/invoicing'));
    };

    getAmount(d) {
        let amount = 0;
        const index = d !== 'none' ? d : this.state.currentIndex;
        const currentData: any = this.state.data[index];

        currentData.glAccounts.map((gl, i) => {
            if (!currentData.glAccounts[i].nonTax) {
                amount += Number(gl.price);
            }
        });
        return amount;
    };

    onClickSameAccount = event => {
        const data: any = [...this.state.data];
        const glAccount = data[this.state.currentIndex].glAccounts;

        if (event.target.checked) {
            const errors = this.state.errors;
            // @ts-ignore
            errors.glAccounts = errors.glAccounts && errors.glAccounts.map((gA) => {
                return {name: false, price: gA.price};
            });
            const firstGlAccountName = glAccount[0].name;
            data[this.state.currentIndex].glAccounts = glAccount.map(gl => {
                return {...gl, name: firstGlAccountName}
            });
            this.setState({data, errors});
        }
    };

    render() {
        const MenegerApprovalinitialValues = {
            name: '',
            email: '',
            property: ''
        };
        const ApprovalDocInitialValues = {
            name: '',
            file: '',
        };
        const {open, openPropManag, openAppDoc} = this.state;
        const err: any = this.state.errors;
        const {invoiceData} = this.props;
        const properties = this.props.properties && this.props.properties.map((property) => {
            return {id: property.property, label: property.property_name}
        });
        const {userData} = this.props;

        if (!invoiceData) {
            return <Spinner/>;
        }
        this.setData();
        if (!this.state.data) {
            return <Spinner/>;
        }

        const buildingList = this.props.invoiceData[this.state.currentIndex][1].building_list.map(b => ({
            value: b.id,
            label: b.name
        }));
        const currentData: any = this.state.data[this.state.currentIndex];
        if (!currentData) {
            return <Spinner/>;
        }

        // managerApproval
        const {building, fees, tax, totalTax, totalFees, company, ammount, image_path, digitalStamp, notes, approvalDocuments, managerApproval, glAccounts} = currentData;
        let totalPrice = 0;
        for (const glAccount of glAccounts) {
            const taxA = !glAccount.nonTax ? (glAccount.price * (totalTax / this.getAmount('none'))).toFixed(2) : 0;
            const feeA = !glAccount.nonFees ? (glAccount.price * (totalFees / this.getAmount('none'))).toFixed(2) : 0;
            if (glAccount.name) {
                totalPrice += ((+taxA || +feeA) && (+glAccount.price) + +taxA + +feeA) || +glAccount.price;
            }
        }
        let appDocs = [];
        if (this.props.approvalDocs) {
            appDocs = this.props.approvalDocs.map(d => ({value: d.id, label: d.name}))
        }
        let manApproval = [];
        if (this.props.managerApproval) {
            manApproval = this.props.managerApproval.map(d => ({value: d.id, label: d.name}))
        }

        let glAcc: any = [];
        if (this.props.glAccs) {
            glAcc = this.props.glAccs.map(d => ({value: d.id, label: d.gl_account + '-' + d.gl_code}));
        }
        glAcc.push({value: '0', label: 'Add New'});
        let properts: any = [];
        if (this.props.properties) {
            properts = this.props.properties.map(d => ({value: d.property, label: d.property_name}));
        }
        return (
            <div className="page-content view-invoice">
                <h1 className="page-title">Invoicing</h1>
                {this.state.disabled && <Spinner/>}
                <form action="">
                    <div className="doc-info">
                        <div className="doc-details">
                          <span className="page-icon">
                            <i className="icon-invoice"/>
                          </span>
                            <div className="main-content mt-6">
                                <h2 className="page-subtitle">
                                    invoice {this.state.currentIndex + 1} of {invoiceData.length}
                                </h2>
                                <ul className="details">
                                    <li>
                                        <div className={"select-box mr-1" + (err.building ? ' invalid' : '')}>
                                            <label htmlFor="" className="label">Building:</label>
                                            <div className="content">
                                                <ReactSelect options={buildingList}
                                                             setFieldValue={(name, value) => this.changeHandler('building', value)}
                                                             field='building'
                                                             value={building}/>
                                                {err.building && <p className="error-text">This field is required *</p>}
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={"text-field primary" + (err.company ? ' invalid' : '')}>
                                            <label htmlFor="" className="label">Company:</label>
                                            <div className="content">
                                                {!this.state.edit && <p>{company}</p>}
                                                {this.state.edit && <input type="text" value={company}
                                                                           onChange={e => this.changeHandler('company', e.target.value)}/>}
                                                {err.company && <p className="error-text">This field is required *</p>}
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        glAccounts.map((gl, i) => {
                                            const eName = err.glAccounts && err.glAccounts[i] && err.glAccounts[i].name;
                                            const ePrice = err.glAccounts && err.glAccounts[i] && err.glAccounts[i].price;
                                            const taxA = !glAccounts[i].nonTax ? (glAccounts[i].price * (totalTax / this.getAmount('none'))).toFixed(2) : 0;
                                            const feeA = !glAccounts[i].nonFees ? (glAccounts[i].price * (totalFees / this.getAmount('none'))).toFixed(2) : 0;

                                            return (
                                                <li key={i} className="">
                                                    <div className="flex gl-info">
                                                        <div className="flex justify-between column gl-account">
                                                            <div className="flex align-center">
                                                                <i onClick={() => this.decrementGlAccount(i)}
                                                                   className="icon-delete icon">{""}</i>
                                                                <span className="label">G/L Account Number:</span>
                                                            </div>
                                                            <div
                                                                className={"select-box mr-1" + (eName ? ' invalid' : '')}>
                                                                <div className="content">
                                                                    <ReactSelect options={glAcc}
                                                                                 setFieldValue={(name, value) => this.changeHandler('glAccounts', value, i, 'name')}
                                                                                 field='glAccounts'
                                                                                 value={glAccounts[i].name}/>
                                                                    {eName &&
                                                                    <p className="error-text">This field is required
                                                                      *</p>}
                                                                    {this.state.errorGlAccount &&
                                                                    <p className="error-text">Incorrect entry</p>}
                                                                    {(i === 0) &&
                                                                    <div>
                                                                      <label className="checkbox">
                                                                        <input type="checkbox"
                                                                               className="checkbox-control"
                                                                               name="sameAccount"
                                                                               onClick={this.onClickSameAccount}
                                                                        />
                                                                        <span className="check-icon">{''}</span>
                                                                        <span
                                                                          className="checkbox-label">same account # for all below:</span>
                                                                      </label>
                                                                    </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pl-5 half-width">
                                                            <ul className="label-list">
                                                                <li>Amount</li>
                                                                <li>Tax / Fees</li>
                                                                <li>Subtotals</li>
                                                            </ul>
                                                            <div className="flex align-center amount-calc">
                                                                {!this.state.edit &&
                                                                <span className="price">$ {glAccounts[i].price}</span>}
                                                                {this.state.edit &&
                                                                <div
                                                                  className="text-field primary no-bg no-margin w-sm mr-2 amount">
                                                                  <span className="pr-2 currency">$</span>
                                                                  <div className="content">
                                                                    <input type="text"
                                                                           name='glAccounts'
                                                                           value={glAccounts[i].price}
                                                                           onChange={e => this.changeHandler('glAccounts', e.target.value, i, 'price')}
                                                                           maxLength={18}
                                                                    />

                                                                  </div>
                                                                    {ePrice &&
                                                                    <p className="error-text">This field is required
                                                                      *</p>}
                                                                </div>}
                                                                <div className="amount">
                                                                    <p>{(+taxA || +feeA) && +glAccounts[i].price + +taxA + +feeA || 0}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between gl-info">
                                                        <div className="main-table gl-table half-width">
                                                            <table>
                                                                <thead>
                                                                <tr>
                                                                    <th>{''}</th>
                                                                    <th>{''}</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {tax && <tr>
                                                                  <td>
                                                                    <label className="checkbox">
                                                                      <input type="checkbox"
                                                                             onChange={e => this.changeHandler('glAccounts', e.target.checked, i, 'nonTax')}
                                                                             className="checkbox-control"
                                                                             name="searchable"/>
                                                                      <span className="check-icon">{''}</span>
                                                                      <span
                                                                        className="checkbox-label">non-tax item</span>
                                                                    </label>
                                                                  </td>
                                                                  <td className="text-right">tax:</td>
                                                                </tr>}
                                                                {fees && <tr>
                                                                  <td>
                                                                    <label className="checkbox">
                                                                      <input type="checkbox"
                                                                             onChange={e => this.changeHandler('glAccounts', e.target.checked, i, 'nonFees')}
                                                                             className="checkbox-control"
                                                                             name="searchable"/>
                                                                      <span className="check-icon">{''}</span>
                                                                      <span
                                                                        className="checkbox-label">non-fee item</span>
                                                                    </label>
                                                                  </td>
                                                                  <td className="text-right">fees:</td>
                                                                </tr>}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div
                                                            className="half-width main-table gl-table amount-table pl-5">
                                                            <table>
                                                                <thead>
                                                                <tr>
                                                                    <th>{''}</th>
                                                                    <th>{''}</th>
                                                                    <th>{''}</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {tax && <tr>
                                                                  <td>{''}</td>
                                                                  <td className="yellow text-center">$ {taxA}</td>
                                                                  <td>{''}</td>
                                                                </tr>}
                                                                {fees && <tr>
                                                                  <td>{''}</td>
                                                                  <td className="green text-center">$ {feeA}</td>
                                                                  <td>{''}</td>
                                                                </tr>}
                                                                </tbody>
                                                            </table>
                                                            <ul className="label-list pl-5">
                                                                <li>{''}</li>
                                                                <li>{''}</li>
                                                                <li className="black">{(+taxA || +feeA) && (+glAccounts[i].price) + +taxA + +feeA || +glAccounts[i].price}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })
                                    }
                                    <li>
                                        {tax && <div className="text-field primary mr-1">
                                          <i className="icon-delete icon" onClick={() => {
                                              this.changeHandler('tax', false);
                                              this.changeHandler('totalTax', '')
                                          }}>{""}</i>
                                          <span className="label">Total Tax:</span>
                                          <div className="content">
                                            <input value={totalTax} autoFocus={true} placeholder="0"
                                                   onChange={e => this.changeHandler('totalTax', e.target.value)}
                                                   type="text"/>
                                          </div>
                                        </div>}
                                        {fees && <div className="text-field primary mr-1">
                                          <i className="icon-delete icon" onClick={() => {
                                              this.changeHandler('fees', false);
                                              this.changeHandler('totalFees', '')
                                          }}>{""}</i>
                                          <span className="label">Additional Fees:</span>
                                          <div className="content">
                                            <input value={totalFees} autoFocus={true} placeholder='0'
                                                   onChange={e => this.changeHandler('totalFees', e.target.value)}
                                                   type="text"/>
                                          </div>
                                        </div>}
                                    </li>
                                    <li>
                                        <a className="add pointer" onClick={this.incrementGlAccount}>+ Add another
                                            G/L</a>
                                    </li>
                                    {!tax && <li onClick={() => this.changeHandler('tax', true)}>
                                      <a className="add pointer">+ Add tax</a>
                                    </li>}
                                    {!fees && <li onClick={() => this.changeHandler('fees', true)}>
                                      <a className="add pointer">+ Add additional fees (shippping)</a>
                                    </li>}
                                    <li>
                                        <div className={"text-field primary" + (err.ammount ? ' invalid' : '')}>
                                            <label htmlFor="" className="label">Amount:</label>
                                            <div className="content">
                                                <input type="text" value={ammount}
                                                       onChange={e => this.changeHandler('ammount', e.target.value)}/>
                                                {err.ammount && <p className="error-text">This field is required *</p>}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="flex align-center">
                                        <span className="label">Digital stamp:</span>
                                        <div className="switch">
                                            <input type="checkbox"
                                                   name="switch"
                                                   className="switch-checkbox"
                                                   id="switch"
                                                   onChange={e => this.changeHandler('digitalStamp', e.target.checked)}
                                                   checked={digitalStamp}/>
                                            <label className="switch-label" htmlFor="switch">
                                                <span className="switch-inner"/>
                                            </label>
                                        </div>
                                    </li>
                                    {userData.manager_approval_settings && <li>
                                      <div
                                        className={"select-box managers" + (err.managerApproval ? ' invalid' : '')}>
                                        <span className="label">Manager Approval:</span>
                                        <div className="content">
                                            {manApproval.length > 0 && <ReactMultiSelect
                                              options={[{value: 0, label: "Add New"}, {
                                                  value: 1,
                                                  label: 'none'
                                              }, ...manApproval]}
                                              value={managerApproval}
                                              setFieldValue={this.changeHandler}
                                              field='managerApproval'/>}

                                        </div>
                                      </div>
                                    </li>}
                                    <li>
                                        <div className={"select-box"}>
                                            <span className="label">Approval Document:</span>
                                            <div className="content">
                                                <ReactSelect setFieldValue={this.changeHandler}
                                                             field='approvalDocuments'
                                                             value={approvalDocuments}
                                                             options={[{
                                                                 value: 0,
                                                                 label: '+ add document'
                                                             }, ...appDocs]}/>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <label className="mb-6 inline-block">Notes:</label>
                                        <div className="text-field">
                                            <textarea value={notes}
                                                      onChange={e => this.changeHandler('notes', e.target.value)}/>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Modal
                            classNames={{
                                overlay: "custom-overlay",
                                modal: "custom-modal"
                            }}
                            open={openPropManag}
                            onClose={() => {
                                this.setState({
                                    openPropManag: false,
                                })
                            }}
                            center
                        >
                            {/* Add manager pop up content start */}
                            <div className="popup manager-access-popup">
                                <span onClick={() => {
                                    this.setState({
                                        openPropManag: false,
                                    })
                                }} className="close">X</span>
                                <p className="popup-heading white mb-8">Manager access</p>

                                <Formik
                                    initialValues={MenegerApprovalinitialValues}
                                    validate={validate(getValidationSchema)}
                                    onSubmit={this.onSubmit}
                                    render={props => {
                                        const {
                                            values,
                                            handleChange,
                                            handleBlur,
                                            touched,
                                            errors,
                                        } = props;
                                        return (
                                            <Form className="col s12">
                                                <div className="form-fields mb-2">
                                                    <div className="text-field primary">
                                                        <label htmlFor="name" className="white">manager's name:</label>
                                                        <div className="content">
                                                            <input value={values.name}
                                                                   onChange={handleChange}
                                                                   onBlur={handleBlur}
                                                                   id="name"
                                                                   type="text"/>
                                                            {touched.name && errors.name &&
                                                            <p className="error-text relative">{errors.name}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="text-field primary ">
                                                        <label htmlFor="email" className="white">email address:</label>
                                                        <div className="content">
                                                            <input value={values.email}
                                                                   onChange={handleChange}
                                                                   onBlur={handleBlur}
                                                                   id="email"
                                                                   type="text"/>
                                                            {touched.email && errors.email &&
                                                            <p className="error-text relative">{errors.email}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="select-box primary invalid">
                                                        <label htmlFor="title" className="white">property:</label>
                                                        <div className="content">
                                                            <SelectMA field='property' {...props} options={properties}/>
                                                            {touched.property && errors.property &&
                                                            <p className="error-text relative">{errors.property}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center pt-10 buttons">
                                                    <a style={{cursor: 'pointer'}} onClick={() => {
                                                        this.setState({
                                                            openPropManag: false,
                                                        })
                                                    }} className="btn filled cancel-popup w-md mr-4">cancel</a>
                                                    <button type='submit' className="btn filled primary w-md">add
                                                    </button>
                                                </div>
                                            </Form>
                                        )
                                    }}
                                />
                            </div>
                            {/* Add manager pop up content end */}
                        </Modal>
                        {/* Doc file section start */}
                        <div className="doc-file">
                            {this.state.showslider && <SliderCarusel data={image_path}/>}
                            {/* Doc file section end */}

                            {/* Digital stamp table start */}
                            <div className="table-secondary stamp-table mt-8">
                                <p className="mb-2">Digital Stamp</p>
                                {/*add css*/}
                                <p className="total flex justify-between">Total <span
                                    className="w-700 color-black">${totalPrice}</span></p>
                                <p className="w-700 text-center">{building.label}</p>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            G/L Acct. No.
                                        </th>
                                        <th>
                                            Amount
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.transformGlAccounts(glAccounts).map((d, index) => {
                                            const taxA = !glAccounts[index].nonTax ? (d.price * (totalTax / this.getAmount('none'))).toFixed(2) : 0;
                                            const feeA = !glAccounts[index].nonFees ? (d.price * (totalFees / this.getAmount('none'))).toFixed(2) : 0;
                                            return (
                                                <tr key={d.id}>
                                                    <td>
                                                        {d.id}
                                                    </td>
                                                    <td>
                                                        $ {((+taxA || +feeA) && (d.price) + +taxA + +feeA) || d.price}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }

                                    <tr className="color-secondary">
                                        <td>
                                            Mgr Approval
                                        </td>
                                        <td>
                                            Approval Date
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className="text-center color-secondary">
                                            Notes of Description
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className="text-center">
                                            {notes}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Digital stamp table end */}
                    </div>
                    <div className="buttons text-center">
                        {/*{this.state.currentIndex !== 1 && <a onClick={() => this.setIndex(false)} className="btn filled dark-grey w-lg mr-4 pointer">previous invoice</a>}*/}
                        {this.state.currentIndex !== 0 &&
                        <a onClick={() => {
                            this.setIndex(false);
                            window.scrollTo(0, 0);
                            this.setState({showslider: false});
                        }} className="btn filled primary w-lg mr-4 pointer">previous
                          invoice</a>}
                        {this.state.currentIndex + 1 === invoiceData.length &&
                        <button onClick={this.sendInvoiceData} type='button' disabled={this.state.disabled}
                                className="btn filled primary w-lg">finish and send</button>}
                        {this.state.currentIndex + 1 !== invoiceData.length &&
                        <button type='button' onClick={() => {
                            this.setIndex(true);
                            window.scrollTo(0, 0);
                            this.setState({showslider: false});
                        }
                        }
                                className="btn filled primary w-lg">next invoice</button>}
                    </div>
                </form>
                <Modal
                    classNames={{
                        overlay: "custom-overlay",
                        modal: "custom-modal"
                    }}
                    open={open}
                    onClose={this.onCloseModal}
                    center
                >
                    {/* Add GL account number content start */}
                    <div className="popup">
                        <span onClick={this.onCloseModal} className="close">X</span>
                        <p className="popup-heading white mb-8">Add a G/L account number</p>
                        <Formik
                            initialValues={{gl_account: '', gl_code: '', property: ''}}
                            validate={validate(getValidationSchema)}
                            onSubmit={this.addGlHandler}
                            render={props => {
                                const {values, handleChange, handleBlur, touched, errors, setFieldValue} = props;
                                return (
                                    <Form className="col s12">
                                        <div className="form-fields mb-2">
                                            <div
                                                className={"text-field primary" + (touched.gl_account && errors.gl_account ? ' invalid' : '')}>
                                                <label htmlFor="name" className="white">G/L account name</label>
                                                <div className="content">
                                                    <input value={values.gl_account}
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                           id="gl_account"
                                                           type="text"/>
                                                    {touched.gl_account && errors.gl_account &&
                                                    <p className="error-text relative">{errors.gl_account}</p>}
                                                </div>
                                            </div>
                                            <div
                                                className={"text-field primary" + (touched.gl_code && errors.gl_code ? ' invalid' : '')}>
                                                <label htmlFor="gl_code" className="white">G/L number</label>
                                                <div className="content">
                                                    <input value={values.gl_code}
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                           id="gl_code"
                                                           type="text"/>
                                                    {touched.gl_code && errors.gl_code &&
                                                    <p className="error-text relative">{errors.gl_code}</p>}
                                                </div>
                                            </div>
                                            <div className="select-box primary invalid">
                                                <label htmlFor="title" className="white">property:</label>
                                                <div className="content">
                                                    {properts.length > 0 &&
                                                    <ReactSelect value={values.property} setFieldValue={setFieldValue}
                                                                 field='property' options={properts}/>}
                                                    {touched.property && errors.property &&
                                                    <p className="error-text relative">{errors.property}</p>}
                                                </div>
                                            </div>

                                        </div>
                                        <div className="text-center mt-10 buttons">
                                            <a onClick={this.onCloseModal}
                                               className="btn filled cancel-popup w-md mr-4 pointer">cancel</a>
                                            <button type='submit' className="btn filled primary w-md">add</button>
                                        </div>
                                    </Form>
                                )
                            }}
                        />
                    </div>
                    {/* Add GL account number content end */}
                </Modal>

                <Modal
                    classNames={{
                        overlay: "custom-overlay",
                        modal: "custom-modal"
                    }}
                    open={openAppDoc}
                    onClose={() => this.setState({openAppDoc: false})}
                    center
                >
                    {/* Add approval document start */}
                    <div className="popup">
                        <span onClick={() => this.setState({openAppDoc: false})} className="close">X</span>
                        <p className="popup-heading white mb-8">Add Approval Document</p>
                        <Formik
                            initialValues={ApprovalDocInitialValues}
                            validate={validate(getValidationSchema)}
                            onSubmit={this.onSubmitAppDoc}
                            render={props => {
                                const {
                                    values,
                                    handleChange,
                                    handleBlur,
                                } = props;
                                return (
                                    <Form className="col s12">
                                        <div className="form-fields mb-2">
                                            <div className="text-field primary">
                                                <label htmlFor="name" className="white">Name:</label>
                                                <div className="content">
                                                    <input value={values.name}
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                           id="name"
                                                           type="text"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="upload-form mt-8">
                                            <div id='drop-area' className="file-upload-primary grey">
                                                <div className="image-upload-wrap">

                                                    <label htmlFor="file" className="file-upload-label">
                                                        <Field
                                                            onChange={(e) => {
                                                                const files = e.target.files[0];
                                                                this.setState({files});
                                                                handleChange('')
                                                            }}
                                                            value={values.file}
                                                            id="file"
                                                            name='file'
                                                            className="file-upload-input"
                                                            type="file"
                                                        />

                                                    </label>
                                                    {/*{(values.file && <img src={values.file} alt=""/> )||*/}
                                                    {this.state.files.length === 0 &&
                                                    <div className="drag-text">

                                                      <p className="text-capitalize mt-9">
                                                        drop PDF(
                                                        <span className="text-lowercase">s</span>) invoice here
                                                      </p>
                                                      <p className="underline">choose file</p>
                                                      <pre className="underline">{''}</pre>
                                                    </div> ||
                                                    <div className="drag-text">
                                                      <p className="text-capitalize mt-9">
                                                        Your file has been uploaded
                                                      </p>
                                                      <p className="text-capitalize mt-9">
                                                        drop PDF(
                                                        <span className="text-lowercase">s</span>) invoice here
                                                      </p>
                                                      <p className="underline">change file</p>
                                                      <pre className="underline">{''}</pre>
                                                    </div>
                                                    }
                                                    {/*}*/}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center buttons">
                                            <a onClick={() => this.setState({openAppDoc: false})}
                                               className="btn filled cancel-popup w-md mr-4 pointer">cancel</a>
                                            <button type='submit' className="btn filled primary w-md">add document
                                            </button>
                                        </div>
                                    </Form>)
                            }
                            }
                        />
                    </div>
                    {/* Add approval document content end */}
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        invoiceData: state.settings.invoiceData,
        glAccs: state.settings.glAccs,
        approvalDocs: state.settings.approvalDocs,
        managerApproval: state.settings.managerApproval,
        properties: state.settings.properties,
        pending: state.settings.pending
    };
};

export default connect(mapStateToProps, {
    getGlAccAction,
    sendInvoiceData,
    getPropertyManagersAction,
    addGlAccountAction,
    getApprovalDocumentsAction,
    getManagerApprovalAction,
    getPropertiesAction,
    addManagerApprovalAction,
    addApprovalDocumentAction
})(ViewInvoice);
