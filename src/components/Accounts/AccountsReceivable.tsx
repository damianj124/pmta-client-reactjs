import * as React from 'react';
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { Form, Formik } from "formik";

import SliderCarusel from "./Slider";
import validate from "../../utils/form/validate";
import getValidationSchema from "../../utils/form/getValidationSchema";
import { addTenantAction, addTenantEmailDataAction, getDefaultTemplateAction } from "../../actions/settings";
import {RouteComponentProps} from "react-router";


export interface Props {
    campaign: any
    addTenantAction: any
    addTenantEmailDataAction: any
    getDefaultTemplateAction: any
    defaultTemplate: any
}

export interface State {
    editableCampaign: any,
    open: boolean, data: any,
    currentIndex: number
    changedData: any
}

class AccountsReceivable extends React.Component<Props & RouteComponentProps, State> {
    state = {
        open: false,
        currentIndex: 1,
        editableCampaign: {
            tenant_name: '',
            property: 0
        },
        data: [],
        changedData: {}
    };

    componentDidMount() {
        this.props.getDefaultTemplateAction();
    }

    onOpenModal = campaign => {
        this.setState({ open: true, editableCampaign: campaign });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onSubmit = values => {
        const data = {
            name: this.state.editableCampaign.tenant_name,
            email: values.email,
            property: this.state.editableCampaign.property,
            contact_name: values.name
        };
        this.props.addTenantAction(data).then(() => {

            const preSendingData: any = {
                name: this.state.editableCampaign.tenant_name,
                subject: "",
                email: values.email,
                context: "",
                contact_name: values.name
            };
            const currentData = [...this.state.data, preSendingData];
            this.setState(prevState => {
                const newMessage = prevState.changedData[this.state.editableCampaign.tenant_name].replace('{name}', values.name);
                return {changedData: {...prevState.changedData, [this.state.editableCampaign.tenant_name]: newMessage}}
            });
            this.setState({ open: false, data: [...currentData],  });
        })
    };

    getEmail = (campaigne, data) => {
        const emailContainingObj:any = data.find((item: any) => item.name === campaigne.tenant_name);

        if (emailContainingObj) {
            return emailContainingObj.email;
        }
        return null;
    };

    getName = name => {
        const nameContainingObj: any = this.state.data.find((item: any) => item.name === name);

        if (nameContainingObj) {
            return nameContainingObj.name;
        }
        return '';
    };

    sendTenantEmailData = () => {
        const sendingData = this.state.data.map((item: any) => {
            const compagne = this.props.campaign.find(c => c.tenant_name === item.name);
            return {
                subject: this.props.defaultTemplate.default_template.name,
                email: item.email,
                context: `<pre>${this.state.changedData[compagne.tenant_name]}</pre>`
            };
        });
        const data = {
            data: [...sendingData]
        };

        for (const c of this.props.campaign) {
            if (c.email) {
                console.log(this.state.changedData[c.tenant_name])
                data.data.push({
                    subject: this.props.defaultTemplate.default_template.name,
                    email: c.email,
                    context: `<pre>${this.state.changedData[c.tenant_name]}</pre>`
                })
            }
        }
        this.props.addTenantEmailDataAction(data).then(res => this.props.history.push('/account/new-campaign'))
    };

    setData = e => {
        this.setState(prevState => ({changedData: {...prevState.changedData, [e.target.name]: e.target.value}}));
    };


    render() {
        const { open } = this.state;
        if(!this.props.campaign || !this.props.defaultTemplate){
            return null;
        }
        const email = this.props.campaign[this.state.currentIndex - 1].email ? this.props.campaign[this.state.currentIndex - 1].email : (this.getEmail(this.props.campaign[this.state.currentIndex - 1], this.state.data) ?this.getEmail(this.props.campaign[this.state.currentIndex - 1], this.state.data):  '')
        return (
            <div>
                <div className="page-content check-email">
                    <h1 className="page-title">accounts receivable</h1>
                    <h4 className="subtitle">PREVIEW AND PERSONALIZE EACH MESSAGE</h4>
                    <div className="block">
                        <h2 className="tenant">{this.props.campaign[this.state.currentIndex - 1].tenant_name}
                            {/* If contact info is added please change below included link with the following span */}
                             <span> {email}</span>
                            {
                                !email && <a onClick={() => this.onOpenModal(this.props.campaign[this.state.currentIndex - 1])} className="add-contact">(click to add contact info)</a>
                            }


                        </h2>
                        <p className="receipt-number">{this.state.currentIndex} of {this.props.campaign.length} recipients</p>
                    </div>

                    <SliderCarusel getName={this.getName}
                                   defaultTemplate={this.props.defaultTemplate}
                                   campaign={this.props.campaign }
                                   change={e =>{this.setState({changedData: {...this.state.changedData, [e.target.name]: e.target.value}}) }}
                                   set={ this.setData }
                                   values={this.state.changedData}
                                   changeSliderIndex={index => this.setState({currentIndex: index})}/>

                    <div className="text-center">
                        <a onClick={ this.sendTenantEmailData } className="btn filled primary w-lg mt-6">
                            continue to send
                        </a>
                    </div>
                    <Modal open={ open } onClose={ this.onCloseModal }>
                        {/* Contact info pop up content start */}
                        <div className="popup contact-info-popup">
                            <span className="close">X</span>
                            <p className="popup-heading white">Contact info</p>
                            <div className="flex align-center mb-8 mt-8 manage-tenant">
                                <p className="tenant-name mb-1">Tenant: {this.state.editableCampaign.tenant_name}</p>
                                <a href="#" className="action-popup ml-7">edit</a>
                            </div>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: ''
                                }}
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
                                            <div className="form-fields">
                                                <div className="text-field primary">
                                                    <label htmlFor="name" className="white">contact name:</label>
                                                    <div className="content">
                                                        <input value={values.name}
                                                               onChange={handleChange}
                                                               onBlur={handleBlur}
                                                               id="name"
                                                               type="text"/>
                                                        {touched.name && errors.name &&  <p className="error-text relative">{errors.name}</p>}
                                                    </div>
                                                </div>
                                                <div className="text-field primary invalid">
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
                                            </div>
                                            <div className="text-center mt-10 buttons">
                                                <a href="#" className="btn filled cancel-popup w-md mr-4">cancel</a>
                                                <button type='submit' className="btn filled primary w-md">submit</button>
                                            </div>
                                        </Form>
                                    )
                                }}
                            />
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        campaign: state.settings.campaign,
        defaultTemplate: state.settings.defaultTemplate
    };
};


export default connect(mapStateToProps, { addTenantAction, addTenantEmailDataAction, getDefaultTemplateAction })(AccountsReceivable);
