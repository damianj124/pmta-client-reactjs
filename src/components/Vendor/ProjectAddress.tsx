import * as React from 'react';
import {Link} from 'react-router-dom';
import ReactSelect from "./Select";

export default class ProjectAddress extends React.Component {
    render() {
        return (
            <div>
                <div className="page-content project-address">
                    <h1 className="page-title">vendor contracts</h1>
                    <span className="page-icon"><i className="icon-vendor" /></span>
                    <div className="main-content mt-5">
                        <h2 className="color-primary fw-300">Construction Contract</h2>
                        <h4>Please fill in the following questions to generate your contract</h4>
                        <div className="box">
                            <form action="">
                                <ul className="project-details">
                                    <li>
                                        <div className="select-box secondary w-md invalid">
                                            <span className="label">Project address</span>
                                            <div className="content">
                                                <ReactSelect/>
                                                <p className="error-text">This field is required *</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="select-box secondary w-sm">
                                            <span className="label">List of plans and specifications: </span>
                                            <div className="content flex align-center justify-end">
                                                <label className="mr-3">See exhibit</label>
                                                <ReactSelect/>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="text-field primary">
                                            <span className="label mr-2">Brief project description:</span>
                                            <div className="content">
                                                <input id="name" type="text" placeholder="click to type..." />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="flex align-center justify-end">
                                    <Link to={"/vendor/create-contract/contract-license/license-check"} className="btn filled primary w-xxxs h-sm mr-1 icon"><i className="icon-left-arrow-icon" /></Link>
                                    <Link to={"/vendor/create-contract/contract-license/license-check/contract-license/owner-contract"} className="btn filled primary w-xs h-sm continue">continue</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
