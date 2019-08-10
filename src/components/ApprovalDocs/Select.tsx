import * as React from 'react';
import Select from "react-select";
// import "react-select/dist/react-select.css";

const options = [
  { value: "Property-1", label: "Property-1" },
  { value: "Property-2", label: "Property-2" },
  { value: "Property-3", label: "Property-3" }
];

class ReactSelect extends React.Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default ReactSelect;
