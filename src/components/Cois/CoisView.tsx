import * as React from 'react';
import SliderCarusel from "../Invoicing/Slider";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {
    Form,
    Field,
    Formik
} from 'formik'
import {
    getPropertyManagersAction,
    getVendorCategoryAction,
    addCoisDataAction,
    rewriteCoisValuesArrayAction,
    changeCoisValuesArrayAction,
    clearCoisDataStorAction
} from "../../actions";
import {coiCreator, coiValuesCreator} from "./helpers";
import ReactSelect from "./Select";
import Spinner from "../Spinner";
import * as Yup from 'yup';
import {validationSchemaForCoisVeiw} from '../../utils/form/getValidationSchema'
import CoisViewFileds from "./CoisViewFields";

export interface Props {
    coisData: any;
    getPropertyManagersAction: any;
    properties: any;
    pending: any;
    vendorCategorys: any;
    getVendorCategoryAction: any;
    addCoisDataAction: any;
    history: any;
    values: any;
    setValues: any;
    errors: any;
    touched: any;
    changeCoisValuesArrayAction: any;
    coisValues: any;
    rewriteCoisValuesArrayAction: any;

    clearCoisDataStorAction();
}

export interface State {
    currentIndex: any;
    data: any[];
    errors: any;
    certificateHolders: any;
    disabled: any;
    errorsCount: any;
    imgIndex:any;
    showslider:any;
}

class CoisView extends React.Component<Props, State> {
    state = {
        currentIndex: 0,
        data: [],
        errors: [],
        errorsCount:0,
        certificateHolders: [],
        disabled: false,
        imgIndex: 1,
        showslider:true,
    };

    componentDidMount() {
        const {pending,coisData,history} = this.props;
        const {currentIndex} = this.state;
        this.props.getPropertyManagersAction();
        this.props.getVendorCategoryAction();
        if (!pending && coisData.length === 0) {
            history.push('/cois');
        } else {
            console.log(coisData[currentIndex], 'coisData[currentIndex]')
            if (coisData[currentIndex][0].data[1].certificate_holder) {
                this.setState({
                    certificateHolders: [coisData[currentIndex][0].data[1].certificate_holder],
                    errors: [false]
                });

            } else {
                this.setState({
                    certificateHolders: [coisData[currentIndex][0].data[1].certificate_holder],
                    errors: [true],
                    errorsCount:1
                })
            }
        }

    };

    setIndex = (isPlus) => {
        const {currentIndex} = this.state;
        this.setState({currentIndex: isPlus ? currentIndex + 1 : currentIndex - 1});
    };

    addCertificateHolder = () => {
        const {certificateHolders,errors} = this.state;
        const count = this.state.errorsCount + 1;
        // @ts-ignore
        certificateHolders[certificateHolders.length] = '';
        // @ts-ignore
        errors[errors.length] = true;

          this.setState({certificateHolders,errors,errorsCount:count})
    };

    onChange = (value,ind) => {
        const {certificateHolders,errors} = this.state;
        if(value){
            console.log(errors[ind],'errors[ind]');
            const count = errors[ind] ? this.state.errorsCount - 1 : this.state.errorsCount;
            // @ts-ignore
            certificateHolders[ind] = value;
            // @ts-ignore
            errors[ind] = false;
            console.log(count);
            this.setState({certificateHolders,errors,errorsCount:count})
        }else {
            const count = this.state.errorsCount + 1;
            // @ts-ignore
            certificateHolders[ind] = value;
            // @ts-ignore
            errors[ind] = true;
            this.setState({certificateHolders,errors,errorsCount:count})
        }
    };

    onHandleSubmit = (values) => {
        if(this.state.errorsCount === 0){
            const result = this.props.coisValues;
            const coi = coiCreator(values, this.state.certificateHolders);
            result.push(coi);
            const prom = this.props.addCoisDataAction({data: result});
            prom.then(() => {
                window.scrollTo(0, 0);
                if (values.next_invoice) {
                    this.setIndex(true);
                } else if (values.prev_invoice) {
                    this.setIndex(false);
                } else {
                    this.props.clearCoisDataStorAction();
                    this.props.history.push('/cois/');
                }
            })
        }
    };

    render() {
        const {currentIndex, disabled} = this.state;
        const {coisData,properties} = this.props;
        const prop = properties && properties.map((property) => {
            return {value: property.property, label: property.property_name}
        });
        const vendorCategorys = this.props.vendorCategorys && this.props.vendorCategorys.map((vendorCategory) => {
            return {value: vendorCategory.id, label: vendorCategory.name}
        });
        if (!this.props.coisData[this.state.currentIndex]) {
            return <Spinner/>;
        }

        const d = coisData[this.state.currentIndex];
        const initValue = coiValuesCreator(d, properties, this.props.vendorCategorys);
        // const err: any = this.state.errors;
        return (!coisData && <Redirect to='/cois/'/>) ||
            (
                <div className="page-content view-invoice">
                    <h1 className="page-title">Invoicing</h1>
                    <Formik
                        {...[this.props]}
                        enableReinitialize
                        initialValues={initValue}
                        validationSchema={Yup.object().shape(validationSchemaForCoisVeiw)}
                        onSubmit={this.onHandleSubmit}
                    >
                        {({setFieldValue, values, errors, ...rest}) => {
                            return (
                                <Form action="">
                                    <div className="doc-info">
                                        <div className="doc-details">
                                            <span className="page-icon">
                                              <i className="icon-cois"/>
                                            </span>
                                            <div className="main-content mt-6">
                                                <h2 className="page-subtitle">
                                                    COI {this.state.currentIndex + 1} of {coisData.length}
                                                </h2>
                                                <p className="color-primary pb-10">click to edit any of the info
                                                    below</p>
                                                <ul className="details">
                                                    <li>
                                                        <div className="select-box mr-1">
                                                            <label htmlFor="" className="label">Building:</label>
                                                            <div className="content">
                                                                {prop &&
                                                                <ReactSelect options={prop}
                                                                             name='property_id'
                                                                             setFieldValue={(name, value) => setFieldValue('property_id', value)}
                                                                             field='property_id'
                                                                             value={values.property_id}/>
                                                                }

                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            className={"text-field primary" + (errors.insured ? ' invalid' : '')}>
                                                            <label htmlFor="" className="label">Insured:</label>
                                                            <div className="content">

                                                                <Field name='insured' type="text"/>
                                                                {errors.insured &&
                                                                <p className="error-text">This field is required *</p>}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            className={"text-field primary" + (errors.certificate_holder ? ' invalid' : '')}>
                                                            <label htmlFor="" className="label">Certificate
                                                                Holder:</label>
                                                            {this.state.certificateHolders.map((cerHolder, i) => {
                                                                return (
                                                                    <div className="content" key={i}>
                                                                        <input value={cerHolder}
                                                                               onChange={(e)=>this.onChange(e.target.value,i)}

                                                                               type="text"/>
                                                                        {this.state.errors[i] &&
                                                                        <p className="error-text">
                                                                          This field is required *
                                                                        </p>}
                                                                    </div>
                                                                )
                                                            })}

                                                        </div>
                                                    </li>
                                                    <li>
                                                    <p className="add" onClick={this.addCertificateHolder}>+ Add more certificate holders</p>
                                                    </li>
                                                    <li>
                                                        <div className="select-box mr-1">
                                                            <label htmlFor="" className="label">Vendor Category:</label>
                                                            <div className="content">
                                                                {vendorCategorys &&
                                                                <ReactSelect options={vendorCategorys}
                                                                             setFieldValue={(name, value) => setFieldValue('vendor_category_id', value)}
                                                                             field='vendor_category_id'
                                                                             name='vendor_category_id'
                                                                             value={values.vendor_category_id}/>}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="text-field primary">
                                                            <label htmlFor="" className="label">Additional insured
                                                                signed :</label>
                                                            <div className="content">
                                                                {/* <Field name='authorized_representative' type="checkbox"/>*/}
                                                                <label className="checkbox">
                                                                    <input type="checkbox"
                                                                           className="checkbox-control"
                                                                           name="authorized_representative"
                                                                    />
                                                                    <span className="check-icon">{''}</span>
                                                                    {/*       <span
                                                                        className="checkbox-label">same account # for all below:</span>*/}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <CoisViewFileds err={errors}
                                                                values={[values.each_occurence, values.damage_to_rented_premises, values.med_exp,
                                                                    values.personal_adv_injury, values.general_aggregate, values.products_comp]}
                                                                keys={['each_occurence', 'damage_to_rented_premises', 'med_exp',
                                                                    'personal_adv_injury', 'general_aggregate', 'products_comp']}
                                                                filedetName='Commercial general liability'/>
                                                <CoisViewFileds err={errors}
                                                                values={[values.aggregate, values.each_occourrence_umbrella]}
                                                                keys={['aggregate', 'each_occourrence_umbrella']}
                                                                filedetName='Umbrella Liability'/>
                                                <CoisViewFileds err={errors}
                                                                values={[values.bodily_injury_per_person, values.bodily_injury_per_accident,
                                                                    values.property_damage_per_accident, values.combined_single_limit]}
                                                                keys={['bodily_injury_per_person', 'bodily_injury_per_accident',
                                                                    'property_damage_per_accident', 'combined_single_limit']}
                                                                filedetName='Automobile Liability'/>
                                                <CoisViewFileds err={errors}
                                                                values={[values.each_accident, values.disease_ea_employee,
                                                                    values.disease_policy_limit, values.exp_date]}
                                                                keys={['each_accident', 'disease_ea_employee',
                                                                    'disease_policy_limit', 'exp_date']}
                                                                filedetName='Workers Compensation'/>
                                            </div>
                                        </div>
                                        <div className="doc-file">
                                            {this.state.showslider && <SliderCarusel data={values.image_path} />}
                                        </div>
                                    </div>
                                    {/*<div className="text-right mt-10">*/}
                                    {/*<a href="/cois/cois-warning" className="btn filled primary w-lg">process COI</a>*/}
                                    {/*</div>*/}
                                    <div className="buttons text-center">
                                        {/*{this.state.currentIndex !== 1 && <a onClick={() => this.setIndex(false)} className="btn filled dark-grey w-lg mr-4 pointer">previous invoice</a>}*/}
                                        {currentIndex !== 0 &&
                                        <a onClick={() => {
                                            setFieldValue('prev_invoice', true);
                                            this.setState({showslider:false});
                                            this.setState({showslider:true});
                                        }
                                        }
                                           className="btn filled primary w-lg mr-4 pointer">previous
                                          COI</a>}
                                        <button className="btn filled grey w-md mr-3">process all COIs at once</button>
                                        {currentIndex + 1 === coisData.length &&
                                        <button type='submit' disabled={disabled}
                                                className="btn filled primary w-md">process COI</button>}
                                        {currentIndex + 1 !== coisData.length &&
                                        <button type='submit' name="next_invoice" value="true"
                                                onClick={() => {
                                                    setFieldValue('next_invoice', true);
                                                    this.setState({showslider:false});
                                                    this.setState({showslider:true});
                                                }
                                                }
                                                className="btn filled primary w-md">next COI</button>}
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        coisData: state.settings.coisData,
        pending: state.settings.pending,
        properties: state.settings.properties,
        vendorCategorys: state.settings.vendorCategorys,
        coisValues: state.settings.coisValues,
    }
};

export default connect(mapStateToProps, {
    getPropertyManagersAction,
    getVendorCategoryAction,
    addCoisDataAction,
    clearCoisDataStorAction,
    changeCoisValuesArrayAction,
    rewriteCoisValuesArrayAction,
})(CoisView);