import * as React from 'react';
import { Link } from "react-router-dom";

const CreateContract = () => {
  return (
      <div className="page-content create-contract">
          <h1 className="page-title">vendor contracts</h1>
          <span className="page-icon">
          <i className="icon-vendor" />
        </span>
          <div className="main-content mt-5">
              <h2 className="color-primary fw-300">
                  Select the type of the contract you would like to create
              </h2>
              <ul className="contract-types">
                  <li>
                      <Link to="/vendor/create-contract/contract-license">
                          construction contract
                      </Link>
                  </li>
                  <li>
                      <a href="#">service contract</a>
                  </li>
              </ul>
              <a href="#" className="add">
                  + add new contract type
              </a>
          </div>
      </div>
  );
};

export default CreateContract;
