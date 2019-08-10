import React from "react";

const Invoicing = () => {
    return (
        <app-invoicing>
            <div className="page-content invoice">
                <h1 className="page-title">Invoicing</h1>
                <span className="page-icon">
          <i className="icon-invoice" />
        </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">invoicing</h2>
                    <h6 className="page-desc">manage your invoices here</h6>
                    <form action="" className="upload-form">
                        <div className="file-upload-primary">
                            <div className="image-upload-wrap">
                                <label className="file-upload-label">
                                    <input
                                        className="file-upload-input"
                                        type="file"
                                    />
                                </label>
                                <div className="drag-text">
                                    <i className="icon-pdf">
                                        <span className="path1" />
                                        <span className="path2" />
                                        <span className="path3" />
                                        <span className="path4" />
                                        <span className="path5" />
                                    </i>
                                    <p className="text-capitalize mt-9">
                                        drop PDF(
                                        <span className="text-lowercase">s</span>) invoice here
                                    </p>
                                    <p className="underline">choose file</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </app-invoicing>
    );
};

export default Invoicing;
