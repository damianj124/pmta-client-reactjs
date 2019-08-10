import * as React from 'react';
import {Field} from 'formik';

const CoisViewFileds = (props) => {
    return (
        <ul className="details">
            <li>
                <label>{props.filedetName}</label>
            </li>
            {props.values.map(((value, i) => {
                return (
                <li key={i}>
                    <div
                         className={"text-field primary" + (props.err[props.keys[i]] ? ' invalid' : '')}>
                        <label htmlFor="" className="label">{props.keys[i]}:</label>
                        <div className="content">
                            <Field type="text" value={value} name={props.keys[i]}/>
                            {props.keys[i] === 'exp_date' && props.err[props.keys[i]]
                            && <p className="error-text">This field is required * YYYY-MM-DD  </p> }
                        </div>
                    </div>
                </li>)
            }))}

        </ul>
    );
};

export default CoisViewFileds;