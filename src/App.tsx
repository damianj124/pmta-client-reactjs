import * as React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Content from "./components/Content";

import Signin from "./components/Auth/Login";
import Signup from "./components/Auth/Signup"
import noRequireAuth from "./components/hoc/no_require_auth";
import ConfirmAccount from "./components/Auth/Confirm-account";
import SignPdf from "./components/SignPdf/SignPdf";
import Homepage from "./components/Website/Homepage";
import LearnMore from "./components/Website/LearnMore";
import CheckAccount from "./components/Auth/CheckAccount";



class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>

                    <Route exact path="/confirm-account/:token" component={noRequireAuth(ConfirmAccount)} />
                    <Route exact path="/signin" component={noRequireAuth(Signin)} />
                    <Route exact path="/signup" component={noRequireAuth(Signup)} />
                    <Route exact path="/check-account/:token" component={noRequireAuth(CheckAccount)} />
                    <Route exact path="/sign/:sign/:id" component={SignPdf} />
                    <Route path="/homepage" component={Homepage} />
                    <Route path="/learn-more" component={LearnMore} />
                    <Route path="/" component={Content} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
