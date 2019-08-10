import * as React from 'react';
import {ErrorMessage, Field} from "formik";

class CategoryViewFieldCreator extends React.Component<{labelName:any,errors:any,touched:any,keyName:any}> {
    render(){
        const {labelName,errors,touched,keyName} = this.props;
        return(
            <li>
                <span className="label">{labelName}</span>
                <div className={"text-field primary icon no-margin "+ ((errors[keyName] && touched[keyName]) ? 'invalid' : '' )}>
                    {/*<input type="text" value={each_occourrence} name={'each_occourrence'} onChange={this.oninputChange}/>*/}
                    <Field name={keyName}  type="text" />
                    <ErrorMessage name={keyName}/>
                    <span className="input-icon">$</span>
                </div>
            </li>
        )
    }
}
export default CategoryViewFieldCreator;