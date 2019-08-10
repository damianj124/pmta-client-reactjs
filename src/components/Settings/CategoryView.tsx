import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {getPropertyManagersAction, addVendorCategoryAction} from '../../actions';
import Select from "react-select";
import {Form, Field, Formik} from "formik";
import * as Yup from 'yup';
import {vendorCategoryValidationSchema} from "../../utils/form/getValidationSchema";
import CategoryViewFieldCreator from "./CategoryViewFieldCreator";
import CategoryViewCheckboxFieldCreator from "./CategoryViewCheckboxFieldCreator";
import {formInitialValue} from './helpers';
import Spinner from "../Spinner";

export interface Props extends RouteComponentProps<any> {
    match: any,
    getPropertyManagersAction: any,
    properties: any;
    addVendorCategoryAction: any,
    values: any,
}

export interface State {
    property: any,
    certificate_holders: any,
    vendorCategoryNameEdit: any,
    certificateHolderEmpty: any,
    modalSpinner: any,
}

class CategoryView extends React.Component<Props, State> {
    state = {
        vendorCategoryNameEdit: false,
        property: '',
        certificate_holders: [['']],
        certificateHolderEmpty: false,
        modalSpinner:false,
    };

    componentDidMount() {
        const getProperties = this.props.getPropertyManagersAction();
        getProperties.then((res) => {
            const property = {
                label: res.data.results[0].property_name,
                value: res.data.results[0].property
            };
            this.setState({property});
        })
    }

    handelSumbmit = (values) => {
        const {certificate_holders, property} = this.state;
        const {
            claims_made, each_occourrence, damage_to_rented_premises,
            med_exp, personal_adv_injury, general_aggregate, products_comp, occur, combined_single_limit, bodily_injury_per_person,
            bodily_injury_per_accident, property_damage_per_accident, any_auto, owned_autos_only, hired_autos_only, scheduled_autos,
            non_owned_autos_only, each_occurence, aggregate, occur_umbrella, claims_made_umbrella, each_accident, disease_ea_employee,
            disease_policy_limit, per_statute, other, name
        } = values;
        this.setState({modalSpinner:true});
        let certificateHolderEmpty = false;
        certificate_holders.map((certificate)=>{
            if(!certificate[0]) {
                certificateHolderEmpty = true;
            }
        });
        if(!certificateHolderEmpty){
            const data = {
                certificate_holders,
                name,
                claims_made,
                each_occourrence: +each_occourrence,
                damage_to_rented_premises: +damage_to_rented_premises,
                med_exp: +med_exp,
                personal_adv_injury: +personal_adv_injury,
                general_aggregate: +general_aggregate,
                products_comp: +products_comp,
                occur,
                combined_single_limit: +combined_single_limit,
                bodily_injury_per_person: +bodily_injury_per_person,
                bodily_injury_per_accident: +bodily_injury_per_accident,
                property_damage_per_accident: +property_damage_per_accident,
                any_auto,
                owned_autos_only,
                hired_autos_only,
                scheduled_autos,
                non_owned_autos_only,
                each_occurence: +each_occurence,
                aggregate: +aggregate,
                occur_umbrella,
                claims_made_umbrella,
                each_accident: +each_accident,
                disease_ea_employee: +disease_ea_employee,
                disease_policy_limit: +disease_policy_limit,
                per_statute,
                other,
                // @ts-ignore
                property: property.value
            };
            this.props.addVendorCategoryAction(data).then(() => {
                this.props.history.push('/settings/vendor-coi');
                this.setState({modalSpinner:false});
            })
        } else {
            this.setState({certificateHolderEmpty: true});
            this.setState({modalSpinner:false});

        }

    };

    addNewCerHolder = () => {
        const certificate_holders = this.state.certificate_holders;
        certificate_holders.push(['']);
        this.setState({certificate_holders});
    };

    onCHInpChange = (e, i) => {
        const certificate_holders = this.state.certificate_holders;
        certificate_holders[i][0] = e.target.value;
        this.setState({certificate_holders});
    };

    onSelectChange = (name: string, value) => {
        // @ts-ignore
        this.setState({[name]: value})
    };

    render() {
        const {certificate_holders, vendorCategoryNameEdit, property,certificateHolderEmpty} = this.state;
        const {properties} = this.props;
        const pros = properties && properties.map((pro) => {
            return {value: pro.property, label: pro.property_name}
        }) || [];
        const InitialValue = {name: this.props.match.params.name, ...formInitialValue};
        return (
            <div className="page-content vendor-category">
                {this.state.modalSpinner &&
                // @ts-ignore
                <div style={{position:'fixed',width:'100%',height:"100%",top:'0',left:'0',zIndex:'1000000'}}>
                  <Spinner/>
                </div>
                }
                <h1 className="page-title">settings</h1>
                <span className="page-icon">
                <i className="icon-settings"/>
            </span>
                <div className="main-content mt-6">
                    <Formik
                        {...[this.props]}
                        enableReinitialize
                        initialValues={InitialValue}
                        // validate={validate(validationSchema)}
                        validationSchema={Yup.object().shape(vendorCategoryValidationSchema)}
                        onSubmit={(values) => this.handelSumbmit(values)}
                    >
                        {({errors, touched, values, ...rest}) => {
                            return (
                                <Form>
                                    <h2 className="page-subtitle">vendor COI</h2>
                                    <div className="category">
                                        <div className="flex align-center mb-7">
                                            <p className="category-name">Vendor Category: {!vendorCategoryNameEdit &&
                                            <span className="ml-4 text-capitalize">{values['name']}</span> ||
                                            <span className="text-field primary">
                                            <Field type="text" name='name'/> </span>}</p>
                                            <a className="color-black underline"
                                               onClick={() => this.setState({vendorCategoryNameEdit: !vendorCategoryNameEdit})}>{!vendorCategoryNameEdit && 'edit' || 'save'}</a>
                                        </div>
                                        <p className="holders">Required Certificate Holders</p>
                                        {certificateHolderEmpty && <p>Certificate holder is required</p>}
                                        {certificate_holders.map((ch, index) => {
                                            return (
                                                <div key={index} className="text-field primary">
                                                    <input value={ch} type="text"
                                                           onChange={(e) => this.onCHInpChange(e, index)}
                                                           placeholder="add certificate holder"/>
                                                </div>
                                            )
                                        })}

                                        <a onClick={this.addNewCerHolder}
                                           className="color-black inline-block mb-7 pt-3">+ add another required
                                            certificate holder</a>
                                        <ul className="options">
                                            <li>
                                                <label className="checkbox axis">
                                                    <input type="checkbox" className="checkbox-control"
                                                           name="searchable"/>
                                                    <span className="check-icon">{''}</span>
                                                    <span className="checkbox-label">+ MUST be named in Certificate Holder section</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="checkbox axis">
                                                    <input type="checkbox" className="checkbox-control"
                                                           name="searchable"/>
                                                    <span className="check-icon">{''}</span>
                                                    <span className="checkbox-label">+ can be mentioned in the Description of Operations</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="category">
                                        <p className="holders">Minimum limits</p>
                                        <p className="mb-9">Select as many or as little necessary requirements below</p>
                                        <p className="category-name">Commercial General Liability</p>
                                        <p className="info-text">Select the required boxes and relevant information </p>
                                        <ul className="category-list">
                                            <CategoryViewFieldCreator labelName={"each occurrence"} errors={errors}
                                                                      touched={touched} keyName={'each_occourrence'}/>
                                            <CategoryViewFieldCreator labelName={"damage to rented premises"}
                                                                      errors={errors} touched={touched}
                                                                      keyName={'damage_to_rented_premises'}/>
                                            <CategoryViewFieldCreator labelName={"Med Exp"} errors={errors}
                                                                      touched={touched} keyName={'med_exp'}/>
                                            <CategoryViewFieldCreator labelName={"Personal & Adv Injury"}
                                                                      errors={errors} touched={touched}
                                                                      keyName={'personal_adv_injury'}/>
                                            <CategoryViewFieldCreator labelName={"General Aggregate"} errors={errors}
                                                                      touched={touched} keyName={'general_aggregate'}/>
                                            <CategoryViewFieldCreator labelName={"Products - Comp/OP AGG"}
                                                                      errors={errors} touched={touched}
                                                                      keyName={'products_comp'}/>
                                        </ul>
                                        <ul className="category-options">
                                            <CategoryViewCheckboxFieldCreator labelName={"CLAIMS MADE"}
                                                                              keyName={'claims_made'}/>
                                            <CategoryViewCheckboxFieldCreator labelName={"OCCUR"} keyName={'occur'}/>
                                        </ul>
                                    </div>
                                    <div className="category">
                                        <p className="category-name">Automobile Liability</p>
                                        <p className="mb-9">Select the required boxes and relevant information </p>
                                        <ul className="category-list">
                                            <CategoryViewFieldCreator labelName={"combined single limit"}
                                                                      errors={errors} touched={touched}
                                                                      keyName={'combined_single_limit'}/>
                                            <CategoryViewFieldCreator labelName={"Bodily Injury (per person)"}
                                                                      errors={errors} touched={touched}
                                                                      keyName={'bodily_injury_per_person'}/>
                                            <CategoryViewFieldCreator labelName={"Bodily Injury (per accident)"}
                                                                      errors={errors} touched={touched}
                                                                      keyName={'bodily_injury_per_accident'}/>
                                            <CategoryViewFieldCreator labelName={"Property damage (per accident)"}
                                                                      errors={errors} touched={touched}
                                                                      keyName={'property_damage_per_accident'}/>
                                        </ul>
                                        <ul className="category-options">
                                            <CategoryViewCheckboxFieldCreator labelName={"ANY AUTO"}
                                                                              keyName={'any_auto'}/>
                                            <CategoryViewCheckboxFieldCreator labelName={"OWNED AUTOS ONLY"}
                                                                              keyName={'owned_autos_only'}/>
                                            <CategoryViewCheckboxFieldCreator labelName={"HIRED AUTOS ONLY"}
                                                                              keyName={'hired_autos_only'}/>
                                            <CategoryViewCheckboxFieldCreator labelName={"SCHEDULED AUTOS"}
                                                                              keyName={'scheduled_autos'}/>
                                            <CategoryViewCheckboxFieldCreator labelName={"NON-OWNED AUTOS ONLY"}
                                                                              keyName={'non_owned_autos_only'}/>
                                        </ul>
                                    </div>
                                    <div className="category">
                                        <p className="category-name">Umbrella Liability</p>
                                        <p className="info-text">Select the required boxes and relevant information </p>
                                        <ul className="category-list ml-10 pl-2">
                                            <CategoryViewFieldCreator labelName={"each occurrence"} errors={errors}
                                                                      touched={touched} keyName={'each_occurence'}/>
                                            <CategoryViewFieldCreator labelName={"aggregate"} errors={errors}
                                                                      touched={touched} keyName={'aggregate'}/>
                                        </ul>
                                        <ul className="category-options">
                                            <CategoryViewCheckboxFieldCreator labelName={"claims-made"}
                                                                              keyName={'claims_made_umbrella'}/>
                                            <CategoryViewCheckboxFieldCreator labelName={"occur"}
                                                                              keyName={'occur_umbrella'}/>
                                        </ul>
                                    </div>
                                    <div className="category">
                                        <p className="category-name">Workers Compensation</p>
                                        <p className="info-text">Select the required boxes and relevant information </p>
                                        <ul className="category-list ml-10">
                                            <CategoryViewFieldCreator labelName={"E.L. EACH ACCIDENT"} errors={errors}
                                                                      touched={touched} keyName={'each_accident'}/>
                                            <CategoryViewFieldCreator labelName={"E.L. DISEASE - EA EMPLOYEE"}
                                                                      errors={errors} touched={touched}
                                                                      keyName={'disease_ea_employee'}/>
                                            <CategoryViewFieldCreator labelName={"E.L. DISEASE - POLICY LIMIT"}
                                                                      errors={errors} touched={touched}
                                                                      keyName={'disease_policy_limit'}/>
                                        </ul>
                                        <ul className="category-options">
                                            <CategoryViewCheckboxFieldCreator labelName={"PER STATUTE"}
                                                                              keyName={'per_statute'}/>
                                            <CategoryViewCheckboxFieldCreator labelName={"OTHER"} keyName={'other'}/>

                                        </ul>
                                    </div>
                                    {properties &&
                                    <div className="flex justify-end">
                                      <div className="select-box">
                                        <span className="label">select a property:</span>
                                        <Select value={property} name='selectedProperty'
                                                onChange={(value) => this.onSelectChange('property', value)}
                                                options={pros}/>
                                      </div>
                                    </div>}
                                    <button type='submit'> SAVE</button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        properties: state.settings.properties,
    }
};

export default connect(mapStateToProps, {getPropertyManagersAction, addVendorCategoryAction})(CategoryView);
