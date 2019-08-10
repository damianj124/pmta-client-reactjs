import * as React from 'react';
import Select from "react-select";
// import "react-select/dist/react-select.css";


class ReactSelect extends React.Component<{options: any, setFieldValue: any, field: any, value: any , name: any} & {}> {
  // state = {
  //   selectedOption: null
  // };
  //
  // handleChange = selectedOption => {
  //   this.setState({ selectedOption });
  // };
  render() {
    const { setFieldValue, field, value, options,name } = this.props;
    return (
      <Select
        value={value}
        onChange={v => setFieldValue(field, v)}
        options={options}
        name={name}
      />
    );
  }
}

export default ReactSelect;
