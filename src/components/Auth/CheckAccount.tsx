import * as React from 'react';
import Header from "../Website/Header";
import {connect} from "react-redux";
import {checkUserTokenAction, clearUserTokenAction} from "../../actions";
import { RouteComponentProps} from "react-router";

interface MatchParams {
    token: string;
}

export interface Props extends RouteComponentProps<MatchParams>{
    userTokenError:any;
    checkUserTokenAction(data:any);
    clearUserTokenAction();
}

class CheckAccount extends React.Component<Props> {
    state = {
        confirmationText:'',
    };


    componentDidMount(): void {
        const token = this.props.match.params.token;
        this.props.checkUserTokenAction({token}).then(() => {
            const confirmationText = 'Your account is being reviewed by the Admin. You will get an e-mail notification once it is confirmed.';
            this.setState({confirmationText});

            this.props.clearUserTokenAction();
        })
    }

    render() {
        const {userTokenError} = this.props;
        const {confirmationText} = this.state;

        return (
            <div>
                <Header/>
                {/* Main section start */}
                <main className="auth-pages">
                    <div className="container">
                        <section className="auth-content">
                            <h2 className="auth-title">Confirmation Page</h2>
                            <h4 className="auth-subtitle">
                                {userTokenError && userTokenError.detail &&
                                    <div>
                                        {userTokenError.detail}
                                    </div>
                                }
                                {confirmationText &&
                                    <div>
                                        {confirmationText}
                                    </div>
                                }
                            </h4>
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
        userTokenError:state.auth.userTokenError
    };
};

export default connect(mapStateToProps, { checkUserTokenAction, clearUserTokenAction })(CheckAccount);
