import * as React from 'react';
import { Link } from "react-router-dom";
import img from "./../../assets/img/doc-image.png";

const ViewDoc = () => {
  return (
      <div className="page-content view-approval-doc">
          <h1 className="page-title">approval documents</h1>
          <div className="doc-content">
              <div className="doc-actions">
            <span className="page-icon">
              <i className="icon-approval" />
            </span>
                  <div className="main-content mt-6">
                      <h2 className="page-subtitle">Approval documents</h2>
                      <h6 className="page-desc">
                          view and manage your approval documents here
                      </h6>
                      <p className="block-title">access control system</p>
                      <ul className="action-list mt-5">
                          <li>Edit options</li>
                          <li>
                              <a href="#">- Rename</a>
                          </li>
                          <li>
                              <Link to={`/approval-docs/view-doc/save-doc`}>
                                  - Add page
                              </Link>
                          </li>
                          <li>
                              <a href="">- Delete</a>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="doc-file">
                  <img src={img} alt="Docimage" className="file" />
              </div>
          </div>
      </div>
  );
};

export default ViewDoc;
