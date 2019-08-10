import * as React from 'react';
import {ChangeEvent} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {signInAction} from "../../actions";
import {withFormik,Form,Field} from "formik";
import Header from "../Website/Header";
import {Link} from "react-router-dom";
import * as yup from 'yup';
import {password,email} from '../../utils/form/getValidationSchema';


export interface State {
    email: string,
    password: any
}

export interface Props {
    signInAction: any,
    errors: any,
    touched: any,
    authError: any,
}

class Login extends React.Component<Props, State> {

    state = {
        email: '',
        password: ''
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({[name]: value} as any);
    };



    render() {
        const {errors,touched,authError} = this.props;
        return (
            <div>
                <Header/>
                {/* Main section start */}
                <main className="auth-pages">
                    <div className="container">
                        <section className="auth-content">
                            <h2 className="auth-title">Welcome to Strada</h2>
                            <h4 className="auth-subtitle">Al tools for commercial property management</h4>
                            <Form >
                                <div className={"text-field" + (errors.email && touched.email && " invalid" || '')}>
                                    <Field name='email'  type="text" placeholder="Email Address"/>
                                    {errors.email && touched.email && <p className="error-text">{errors.email}</p>}
                                </div>
                                <div className="flex submit">
                                    <div className={"text-field" + (errors.password && touched.password && " invalid" || '')}>
                                        <Field name='password' type="password" placeholder="Password"/>
                                        {errors.password && touched.password && <p className="error-text">{errors.password}</p>}
                                    </div>
                                    <button className="btn filled primary w-xs ml-8" type="submit">Sign In</button>
                                </div>
                                {authError && <p className="error-text" >{authError}</p>}
                            </Form>
                            <p className="info-text">don’t have an account?  <Link to={'/signup'}>create one</Link></p>
                        </section>
                    </div>
                </main>
                {/* Main section end*/}
            </div>
        );
    }
}

const mapStateToProps = state => {
      return{
          authError: state.auth.error,
      }
};

export default compose(
    connect(mapStateToProps, { signInAction }),
    withFormik({
        mapPropsToValues() {
            return {
                email: '',
                password:'',
            };
        },
        validationSchema: yup.object().shape({
            password,
            email
        }),
        handleSubmit(values,props) {
            const data = {
                // @ts-ignore
                email: values.email,
                // @ts-ignore
                password: values.password
            };
            // @ts-ignore
            props.props.signInAction(data);

        },
    }),
// @ts-ignore
)(Login);
