import * as React from 'react';
import Select from "react-select";
// import "react-select/dist/react-select.css";


class ReactMultiSelect extends React.Component<{options: any, setFieldValue: any, field: any, value: any } & {}> {
    state = {
        selectedOption: null
    };


    render() {
        const { options, setFieldValue, field, value } = this.props;
        return (
            <Select value={value} isMulti options={options} onChange={v =>  setFieldValue(field, v)}/>
        );
    }
}

export default ReactMultiSelect;
