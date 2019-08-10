import * as React from 'react';
import * as Yup from "yup";
import Modal from "react-responsive-modal";
import {connect} from "react-redux";
import UserData from "../../utils/models/UserData.model";
import {ErrorMessage, Field, Form, Formik} from "formik";
import { updateUserDataAction } from "../../actions";
import {email} from "../../utils/form/getValidationSchema";

interface State {
    open: boolean
}

interface Props {
    errors: {};
    userData: UserData;
    updateUserDataAction (id: number, data: any);
}

class EmailSettings extends React.Component<Props, State > {
    state = {
        open: false
    };

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState(  {open: false});
    };


    onSubmitModal = (values) => {
        this.props.updateUserDataAction(this.props.userData.id, values);
        this.onCloseModal();
    };
    
    render() {
        const {open} = this.state;
        const {userData} = this.props;

        return (
            <div className="page-content">
                <h1 className="page-title">settings</h1>
                <span className="page-icon">
                    <i className="icon-settings"/>
                </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">email settings</h2>
                    <div className="email-settings">
                        <span className="label">
                        email address associated with account :{" "}
                        </span>
                        <span className="value">{userData.email}</span>
                        <p onClick={this.onOpenModal} className="action-primary underline">
                            change
                        </p>
                    </div>
                    {/* In case of clicking on the change button do the following changes for giving the user the possibility for changing the email address*/}
                    {/*  <div className="email-settings">
                    <span className="label">
                    email address associated with account :{" "}
                    </span>
                    <div className="text-field primary invalid mr-6">
                    <div className="content">
                    <input type="text"/>
                    <p className="error-text relative">This field is required *</p>
                    </div>
                    </div>
                    <a href="#" className="action-primary underline">
                    save
                    </a>
                    </div>*/}
                </div>
                <Modal
                    classNames={{
                        overlay: "custom-overlay",
                        modal: "custom-modal"
                    }}
                    open={open}
                    onClose={this.onCloseModal}
                    center={true}
                >
                    {/* User email pop up content start */}
                    <div className="popup user-access-popup">
                        <span className="close" onClick={this.onCloseModal}>X</span>
                        <p className="popup-heading white mb-8">Change Email</p>
                        <Formik
                            {...[this.props]}
                            enableReinitialize
                            initialValues={{email: userData.email}}
                            validationSchema={Yup.object().shape({email})}
                            onSubmit={ this.onSubmitModal }
                        >
                            {({touched, errors,...rest}) => {
                                return (
                                    <Form>
                                        <div className="form-fields mb-2">
                                            <div className={"text-field primary " + (touched.email && errors.email && "invalid")}>
                                                <label htmlFor="email" className="white">email address:</label>
                                                <div className="content">
                                                    <Field name="email" placeholder="email" />
                                                    <ErrorMessage name="email"/>
                                                    {/*<input id="email" type="text" />*/}
                                                    {/*<p className="error-text relative">This field is required *</p>*/}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center mt-10 buttons">
                                            <a href="#" className="btn filled cancel-popup w-md mr-4">cancel</a>
                                            <button type="submit" className="btn filled primary w-md">submit</button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                    {/* User email pop up content end */}
                </Modal>
            </div>
        );
    }
};


const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps, { updateUserDataAction })(EmailSettings);
