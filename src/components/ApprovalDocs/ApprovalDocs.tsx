import * as React from 'react';
import { Link } from "react-router-dom";

const ApprovalDocs = () => {
  return (
      <div className="page-content approval-docs">
          <h1 className="page-title">approval documents</h1>
          <span className="page-icon">
          <i className="icon-approval" />
        </span>
          <div className="main-content mt-6">
              <h2 className="page-subtitle">Approval documents</h2>
              <h6 className="page-desc">
                  view and manage your approval documents here
              </h6>
              <ul className="manage-list">
                  <li>
                      <span className="item">Access control system</span>
                      <Link to={`/approval-docs/view-doc`} className="action-secondary">
                          edit
                      </Link>
                  </li>
              </ul>
              <div className="mt-7">
                  <Link
                      to={`/approval-docs/add-doc-upload`}
                      className="btn filled primary w-lg"
                  >
                      add approval doc (s)
                  </Link>
              </div>
          </div>
      </div>
  );
};

export default ApprovalDocs;
