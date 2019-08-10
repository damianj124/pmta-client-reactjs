import * as React from 'react';
import Modal from "react-responsive-modal";
import {connect} from 'react-redux';
import {
    addManagerToPropertyAction,
    addPropertyAction,
    getPropertyManagerPropertyAction,
    updatePropertyManagerPropertyAction
} from '../../actions';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {propertyManagerModal} from "../../utils/form/getValidationSchema";
import UserData from "../../utils/models/UserData.model";
import {PropertyManagerProperty} from "../../utils/models/Proprty.model";
import Spinner from '../Spinner';

// import ReactSelect from "./Select";
const formInitialValues = {
    id: null,
    name: '',
    address: '',
    street: '',
    city_state_zip: '',
    phone: '',
    fax: '',
    representative_title: '',
};

export interface Props {
    properties: any;
    userData: UserData;
    getPropertyManagerPropertyAction: any;

    addPropertyAction(data);

    addManagerToPropertyAction(data);

    updatePropertyManagerPropertyAction(id: number, data: PropertyManagerProperty);
}

class Properties extends React.Component<Props> {
    state = {
        open: false,
        initialValues: formInitialValues,
        modalSpinner: false,
    };

    componentDidMount(): void {
        this.props.getPropertyManagerPropertyAction();
    }

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false, initialValues: formInitialValues,modalSpinner: false});
    };

    onSubmitModal = (values) => {
        this.setState({modalSpinner: true});
        if (values.id) {
            const res = this.props.updatePropertyManagerPropertyAction(values.id, values);
            res.then(() => {
                return this.props.getPropertyManagerPropertyAction();
            })
                .then(() => {
                    return this.onCloseModal();
                });
            return;
        }

        this.props.addPropertyAction(values).then(res => {
            const data = {
                user: this.props.userData.id,
                property: res.id,
            };

            this.props.addManagerToPropertyAction(data).then(() => {
                this.props.getPropertyManagerPropertyAction().then(() => {
                    this.onCloseModal();
                    this.setState({modalSpinner: false});

                });
            });
        });
    };

    onPropertyClick = (item) => {
        this.setState({initialValues: item});
        this.onOpenModal();
    };

    render() {
        const {open, initialValues} = this.state;
        const {properties} = this.props;


        return (
            <div className="page-content properties">
                <h1 className="page-title">settings</h1>
                <span className="page-icon">
                  <i className="icon-settings"/>
                </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">properties</h2>
                    <h6 className="page-desc">
                        select a building to view/edit information
                    </h6>
                    <ul className="properties-list">
                        {properties && properties.map((prop) => {
                            return (
                                <li key={prop.id}>
                                    <a onClick={() => this.onPropertyClick(prop)}>{prop.name}</a>
                                </li>
                            )
                        })}

                    </ul>
                    <a className="add" onClick={this.onOpenModal}>
                        + add another property
                    </a>
                </div>
                <Modal

                    classNames={{
                        overlay: "custom-overlay",
                        modal: "custom-modal"
                    }}
                    center={true}
                    onClose={this.onCloseModal}
                    open={open}

                >
                    {/* Manage properties pop up content start */}

                    <div className="popup add-property-popup">
                        {this.state.modalSpinner &&
                            // @ts-ignore
                            <div style={{position:'fixed',width:'100%',height:"100%",opacity:'0.3',background:'white',top:'0',left:'0',zIndex:'1000000'}}>
                              <Spinner/>
                            </div>
                        }
                        <span onClick={this.onCloseModal} className="close">X</span>
                        <p className="popup-heading white">Add property</p>
                        <Formik
                            {...[this.props]}
                            enableReinitialize
                            initialValues={initialValues}
                            validationSchema={Yup.object().shape(propertyManagerModal)}
                            onSubmit={this.onSubmitModal}
                        >
                            {({errors, touched, ...rest}) => {
                                return (
                                    <Form>
                                        <div className="form-fields mb-4">
                                            <div
                                                className={"text-field primary " + ((errors.name && touched.name) ? 'invalid' : '')}>
                                                <label htmlFor="name" className="white">Name:</label>
                                                <div className="content">
                                                    <Field name="name" placeholder="Name"/>
                                                    <ErrorMessage name="name"/>
                                                </div>
                                            </div>
                                            <div
                                                className={"text-field primary " + ((errors.address && touched.address) ? 'invalid' : '')}>
                                                <label htmlFor="address" className="white">Address:</label>
                                                <div className="content">
                                                    <Field name="address" placeholder="Address"/>
                                                    <ErrorMessage name="address"/>
                                                </div>
                                            </div>
                                            <div
                                                className={"text-field primary " + ((errors.street && touched.street) ? 'invalid' : '')}>
                                                <label htmlFor="street" className="white">Street:</label>
                                                <div className="content">
                                                    <Field name="street" placeholder="Street"/>
                                                    <ErrorMessage name="street"/>
                                                </div>
                                            </div>
                                            <div
                                                className={"text-field primary " + ((errors.city_state_zip && touched.city_state_zip) ? 'invalid' : '')}>
                                                <label htmlFor="city_state_zip"
                                                       className="white">City/State/Zip:</label>
                                                <div className="content">
                                                    <Field name="city_state_zip" placeholder="City/State/Zip"/>
                                                    <ErrorMessage name="city_state_zip"/>
                                                </div>
                                            </div>
                                            <div
                                                className={"text-field primary " + ((errors.phone && touched.phone) ? 'invalid' : '')}>
                                                <label htmlFor="phone" className="white">Phone:</label>
                                                <div className="content">
                                                    <Field name="phone" placeholder="Phone"/>
                                                    <ErrorMessage name="phone"/>
                                                </div>
                                            </div>
                                            <div
                                                className={"text-field primary " + ((errors.fax && touched.fax) ? 'invalid' : '')}>
                                                <label htmlFor="fax" className="white">Fax:</label>
                                                <div className="content">
                                                    <Field name="fax" placeholder="Fax"/>
                                                    <ErrorMessage name="fax"/>
                                                </div>
                                            </div>
                                            <div
                                                className={"text-field primary " + ((errors.representative_title && touched.representative_title) ? 'invalid' : '')}>
                                                <label htmlFor="representative_title" className="white">Representative
                                                    Title:</label>
                                                <div className="content">
                                                    <Field name="representative_title"
                                                           placeholder="Representative Title"/>
                                                    <ErrorMessage name="representative_title"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center mt-10 buttons">
                                            <button className="btn filled cancel-popup w-md mr-4"
                                                    onClick={this.onCloseModal}>cancel
                                            </button>
                                            <button
                                                className="btn filled primary w-md">{(initialValues.id) ? 'update' : 'add'}</button>
                                        </div>
                                        {/*<pre>*/}
                                        {/*{JSON.stringify(rest, null, 2)}*/}
                                        {/*</pre>*/}
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                    {/* Manage properties pop up content start */}
                </Modal>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        properties: state.settings.propertyManagerProperty,
    }
};

export default connect(mapStateToProps, {
    getPropertyManagerPropertyAction,
    addPropertyAction,
    addManagerToPropertyAction,
    updatePropertyManagerPropertyAction
})(Properties)
