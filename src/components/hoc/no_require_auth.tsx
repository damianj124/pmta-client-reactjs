import * as React from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from "react-router";

export default function (ComposedComponent) {
    class NotAuthentication extends React.Component<RouteComponentProps & {authenticated: boolean}, {}> {
        componentWillMount() {
            if (this.props.authenticated) {
                this.props.history.push('/dashboard');
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.authenticated) {
                this.props.history.push('/dashboard');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(NotAuthentication);
}