import * as React from 'react';
import { connect } from 'react-redux';
import {
    getEmailTemplatesAction,
    editEmailTemplateAction,
    addEmailTemplateAction,
    makeDefaultsAction,
    removeEmailTemplatesAction
} from '../../actions';
import TemplateForm from "./TemplateForm";


export interface Props {
    getEmailTemplatesAction: () => void,
    editEmailTemplateAction: (id: any, data: { name?: string, content?: string }) => any,
    addEmailTemplateAction: (data: { name: string, content: string }) => any,
    makeDefaultsAction: any
    templates: any
}

export interface State { editMode: boolean, addMode: boolean }

class EmailTemplates extends React.Component<any> {

    state = {
        editMode: false,
        addMode: false,
        editIndex:-1,
    };

    componentDidMount() {
        this.props.getEmailTemplatesAction()
    }

    onSubmitEditTemplateHandler = (id: number, values: { name: string, content: string }) => {
        this.props.editEmailTemplateAction(id, values).then(() => {
            this.props.getEmailTemplatesAction();
            this.setState({editMode: false});
        });
    };

    onSubmitAddTemplateHandler = (values: { template_name: string ,name: string, content: string }) => {
        this.props.addEmailTemplateAction(values).then(() => {
            this.setState({addMode: false});
            this.props.getEmailTemplatesAction();
        });
    };

    onMakeDefaultsHandler = templateId => {
        this.props.makeDefaultsAction({ template: templateId }).then(() => {
            this.props.getEmailTemplatesAction()
        });
    };

    onDelete = id => {
        this.props.removeEmailTemplatesAction(id).then(this.props.getEmailTemplatesAction);
    };

    cancelMode = () => this.setState({editMode: false,editIndex:-1, addMode: false});

    renderTemplates() {
        return this.props.templates.map((template,i) => {
            return (
                <div key={template.id} className="template">
                    <div className="radio-buttons">
                        <input
                            onChange={() => this.onMakeDefaultsHandler(template.id)}
                            type="radio"
                            checked={template.default_template_id === template.id}
                            className="checkbox-control"
                            id={template.id}
                            name='template'
                        />
                        <label htmlFor={template.id} className="main-label">
                            mark as default
                        </label>
                    </div>
                    <span className="title">{ template.name }</span>

                    {
                        !this.state.editMode &&
                        <a onClick={() => this.setState({editMode: true,editIndex:i})}
                           className="action-tertiary underline">
                            edit
                        </a>
                    }
                    {' '}
                    {
                        (template.default_template_id !== template.id) &&
                        <a onClick={() => this.onDelete(template.id)}
                           className="action-tertiary underline">
                            delete
                        </a>
                    }


                    {
                        this.state.editMode && this.state.editIndex === i && <TemplateForm onSubmit={ values => this.onSubmitEditTemplateHandler(template.id, values) }
                                                             initialValues={{template_name: template.template_name, name: template.name, content: template.content }}
                                                             cancelMode={ this.cancelMode } />
                    }

                    {
                        !this.state.editMode &&
                        <div className="content">
                            <p className='mb-3'>{template.content}</p>
                        </div>
                    }

                </div>
            );
        });

    }

    addNewTemplate = () => {
        this.setState({ addMode: true });
    };

    render() {
        if(!this.props.templates) {
            return null;
        }
        return (
            <div className="page-content email-template">
                <h1 className="page-title">settings</h1>
                <span className="page-icon"><i className="icon-settings" /></span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">email templates</h2>
                    <div className="templates mt-9 ml-6">

                        { this.renderTemplates() }

                        {
                            this.state.addMode && <TemplateForm onSubmit={ this.onSubmitAddTemplateHandler }
                                                                initialValues={{ template_name: '',name: '', content: '' }}
                                                                cancelMode={ this.cancelMode } />
                        }

                        {
                            !this.state.addMode &&
                            <a onClick={ this.addNewTemplate } style={{ cursor: 'pointer' }} className="add">
                                <span>+</span> Add new template
                            </a>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        templates: state.settings.templates
    };
};


export default connect(mapStateToProps, { getEmailTemplatesAction, editEmailTemplateAction, addEmailTemplateAction, makeDefaultsAction, removeEmailTemplatesAction })(EmailTemplates);
