import * as React from 'react';
import Select from "react-select";
// import "react-select/dist/react-select.css";

const options = [
  { value: "chax", label: "Chax" },
  { value: "cancar", label: "Cancar" },
  { value: "nikulin", label: "Nikulin" }
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
