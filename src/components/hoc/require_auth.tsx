import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";

export default ComposedComponent => {
    class Authentication extends React.Component<RouteComponentProps & {authenticated: boolean}, {}> {
        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/signin');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
                authenticated: state.auth.authenticated,
                userData: state.auth.userData
            };
    }

    return connect(mapStateToProps)(Authentication);
}