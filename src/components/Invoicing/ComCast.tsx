import * as React from 'react';
import img from "./../../assets/img/comcast.png";

const ComCast = () => {
    return (
        <div className="page-content comcast">
            <h1 className="page-title">Invoicing</h1>
            <div className="main-content mt-6">
                <div className="ml-4">
                    <h2 className="page-subtitle">ComCast</h2>
                    <p className="date">Date processed: 10.18.2018</p>
                    <div className="buttons mt-6 mb-7">
                        <a className="btn h-md filled secondary w-xxxs mr-4"><i className="icon-left-arrow-icon mr-2 font-sm"/>back </a>
                        <button className="btn h-md filled primary w-xxs">Download PDF</button>
                    </div>
                </div>
                <div className="doc-file">
                    <img src={img} alt="Doc image" className="file"/>
                </div>
            </div>
        </div>
    );
};

export default ComCast;