import * as React from 'react';
// import ReactSelect from "./Select";
import {connect} from "react-redux";
import {
    getGlAccountAction,
    addGlAccountAction,
    getPropertyManagersAction,
    removeGLAction
} from "../../actions/settings";
import {Form, Formik} from "formik";
import validate from "../../utils/form/validate";
import getValidationSchema from "../../utils/form/getValidationSchema";
import Modal from "react-responsive-modal";

// import ReactSelect from "./Select";


export interface Props {
    getGlAccountAction: () => any,
    getPropertyManagersAction: () => any,
    addGlAccountAction: (data: any) => any,
    glAccounts: any,
    properties: any,
    removeGLAction: any
}

interface State {
    open: boolean,
    openDelteAsk: boolean,
    property: any,
    deleteId: any,
}


class ChartOfAccounts extends React.Component<Props, State> {

    state = {
        open: false,
        property: null,
        openDelteAsk: false,
        deleteId: false,
    };

    componentDidMount() {
        this.props.getGlAccountAction();
        this.props.getPropertyManagersAction();
    }

    onOpenModal = glId => {
        this.setState({open: true, property: glId});
    };

    onCloseModal = () => {
        this.setState({open: false, property: null});
    };

    deleteGL = (id) => {
        const prom = this.props.removeGLAction(id);
        prom.then(() => {
            this.props.getGlAccountAction();
            this.setState({openDelteAsk:false})
        });
    };

    addGlHandler = values => {
        const data = {
            gl_code: values.gl_code,
            gl_account: values.gl_account,
            property: this.state.property
        };
        this.props.addGlAccountAction(data).then(res => {
            this.props.getGlAccountAction();
            this.onCloseModal();
        });
    };

    render() {
        const {open, openDelteAsk} = this.state;
        const {glAccounts} = this.props;

        if (!glAccounts) {
            return null;
        }

        return (
            <div className="page-content chart-of-accounts">
                <h1 className="page-title">settings</h1>
                <span className="page-icon"><i className="icon-settings"/></span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">chart of accounts</h2>
                </div>
                <div className="items pt-8">
                    {
                        glAccounts.map(gl => {
                            return (
                                <div key={gl.id} className="item">
                                    <div className="flex justify-between align-center mb-8 accounts">
                                        <p className="font-xxl color-primary">{gl.data[0].property_name}</p>
                                        <a className="action-secondary pointer" onClick={e => this.onOpenModal(gl.id)}>
                                            + new G/L code for this building
                                        </a>
                                    </div>
                                    <div>
                                        <div className="flex justify-between building mb-8">
                                            <span className="font-lg color-primary">G/L Code</span>
                                            <span className="font-lg color-primary">Account</span>
                                        </div>
                                        <ul className="gl-info">
                                            {
                                                gl.data.map(d => {
                                                    return (
                                                        <li key={d.id}>
                                                            <button className="btn-simple color-warning font-md" onClick={() => this.setState({
                                                                deleteId: d.id,
                                                                openDelteAsk: true
                                                            })}><i className="icon-delete">{''}</i></button>
                                                            <span>{d.gl_account}</span>
                                                            <span>{d.gl_code}</span>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                <Modal
                    classNames={{
                        overlay: "custom-overlay",
                        modal: "custom-modal"
                    }}
                    open={openDelteAsk}
                    onClose={() => this.setState({openDelteAsk: false})}
                    center
                >
                    <div className="popup">
                        <span onClick={() => this.setState({openDelteAsk: false})} className="close">X</span>
                        <p className="white mb-8 font-xxxl">Are You Sure</p>
                        <div>
                            <button className="btn filled cancel-popup w-md mr-4 pointer" onClick={() => this.setState({openDelteAsk: false})}>Cancel</button>
                            <button className="btn filled primary w-md" onClick={() => this.deleteGL(this.state.deleteId)}>Delete</button>
                        </div>

                    </div>
                    {/* Add GL account number content end */}
                </Modal>

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
                            initialValues={{gl_account: '', gl_code: ''}}
                            validate={validate(getValidationSchema)}
                            onSubmit={this.addGlHandler}
                            render={props => {
                                const {values, handleChange, handleBlur, touched, errors} = props;
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        glAccounts: state.settings.glAccounts,
        properties: state.settings.properties
    }
}

export default connect(mapStateToProps, {
    getPropertyManagersAction,
    getGlAccountAction,
    addGlAccountAction,
    removeGLAction
})(ChartOfAccounts);
