import * as React from 'react';
import { Link } from "react-router-dom";

const ContractLicense = () => {
  return (
      <div className="page-content contract-license">
          <h1 className="page-title">vendor contracts</h1>
          <span className="page-icon">
          <i className="icon-vendor"/>
        </span>
          <div className="main-content mt-5">
              <h2 className="color-primary fw-300">Construction Contract</h2>
              <h4>
                  Please fill in the following questions to generate your contract
              </h4>
              <div className="box">
                  <div className="text-field primary grey">
                      <label htmlFor="license" className="black">
                          contractor license number
                      </label>
                      <div className="content">
                          <input type="text" id="license" placeholder="_"/>
                      </div>
                  </div>
                  <div className="continue-section">
                      <p className="help">
                          *or skip search and enter contractor info manually{" "}
                          <a href="#">here</a>
                      </p>
                      <Link
                          to={`/vendor/create-contract/contract-license/license-check`}
                          className="btn filled primary w-xs h-sm continue"
                      >
                          continue
                      </Link>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ContractLicense;
