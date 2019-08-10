
import * as React from 'react';
import { Link } from "react-router-dom";
import DatePicker from "./DatePicker";

export default class ContractDetails extends React.Component {
  render() {
    return (
      <div>
        <div className="page-content contract-details">
          <h1 className="page-title">vendor contracts</h1>
          <span className="page-icon">
            <i className="icon-vendor" />
          </span>
          <div className="main-content mt-5">
            <h2 className="color-primary fw-300">Construction Contract:</h2>
            <h4>
              Please fill in the following questions to generate your contract
            </h4>
            <div className="box">
              <ul className="details">
                <li>
                  <div className="text-field primary">
                    <span className="label mr-2">Contract Price:</span>
                    <div className="content">
                      <input
                        id="name"
                        type="text"
                        placeholder="$ click to add..."
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="date-picker primary invalid relative">
                    <span className="label mr-2">
                      scheduled commencement date:
                    </span>
                    <div className="content">
                      <DatePicker />
                      <p className="error-text">This field is required *</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="date-picker primary">
                    <span className="label mr-2">
                      scheduled commencement date:
                    </span>
                    <div className="content">
                      <DatePicker  />
                    </div>
                  </div>
                </li>
              </ul>
              <div className="flex align-center justify-end">
                <Link
                  to={"/vendor/create-contract/contract-license/license-check"}
                  className="btn filled primary w-xxxs h-sm mr-1 icon"
                >
                  <i className="icon-left-arrow-icon" />
                </Link>
                <Link
                  to={
                    "/vendor/create-contract/contract-license/license-check/contract-license/owner-contract"
                  }
                  className="btn filled primary w-xs h-sm continue"
                >
                  continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
