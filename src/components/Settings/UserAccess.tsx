import * as React from 'react';
import Modal from "react-responsive-modal";
import * as Yup from "yup";
import {connect} from "react-redux";
import {
    addManagerToPropertyAction,
    getPropertiesAction,
    inviteManagerToPropertyAction,
    removePropertyManagerAction
} from "../../actions";
import UserData from "../../utils/models/UserData.model";
import Results from "../../utils/models/Results.model";
import Property from "../../utils/models/Proprty.model";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {email, firstName, lastName} from "../../utils/form/getValidationSchema";

interface State {
    open: boolean;
    openedPropertyId: number | undefined;
    errorMessage: string
}

interface Props {
    errors: {};
    userData: UserData;
    propertiesUserAccess: Results<Property>;

    getPropertiesAction ();
    removePropertyManagerAction (id:number);
    inviteManagerToPropertyAction (data);
    addManagerToPropertyAction (data);
}

class UserAccess extends React.Component<Props, State > {
    state = {
        open: false,
        openedPropertyId: undefined,
        errorMessage: ''
    };

    componentDidMount = () => {
        this.props.getPropertiesAction();
    };

    onOpenModal = (id?:number) => {
        if (id) {
            this.setState({open: true});
            this.setState({openedPropertyId: id});
        }
    };

    onCloseModal = () => {
        this.setState({open: false});
        this.setState({errorMessage: ''});
    };

    onSubmitModal = (values) => {
        values.property = this.state.openedPropertyId;
        this.props.inviteManagerToPropertyAction(values).then((response) => {
            const data = {
                user: response[0],
                property: values.property
            };

            if (response.id) {
                data.user = response.id;
            }

            this.props.addManagerToPropertyAction(data).then(() => {
                this.props.getPropertiesAction().then(() => {
                    this.onCloseModal();
                });
            });
        }).catch((error) => {
            if(error) {
                this.setState({errorMessage: error[0]});
            }
        });
    };

    onDelete = id => {
        this.props.removePropertyManagerAction(id).then(() => {
            const propertiesUserAccess = this.props.propertiesUserAccess;
            propertiesUserAccess.results.map((object, i) => {
                object.property_manager.map((property, k) => {
                    if (property.id === id) {
                        delete propertiesUserAccess.results[i].property_manager[k];
                    }
                })
            });
            // @ts-ignore
            this.setState({['propertiesUserAccess']: propertiesUserAccess});
        });
    };

    render() {
        const {open, errorMessage} = this.state;
        const {propertiesUserAccess} = this.props;

        return (
            <div className="page-content user-access">
                <h1 className="page-title">settings</h1>
                <span className="page-icon">
                    <i className="icon-settings"/>
                </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">user access</h2>
                    <div className="items">
                        {propertiesUserAccess && propertiesUserAccess.results.map((object, i) => {
                            return(
                            <div className="item" key={i}>
                                <h2 className="address">{object.name}</h2>
                                {/* <!-- Table start --> */}
                                <div className="main-table access-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th/>
                                            <th/>
                                            <th/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {object.property_manager.map((property, k) => {
                                            return(
                                                <tr key={k}>
                                                    <td>{`${property.user.first_name} ${property.user.last_name}`}</td>
                                                    <td className="text-right">
                                                        {property.user.email}
                                                    </td>
                                                    <td className="text-right">
                                                        <button className="btn-simple font-md remove" onClick={() => {this.onDelete(property.id)}}>
                                                            remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                    <p className="add" onClick={() => {this.onOpenModal(object.id)}}>
                                        + give another user access to this building
                                    </p>
                                </div>
                                {/* <!-- Table end --> */}
                            </div>
                            )
                        })}
                    </div>
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
                    {/* User access pop up content start */}
                    <div className="popup user-access-popup">
                        <span className="close" onClick={this.onCloseModal}>X</span>
                        <p className="popup-heading white mb-8">User access</p>
                        <Formik
                            {...[this.props]}
                            enableReinitialize
                            initialValues={{
                                email: '',
                                first_name: '',
                                last_name: '',
                            }}
                            validationSchema={Yup.object().shape({email, first_name: firstName, last_name: lastName})}
                            onSubmit={ this.onSubmitModal }
                        >
                            {({errors, touched, ...rest}) => {
                                return (
                                    <Form>
                                        <div className="form-fields mb-2">
                                            <div className={"text-field primary " + ((errors.first_name && touched.first_name ) ? 'invalid' : '' )}>
                                                <label htmlFor="first_name" className="white">user's first name:</label>
                                                <div className="content">
                                                    <Field name="first_name" placeholder="First Name" type="input" />
                                                    <ErrorMessage name="first_name"/>
                                                </div>
                                            </div>
                                            <div className={"text-field primary " + ((errors.last_name && touched.last_name) ? 'invalid' : '' )}>
                                                <label htmlFor="last_name" className="white">user's last name:</label>
                                                <div className="content">
                                                    <Field name="last_name" placeholder="Last Name" type="input" />
                                                    <ErrorMessage name="last_name"/>
                                                </div>
                                            </div>
                                            <div className={"text-field primary " + ((errors.email && touched.email) ? 'invalid' : '' )}>
                                                <label htmlFor="email" className="white">email address:</label>
                                                <div className="content">
                                                    <Field name="email" placeholder="Email" type="email" />
                                                    <ErrorMessage name="email"/>
                                                    {/*<p className="error-text relative">This field is required *</p>*/}
                                                </div>
                                            </div>
                                        </div>
                                        <p>{errorMessage}</p>
                                        <div className="text-center mt-10 buttons">
                                            <a href="#" className="btn filled cancel-popup w-md mr-4">cancel</a>
                                            <button className="btn filled primary w-md">submit</button>
                                        </div>
                                        {/*<pre>*/}
                                            {/*{JSON.stringify(rest, null, 2)}*/}
                                        {/*</pre>*/}
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                    {/* User access pop up content end */}
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        propertiesUserAccess: state.settings.propertiesUserAccess
    };
};

export default connect(mapStateToProps, { getPropertiesAction, removePropertyManagerAction, inviteManagerToPropertyAction, addManagerToPropertyAction })(UserAccess);
