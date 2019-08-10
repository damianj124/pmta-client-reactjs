import * as React from 'react';
import Select from "react-select";
// import "react-select/dist/react-select.css";


class ReactSelect extends React.Component<{field: string, setFieldValue: any, values: any, options: any}> {

  render() {
    const { setFieldValue, values, field, options } = this.props;
    const formattedOptions = options.map(option => ({value: option.id, label: option.label }));
    return (
      <Select
        value={values[field]}
          // tslint:disable-next-line jsx-no-lambda
        onChange= { value => setFieldValue(field, value)}
        options={formattedOptions}
      />
    );
  }
}

export default ReactSelect;
