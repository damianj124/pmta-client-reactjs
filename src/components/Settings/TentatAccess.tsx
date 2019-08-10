import * as React from 'react';
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { getTenantsAction } from "../../actions/settings";
import validate from "../../utils/form/validate";
import getValidationSchema from "../../utils/form/getValidationSchema";
import {Form, Formik} from "formik";
import {editTenantAction} from "../../actions/settings";



export interface Props {
    getTenantsAction: () => void
    editTenantAction: (id: any, data: any) => any
    tenants: any
}

class  TentatAccess extends React.Component<any> {
    state = {
        open: false,
        tenant: {
            id: '',
            name: '',
            contact_name: '',
            email: '',
            property: ''
        }
    };

    componentDidMount() {
        this.props.getTenantsAction();
    }

    onOpenModal = tenant => {
        this.setState({ open: true, tenant });
    };

    onCloseModal = () => {
        this.setState({ open: false, tenant: {
                id: '',
                name: '',
                contact_name: '',
                email: '',
                property: ''
            } });
    };

    onSubmit = values => {
        const data = {...this.state.tenant, ...values};
        delete data.id;
        this.props.editTenantAction(this.state.tenant.id, data).then(res => {
            this.onCloseModal();
            this.props.getTenantsAction();
        })
    }

    render() {
        const { open } = this.state;
        const { tenants } = this.props;
        if(!tenants) {
            return null;
        }
        return (
            <div className="page-content tenant-emails">
                <h1 className="page-title">settings</h1>
                <span className="page-icon">
          <i className="icon-settings" />
        </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">Tenant emails</h2>
                    <h6 className="page-desc">Select a tenant to edit contact info</h6>
                    {/* <!-- Table start --> */}
                    <div className="main-table emails-table">
                        <table>
                            <thead>
                            <tr>
                                <th />
                                <th />
                                <th />
                            </tr>
                            </thead>
                            <tbody>
                            {
                                tenants.map(tenant => {
                                    return (
                                        <tr key={tenant.id}>
                                            <td>
                                                {
                                                    // tslint:disable-next-line jsx-no-lambda
                                                    <a style={{ cursor: 'pointer' }} className="tenant" onClick={() => this.onOpenModal(tenant) }>
                                                        {tenant.name}
                                                    </a>
                                                }

                                            </td>
                                            <td>{ tenant.contact_name }</td>
                                            <td>{ tenant.email }</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>

                        <Modal
                            classNames={{
                                overlay: "custom-overlay",
                                modal: "custom-modal"
                            }}
                            open={open}
                            onClose={this.onCloseModal}
                            center
                        >
                            {/* Manage tenant content start */}
                            <div className="popup manage-tenant-popup">
                                <span className="close" onClick={this.onCloseModal}>X</span>
                                <p className="popup-heading white mb-8">Manage tenant</p>
                                <Formik
                                    initialValues={{
                                        name: this.state.tenant.name || '',
                                        contact_name: this.state.tenant.contact_name,
                                        email: this.state.tenant.email
                                    }}
                                    validate={validate(getValidationSchema)}
                                    onSubmit={this.onSubmit}
                                    // tslint:disable-next-line jsx-no-lambda
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
                                                    <div className={"text-field primary " + (touched.name && errors.name && "invalid")}>
                                                        <label htmlFor="name" className="white">tenant's name</label>
                                                        <div className="content">
                                                            <input id="name"
                                                                   type="text"
                                                                   value={values.name}
                                                                   onChange={handleChange}
                                                                   onBlur={handleBlur}/>
                                                            {touched.name && errors.name &&  <p className="error-text relative">{errors.name}</p>}
                                                        </div>
                                                    </div>
                                                    <div className={"text-field primary " + (touched.contact_name && errors.contact_name && "invalid")}>
                                                        <label htmlFor="contact_name" className="white">manager's name</label>
                                                        <div className="content">
                                                            <input id="contact_name"
                                                                   type="text"
                                                                   value={values.contact_name}
                                                                   onChange={handleChange}
                                                                   onBlur={handleBlur}/>
                                                            {touched.contact_name && errors.contact_name &&  <p className="error-text relative">{errors.contact_name}</p>}

                                                        </div>
                                                    </div>
                                                    <div className={"text-field primary " + (touched.email && errors.email && "invalid")}>
                                                        <label htmlFor="email" className="white">email address</label>
                                                        <div className="content">
                                                            <input id="email"
                                                                   type="text"
                                                                   value={values.email}
                                                                   onChange={handleChange}
                                                                   onBlur={handleBlur}/>
                                                            {touched.email && errors.email &&  <p className="error-text relative">{errors.email}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center mt-10 buttons">
                                                    <a onClick={this.onCloseModal} style={{cursor: 'pointer'}} className="btn filled cancel-popup w-md mr-4">cancel</a>
                                                    <button type='submit' className="btn filled primary w-md">Save</button>
                                                </div>
                                            </Form>
                                        )
                                    }}
                                />
                            </div>
                            {/* Manage tenant content end */}
                        </Modal>

                    </div>
                    {/* <!-- Table end --> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tenants: state.settings.tenants
    };
};

export default connect(mapStateToProps, { getTenantsAction, editTenantAction })(TentatAccess);
