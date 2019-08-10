import * as React from 'react';
import Header from "../Website/Header";
import {connect} from "react-redux";
import {registerUserAction, clearRegisterUserAction} from "../../actions";
import {Formik, Form, Field, ErrorMessage} from "formik";
import validate from "../../utils/form/validate";
import getValidationSchema from "../../utils/form/getValidationSchema";
import { RouteComponentProps} from "react-router";

export interface Props extends RouteComponentProps{
    registerUserError:any;
    registerUserAction(data:any);
    clearRegisterUserAction();
}

class Signup extends React.Component<Props> {
    state = {
        confirmationText:'',
    };


    onSubmit = (values) => {
        const data = {...values, repeat_password:values.passwordConfirmation};
        console.log(data, 'onSubmitModal');
        this.props.registerUserAction(data).then(() => {
            const confirmationText = 'You have successfully created an account. Please check your e-mail for confirmation.';
            this.setState({confirmationText});

            this.props.clearRegisterUserAction();
        });
    };

    render() {
        const {registerUserError} = this.props;
        const {confirmationText} = this.state;

        const initValue = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        };

        return (
            <div>
                <Header/>
                {/* Main section start */}
                <main className="auth-pages">
                    <div className="container">
                        <section className="auth-content">
                            <h2 className="auth-title">Welcome to Strada</h2>
                            <h4 className="auth-subtitle">Al tools for commercial property management</h4>
                            <Formik
                                {...[this.props]}
                                enableReinitialize
                                initialValues={initValue}
                                // validationSchema={Yup.object().shape({email})}
                                validate={validate(getValidationSchema)}
                                // validate={async (values) => {
                                //     return await validate(getValidationSchema)(values);
                                // }}
                                onSubmit={this.onSubmit}
                            >
                                {({ setFieldValue, values, errors,touched, ...rest}) => {
                                    return (
                                        <Form action="">
                                            <div className={"text-field" + (touched.first_name && errors.first_name ? ' invalid' : '')}>
                                                <Field type="text" name="first_name" placeholder="First Name" />
                                                <p className="error-text"><ErrorMessage name="first_name"/></p>
                                            </div>
                                            <div className={"text-field" + (touched.last_name && errors.last_name ? ' invalid' : '')}>
                                                <Field type="text" name="last_name" placeholder="Last Name" />
                                                <p className="error-text"><ErrorMessage name="last_name"/></p>
                                            </div>
                                            <div className={"text-field" + (touched.email && errors.email ? ' invalid' : '')}>
                                                <Field type="text" name="email" placeholder="Email Address" />
                                                <p className="error-text"><ErrorMessage name="email"/></p>
                                            </div>
                                            <div className={"text-field" + (touched.password && errors.password ? ' invalid' : '')}>
                                                <Field type="password" name="password" placeholder="Enter Password" />
                                                <p className="error-text"><ErrorMessage name="password"/></p>
                                            </div>
                                            <div className="flex submit">
                                                <div  className={"text-field" + (touched.passwordConfirmation && errors.passwordConfirmation ? ' invalid' : '')}>
                                                    <Field type="password" name="passwordConfirmation" placeholder="Confirm Password" />
                                                    <p className="error-text"><ErrorMessage name="passwordConfirmation"/></p>
                                                </div>
                                                <button type="submit" className="btn filled primary w-xs ml-8">Get Started</button>
                                            </div>
                                            {registerUserError && registerUserError.detail &&
                                                <div>
                                                    {registerUserError.detail}
                                                </div>
                                            }
                                            {confirmationText &&
                                                <div>
                                                    {confirmationText}
                                                </div>
                                            }
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </section>
                    </div>
                </main>
                {/* Main section end*/}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        registerUserError:state.auth.registerUserError
    };
};

export default connect(mapStateToProps, { registerUserAction, clearRegisterUserAction })(Signup);
