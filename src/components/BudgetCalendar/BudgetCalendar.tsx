import * as React from 'react';

const BudgetCalendar = () => {
    return (
        <div className="page-content budget-calendar">
            <h1 className="page-title">budget calendar</h1>
            <span className="page-icon">
          <i className="icon-calendar"/>
                </span>
            <div className="main-content mt-6">
                <h2 className="page-subtitle">budget calendar</h2>
                <h6 className="page-desc">overview of coming non-recurring events</h6>
            </div>
            <div className="items">
                <div className="item">
                    <div className="table-tertiary budget-calendar-table">
                        <div className="table-title">
                            <p>February</p>
                            <span className="collapse">-</span>
                        </div>
                        {/* Please add "d-none" class to the table if you want to hide it while clicking on "collapse"  */}
                        <table>
                            <thead>
                            <tr>
                                <th>EVENT</th>
                                <th>G/L Code</th>
                                <th>AMOUNT BUDGETED</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td data-label="EVENT">
                                    Walk-off mats
                                </td>
                                <td data-label="G/L Code">
                                    43823
                                </td>
                                <td data-label="AMOUNT BUDGETED">
                                    $8000
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="item">
                    <div className="table-tertiary budget-calendar-table">
                        <div className="table-title">
                            <p>February</p>
                            <span className="collapse">-</span>
                        </div>
                        {/* Please add "d-none" class to the table if you want to hide it while clicking on "collapse"  */}
                        <table>
                            <thead>
                            <tr>
                                <th>EVENT</th>
                                <th>G/L Code</th>
                                <th>AMOUNT BUDGETED</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td data-label="EVENT">
                                    Walk-off mats
                                </td>
                                <td data-label="G/L Code">
                                    43823
                                </td>
                                <td data-label="AMOUNT BUDGETED">
                                    $8000
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetCalendar;