import * as React from 'react';

class Spinner extends React.Component {

    render() {
        return <div className="lds-ring" >
            <div />
            <div />
            <div />
            <div />
        </div>;
    }
}

export default Spinner;
