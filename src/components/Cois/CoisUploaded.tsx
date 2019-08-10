import * as React from 'react';

const CoisUploaded = () => {
    return (
        <div className="page-content cois-uploaded">
            <h1 className="page-title">cois</h1>
            <span className="page-icon">
                <i className="icon-cois"/>
            </span>
            <div className="main-content mt-6">
                <h2 className="page-subtitle">cois uploaded</h2>
                <p className="color-primary pb-10">click to edit any of the info below</p>
                <div className="text-center mt-10 info-texts">
                    <p className="success-message">2 of 3 COI’s successfully uploaded!</p>
                    <p className="pb-3">1 of 3 COI’s require manual input</p>
                    <div className="buttons mt-10 mb-10">
                        <a href="/cois/cois-view"
                            className="btn filled primary w-xs h-md radius-lg mr-8"
                        >
                            Input Now
                        </a>
                        <button className="btn filled primary w-xs h-md radius-lg">Save & Input later</button>
                    </div>
                    <p className="mb-6">or</p>
                    <a href="#" className="color-secondary text">disregard these COI’s?</a>
                </div>
            </div>
        </div>
    );
};

export default CoisUploaded;
