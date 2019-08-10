import * as React from 'react';
import { match, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { checkAccountAction, confirmAccountAction } from '../../actions/auth';
import {ChangeEvent} from "react";

export interface Props {
    match: match<{ token: string }>,
    checkAccountAction: any,
    confirmAccountAction: any
}

export interface State {
    confirmAccount: string,
    password: any,
    repeatPassword: any
}

class ConfirmAccount extends React.Component<Props & RouteComponentProps, State> {
    state = {
        confirmAccount: 'pending',
        password: '',
        repeatPassword: ''
    };

    componentDidMount() {
        const token = this.props.match.params.token;
        this.props.checkAccountAction(token).then(res => {
            this.setState({ confirmAccount: 'confirmed' });
        }).catch(error => {
            this.setState({ confirmAccount: 'unConfirmed' })
        });
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({[name]: value} as any);
    };

    handleSubmit = event => {
        event.preventDefault();
        const data = {
            password: this.state.password,
            repeat_password: this.state.repeatPassword,
            token: this.props.match.params.token
        };

        this.props.confirmAccountAction(data).then(res => {
            if(res.data.result === 'success') {
                this.props.history.push('/signin');
            }
        });
    };


    render() {
        return (
            <div>
                <h2>ConfirmAccount</h2>
                { this.state.confirmAccount === 'confirmed' && <form onSubmit={this.handleSubmit}>
                    <input type="password" name='password' value={this.state.password} onChange={this.handleChange} placeholder='Password'/>
                    <input type="password" name='repeatPassword' value={this.state.repeatPassword} onChange={this.handleChange} placeholder='Repeat Password'/>
                    <button>Confirm</button>
                </form>}

                { this.state.confirmAccount === 'unConfirmed' && <div>
                    The link you're following seems to be expired, please contact the administrator for information.
                </div>}

                { this.state.confirmAccount === 'pending' && <div>
                    Checking token...
                </div>}
            </div>
        );
    }
}

export default connect(null, { checkAccountAction, confirmAccountAction })(ConfirmAccount);
