import * as React from 'react';
import validate from "../../utils/form/validate";
import getValidationSchema from "../../utils/form/getValidationSchema";
import {Form, Formik} from "formik";


class TemplateForm extends React.Component<{ onSubmit: any, initialValues: any, cancelMode: any }, { }> {
    render() {
        return (
            <Formik
                initialValues={ this.props.initialValues }
                validate={  validate(getValidationSchema) }
                onSubmit={this.props.onSubmit }
                render={props => {
                    const { values, handleChange, handleBlur, touched, errors } = props;
                    return (
                        <Form className="col s12">
                            <div className={"text-field primary" + (touched.template_name && errors.template_name ? ' invalid': '')}>
                                <label htmlFor="subject">name of the template (not visible to receiver)</label>
                                <input value={values.template_name}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       id="template_name"
                                       type="text"/>
                                {touched.template_name && errors.template_name &&  <p className="error-text relative">{errors.template_name}</p>}
                            </div>
                            <div className={"text-field primary" + (touched.name && errors.name ? ' invalid': '')}>
                                <label htmlFor="subject">subject:</label>
                                <input value={values.name}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       id="name"
                                       type="text"/>
                                {touched.name && errors.name &&  <p className="error-text relative">{errors.name}</p>}
                            </div>
                            <div className={"text-field primary" + (touched.content && errors.content ? ' invalid': '')}>
                                <label htmlFor="template-content">add template:</label>
                                <textarea value={values.content}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          id="content" />

                                {touched.content && errors.content &&  <p className="error-text relative">{errors.content}</p>}
                            </div>
                            <div>
                                <button type='button' onClick={ this.props.cancelMode } style={{ cursor: 'pointer' }} className="add">
                                    Cancel
                                </button>
                                <button type='submit' style={{ cursor: 'pointer', marginLeft: '15px' }} className="add">
                                    Save
                                </button>
                            </div>
                        </Form>
                    )
                }}
            />
        );
    }
};


export default TemplateForm;
