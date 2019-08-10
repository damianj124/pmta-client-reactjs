import * as React from 'react';
import {Field} from "formik";

class CategoryViewCheckboxFieldCreator extends React.Component<{labelName:any,keyName:any}> {
    render(){
        const {labelName,keyName} = this.props;
        return(
            <li>
                <label className="checkbox axis">
                    <Field type="checkbox" className="checkbox-control" name={keyName}/>
                    <span className="check-icon">{''}</span>
                    <span className="checkbox-label text-uppercase">{labelName}</span>
                </label>
            </li>
        )
    }
}
export default CategoryViewCheckboxFieldCreator;