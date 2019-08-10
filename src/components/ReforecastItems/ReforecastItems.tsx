import * as React from 'react';

const ReforecastItems = () => {
    return (
        <div className="page-content reforecast-items">
            <h1 className="page-title">reforecast items</h1>
            <span className="page-icon">
            <i className="icon-reforcast"/>
            </span>
            <div className="main-content mt-6">
                <h2 className="page-subtitle">reforecast items</h2>
                <h6 className="page-desc">RUNNING LIST OF ITEMS TO BE REFORECASTED</h6>
            </div>
            <div className="items">
                <div className="text-right">
                    <button className="btn link grey no-underline w-lg"> <i className="icon-download mr-2">{""}</i> download as spreadsheet</button>
                </div>
                <div className="item">
                    <div className="table-tertiary reforecast-items-table">
                        <div className="table-title">
                            <p>February</p>
                            <span className="collapse">-</span>
                        </div>

                        {/* Please add "d-none" class to the table if you want to hide it while clicking on "collapse"  */}

                        {/*  Table start */}
                        <table>
                            <thead>
                            <tr>
                                <th>EVENT</th>
                                <th>Initial Date</th>
                                <th>New Date</th>
                                <th>G/L Code</th>
                                <th>AMOUNT BUDGETED</th>
                                <th>{""}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td data-label="EVENT">
                                    Elevator Testing
                                </td>
                                <td data-label="Initial Date">
                                    February 2019
                                </td>
                                <td data-label="New Date">
                                    March 2019
                                </td>
                                <td data-label="G/L Code">
                                    50110
                                </td>
                                <td data-label="AMOUNT BUDGETED">
                                    $8000
                                </td>
                                <td data-label="Actions">
                                    <ul className="actions">
                                        <li><button className="btn-simple font-xs">edit</button></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="EVENT">
                                    <div className="text-field primary">
                                        <div className="content">
                                            <input type="text" />
                                        </div>
                                    </div>
                                </td>
                                <td data-label="Initial Date">
                                    <div className="text-field primary">
                                        <div className="content">
                                            <input type="text" />
                                        </div>
                                    </div>
                                </td>
                                <td data-label="New Date">
                                    <div className="text-field primary">
                                        <div className="content">
                                            <input type="text" />
                                        </div>
                                    </div>
                                </td>
                                <td data-label="G/L Code">
                                    <div className="text-field primary">
                                        <div className="content">
                                            <input type="text" />
                                        </div>
                                    </div>
                                </td>
                                <td data-label="AMOUNT BUDGETED">
                                    <div className="text-field primary">
                                        <div className="content">
                                            <input type="text" />
                                            <p className="error-text">* This filed is required</p>
                                        </div>
                                    </div>
                                </td>
                                <td data-label="Actions">
                                    <ul className="actions">
                                        <li>
                                            <button className="btn-simple">save</button>
                                        </li>
                                        <li>
                                            <button className="btn-simple">cancel</button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        {/* Table end */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReforecastItems;