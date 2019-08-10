import * as React from 'react';
import Select from "react-select";
// import "react-select/dist/react-select.css";

const options = [
  { value: "750 Market St", label: "750 Market St" },
  { value: "770 Market St", label: "770 Market St" },
  { value: "870 Market St", label: "870 Market St" }
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
