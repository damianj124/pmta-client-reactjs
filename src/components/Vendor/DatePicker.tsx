import * as React from 'react';
import omit from "lodash/omit";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { SingleDatePicker } from "react-dates";

interface State {
    focused: any,
    date: any
}

class DatePicker extends React.Component<object, State> {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            date: null
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDateChange(date) {
        this.setState({ date });
    }

    onFocusChange({ focused }) {
        this.setState({ focused });
    }

    render() {
        const focused = this.state.focused;
        const date = this.state.date;

        const props = omit(this.props, ["autoFocus", "initialDate"]);

        return (
            <SingleDatePicker
                {...props}
                id="date_input"
                date={date}
                focused={focused}
                onDateChange={this.onDateChange}
                onFocusChange={this.onFocusChange}
            />
        );
    }
}

export default DatePicker;
