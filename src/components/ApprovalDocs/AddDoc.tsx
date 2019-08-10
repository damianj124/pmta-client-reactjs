import * as React from 'react';

const AddDoc = () => {
  return (
      <div className="page-content add-approval-doc">
          <h1 className="page-title">approval documents</h1>
          <span className="page-icon">
          <i className="icon-approval" />
        </span>
          <div className="main-content mt-6">
              <h2 className="page-subtitle">Approval documents</h2>
              <h6 className="page-desc">
                  view and manage your approval documents here
              </h6>
              <p className="block-title">new approval document</p>
              <form action="">
                  <div className="file-upload-secondary">
                      <div className="image-upload-wrap">
                          <label
                              htmlFor="file-upload-input"
                              className="file-upload-label"
                          >
                              <input
                                  id="file-upload-input"
                                  className="file-upload-input"
                                  type="file"
                              />
                          </label>
                          <div className="drag-text">
                              <p className="text">
                                  drop approval doc here <span>(or choose file)</span>
                              </p>
                          </div>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  );
};

export default AddDoc;
