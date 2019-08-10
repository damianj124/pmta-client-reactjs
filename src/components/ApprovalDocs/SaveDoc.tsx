import * as React from 'react';
import img from "./../../assets/img/doc-image.png";
import ReactSelect from "./Select";

const SaveDoc = () => {
    return (
        <div className="page-content save-doc">
            <h1 className="page-title">approval documents</h1>
            <div className="doc-content">
                <div className="doc-details">
            <span className="page-icon">
              <i className="icon-approval"/>
            </span>
                    <div className="main-content mt-6">
                        <h2 className="page-subtitle">Approval documents</h2>
                        <h6 className="page-desc">
                            view and manage your approval documents here
                        </h6>
                        <p className="block-title">new approval document</p>
                        <div className="text-field primary mt-10 invalid">
                            <label htmlFor="name" className="black">
                                Name:
                            </label>
                            <div className="content">
                                <input type="text" id="name"/>
                                <p className="error-text">This field is required *</p>
                            </div>
                        </div>
                        <div className="select-box">
                            <span className="label">Manager Approval:</span>
                            <ReactSelect/>
                        </div>
                        <div className="action-buttons">
                            <button className="btn filled cancel w-xxs mr-9">cancel</button>
                            <button className="btn filled primary w-xxs">save</button>
                        </div>
                    </div>
                </div>
                <div className="doc-file">
                    <img src={img} alt="Doc image" className="file"/>
                </div>
            </div>
        </div>
    );
};

export default SaveDoc;
