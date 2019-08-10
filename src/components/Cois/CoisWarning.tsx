import * as React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {getCoisErrorsAction} from '../../actions/settings'


export interface Props {
    coisErrors: any,
    fromCois: any,
    coisErrorPage: any,
    getCoisErrorsAction: any,
    match: any,
}

class CoisWarning extends React.Component<Props> {
    componentDidMount(){
        this.props.getCoisErrorsAction(this.props.match.params.prop_id);
    }

    render() {
        const {coisErrors} = this.props;

        return(
            <div className="page-content cois-warning">
                <h1 className="page-title">cois</h1>
                <span className="page-icon">
                  <i className="icon-cois"/>
                </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">cois</h2>
                    <div className="block-warning flex align-center mt-10 pb-10">
                        <i className="icon-exclamation mr-2 ml-2">{''}</i>
                        <p className="text-warning mr-6">DEFICIENT CERTIFICATES</p>
                    </div>
                    {coisErrors && coisErrors.errors.map((error, index) => {
                        let sentNotes = {};
                        let arrayOfObjectErrors = error.filter((err) => {
                            // @ts-ignore
                            const values = Object.values(err);
                            const keys = Object.keys(err);
                            if(keys[0] === 'sent_notes'){
                                sentNotes = {a:values[0]};
                            }
                            return keys.length === 1 && !Array.isArray(values[0]) && keys[0] !== 'sent_notes' && values[0]
                        });
                        const arrayOfErrors = error.filter((err) => {
                            // @ts-ignore
                            const values = Object.values(err);
                            const keys = Object.keys(err);

                            return keys.length === 1 && Array.isArray(values[0]) && values[0]
                        });
                        for (const arrayOfError of arrayOfErrors) {
                            // @ts-ignore
                            arrayOfObjectErrors = arrayOfObjectErrors.concat(Object.values(arrayOfError)[0]);
                        }
                        // console.log(error);
                        const insuredArray = error.filter((err) => {
                            return err.cois_id && err
                        });
                        return (
                            <div className="warning-content" key={index}>
                                <div className="warning-header flex justify-between align-center">
                                    <p className="title">{insuredArray[0] && insuredArray[0].insured}</p>
                                    <Link className="btn filled black w-xxs h-sm" to={'/cois/cois-check/' + (insuredArray[0] && insuredArray[0].cois_id) }>send notice</Link>
                                </div>
                                {sentNotes && <p className="color-warning text-right mt-1">Notice sent!</p>}
                                <ul className="list-warning">
                                    {arrayOfObjectErrors.map((val, ind) => {
                                        const k = Object.keys(val);
                                        const str = k.filter((st) => {
                                            return st.search('email') === -1 && st
                                        });
                                        return (
                                            <li key={ind}><i className="icon-exclamation">{''}</i>{val[str[0]]}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        coisErrors: state.settings.coisErrors,
        coisErrorPage: state.settings.coisErrorPage,
    }
};

export default connect(mapStateToProps,{getCoisErrorsAction})(CoisWarning);
