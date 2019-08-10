import * as React from 'react';
import { Link } from "react-router-dom";

export default class Vendor extends React.Component {
    render() {
        return (
            <div className="page-content vendor-contracts">
                <h1 className="page-title">vendor contracts</h1>
                <span className="page-icon">
            <i className="icon-vendor" />
          </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">vendor contracts</h2>
                    <h6 className="page-desc">
                        Create and manage your vendor contracts here
                    </h6>
                    <button className="btn filled primary w-lg mt-6">
                        <Link to={`/vendor/create-contract`}> create new contract</Link>
                    </button>
                    <div className="main-table contracts-table">
                        <table>
                            <thead>
                            <tr>
                                <th>Saved Contracts</th>
                                <th>Date</th>
                                <th>Version</th>
                                <th>Executed Contract</th>
                                <th>{''}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td data-label="Saved Contracts">Lobby Remodel</td>
                                <td data-label="Date">08.10.2018</td>
                                <td data-label="Version">unsigned</td>
                                <td data-label="Executed Contract">
                                    <span className="file-upload-tertiary">
                                        <label className="file-upload-label">
                                            <input type="file"/>
                                            upload here
                                        </label>
                                    </span>
                                </td>
                                <td data-label="Manage">
                                    <a className="action-secondary">edit</a>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Saved Contracts">Security camera update</td>
                                <td data-label="Date">08.10.2018</td>
                                <td data-label="Version">unsigned</td>
                                <td data-label="Executed Contract">signed</td>
                                <td data-label="Manage">
                                    <a className="action-secondary">edit</a>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Saved Contracts">Security camera update</td>
                                <td data-label="Date">08.10.2018</td>
                                <td data-label="Version">unsigned</td>
                                <td data-label="Executed Contract">
                                    <div className="text-field primary invalid">
                                        <input type="text"/>
                                        <p className="error-text">This field is required</p>
                                    </div>
                                </td>
                                <td data-label="Manage">
                                    <a className="action-secondary mr-3">save</a>
                                    <a className="action-secondary remove">delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td data-lable="Saved Contracts">Security camera update</td>
                                <td data-lable="Date">08.10.2018</td>
                                <td data-lable="Version">unsigned</td>
                                <td data-lable="Executed Contract">signed</td>
                                <td data-lable="Manage">
                                    <a className="action-secondary">edit</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
