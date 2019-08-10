import * as React from 'react';
import {Link} from 'react-router-dom'

export default class LicenseCheck extends React.Component {
    render() {
        return (
            <div className="page-content license-check">
                <h1 className="page-title">vendor contracts</h1>
                <span className="page-icon"><i className="icon-vendor" /></span>
                <div className="main-content mt-5">
                    <h2 className="color-primary fw-300">Construction Contract</h2>
                    <h4>Please fill in the following questions to generate your contract</h4>
                    <div className="box">
                        <h2 className="title">contractor license check</h2>
                        <ul className="details">
                            <li>
                                <span className="label">Name</span>
                                <span className="value">James Canden</span>
                            </li>
                            <li>
                                <span className="label">license number</span>
                                <span className="value">87435986356</span>
                            </li>
                            <li>
                                <span className="label">Street</span>
                                <span className="value">840 Market</span>
                            </li>
                            <li>
                                <span className="label">City/State/Zip</span>
                                <span className="value">Oakland CA 94607</span>
                            </li>
                            <li>
                                <span className="label">Phone</span>
                                <span className="value">510-428-8823</span>
                            </li>
                            <li>
                                <span className="label">Fax</span>
                                <span className="value">510-428-8823</span>
                            </li>
                            <li>
                                <span className="label">Representative/Title</span>
                                <span className="value">Owner</span>
                            </li>
                            <li>
                                <span className="label">Superintendent</span>
                                <span className="value">Cameron Danen</span>
                            </li>
                        </ul>
                        <div className="flex align-center justify-end">
                            <Link to={"/vendor/create-contract/contract-license"} className="btn filled primary w-xxxs h-sm mr-1 icon"><i className="icon-left-arrow-icon" /></Link>
                            <Link to={"/vendor/create-contract/contract-license/license-check/contract-license"} className="btn filled primary w-xs h-sm continue">continue</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
