import * as React from 'react';
import Modal from "react-responsive-modal";
import { Form, Formik } from 'formik';
import { connect } from "react-redux";
import ReactSelect from "./Select";
import { getManagerApprovalAction, removeManagerApprovalAction, addManagerApprovalAction, getPropertyManagersAction,
    changeManagerApprovalAction } from "../../actions";
import validate from "../../utils/form/validate";
import getValidationSchema from "../../utils/form/getValidationSchema";
import UserData from "../../utils/models/UserData.model";


export interface Props {
    userData: UserData;

    getManagerApprovalAction: () => void;
    removeManagerApprovalAction: (id: any) => any;
    addManagerApprovalAction: (data: any) => any;
    getPropertyManagersAction: () => void;
    managerApproval: null | Array<{}>;
    properties: null | Array<{}>;

    changeManagerApprovalAction(data);
}

// interface State {
//     open: boolean;
// }

class ManagerApproval extends React.Component<any> {
    state = {
        open: false
    };

    componentDidMount() {
        this.props.getManagerApprovalAction();
        this.props.getPropertyManagersAction();
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onChange = (e) => {
        this.props.changeManagerApprovalAction({manager_approval_settings: e.target.checked});
    };

    onSubmit = values => {
        console.log({property:values.property.label,email:values.email,name:values.name});
        this.props.addManagerApprovalAction({name:values.name,email:values.email,property:values.property.value}).then(() => {
            this.setState({ open: false });
            this.props.getManagerApprovalAction();
        })
    };

    onRemoveHandler = id => {
        this.props.removeManagerApprovalAction(id).then(() => this.props.getManagerApprovalAction())
    };

    render() {
        const { open} = this.state;
        const { userData } = this.props;
        const managerApproval: any = this.props.managerApproval;
        const properties = this.props.properties && this.props.properties.map((property) => {
            return {id:property.property,label: property.property_name}
        });
        if(!managerApproval) {
            return null;
        }

        const initialValues = {
            name: '',
            email: '',
            property: ''
        };

        return (
            <div className="page-content manager-approval">
                <h1 className="page-title">settings</h1>
                <span className="page-icon">
                    <i className="icon-settings" />
                </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">manager-approval</h2>
                    <div className="items">
                        <div className="item">
                            <div className="flex align-center mb-8">
                                <span className="label mr-6 color-black">Turn on the functionality</span>
                                <div className="switch">
                                    <input type="checkbox"
                                           name="switch"
                                           className="switch-checkbox"
                                           id="switch"
                                           defaultChecked={userData.manager_approval_settings}
                                           onChange={this.onChange}
                                    />
                                    <label className="switch-label" htmlFor="switch">
                                        <span className="switch-inner"/>
                                    </label>
                                </div>
                            </div>
                            {/* <!-- Table start --> */}
                            <div className="main-table managers-table">
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
                                         managerApproval.map(item => {
                                             return (
                                                 <tr key={item.id}>
                                                     <td>{ item.name }</td>
                                                     <td className="text-right">
                                                         { item.email }
                                                     </td>
                                                     <td className="text-right">

                                                         {
                                                             // tslint:disable-next-line jsx-no-lambda
                                                             <a onClick={() => this.onRemoveHandler(item.id)} style={{cursor: 'pointer'}} className="remove">
                                                             remove
                                                            </a>
                                                         }
                                                     </td>
                                                 </tr>
                                             );
                                         })
                                     }

                                    </tbody>
                                </table>
                                <a style={{cursor: 'pointer'}} className="add" onClick={this.onOpenModal}>
                                    + add another manager
                                </a>

                                <Modal
                                    classNames={{
                                        overlay: "custom-overlay",
                                        modal: "custom-modal"
                                    }}
                                    open={open}
                                    onClose={this.onCloseModal}
                                    center
                                >
                                    {/* Add manager pop up content start */}
                                    <div className="popup manager-access-popup">
                                        <span onClick={this.onCloseModal} className="close">X</span>
                                        <p className="popup-heading white mb-8">Manager access</p>
                                        <Formik
                                            initialValues={initialValues}
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
                                                            <div className={"text-field primary " + (touched.name && errors.name && "invalid")}>
                                                                <label htmlFor="name" className="white">manager's name:</label>
                                                                <div className="content">
                                                                    <input value={values.name}
                                                                           onChange={handleChange}
                                                                           onBlur={handleBlur}
                                                                           id="name"
                                                                           type="text"/>
                                                                    {touched.name && errors.name &&  <p className="error-text relative">{errors.name}</p>}
                                                                </div>
                                                            </div>
                                                            <div className={"text-field primary " + (touched.email && errors.email && "invalid")}>
                                                                <label htmlFor="email" className="white">email address:</label>
                                                                <div className="content">
                                                                    <input value={values.email}
                                                                           onChange={handleChange}
                                                                           onBlur={handleBlur}
                                                                           id="email"
                                                                           type="text"/>
                                                                    {touched.email && errors.email &&  <p className="error-text relative">{errors.email}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="select-box primary invalid">
                                                                <label htmlFor="title" className="white">property:</label>
                                                                <div className="content">
                                                                    <ReactSelect field='property' {...props} options={properties}/>
                                                                    {touched.property && errors.property &&  <p className="error-text relative">{errors.property}</p>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center pt-10 buttons">
                                                            <a style={{cursor: 'pointer'}} onClick={this.onCloseModal} className="btn filled cancel-popup w-md mr-4">cancel</a>
                                                            <button type='submit' className="btn filled primary w-md">add</button>
                                                        </div>
                                                    </Form>
                                                )
                                            }}
                                        />
                                    </div>
                                    {/* Add manager pop up content end */}
                                </Modal>
                            </div>
                            {/* <!-- Table end --> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        managerApproval: state.settings.managerApproval,
        properties: state.settings.properties
    };
};


export default connect(mapStateToProps, { getPropertyManagersAction, removeManagerApprovalAction, getManagerApprovalAction, addManagerApprovalAction, changeManagerApprovalAction })(ManagerApproval);
