import * as React from 'react';
import ReactSelect from '../Invoicing/Select';
import * as moment from "moment";
import {connect} from "react-redux";
import {editVendorCategoryt} from '../../actions/settings'

interface Props {
    coi: any,
    goToViewPage: any,
    vendCategorys: any,
    editVendorCategoryt: any,
}

class ProcessedCoiView extends React.Component<Props> {
    state = {
        selectedVendorCat:null,
    };

    componentDidMount(): void {
        const {vendCategorys,coi} = this.props;
        const selectedVendorCat = vendCategorys.find(category=>{
            return category.label === coi.category && category
        });
        this.setState({selectedVendorCat});
    }

    onChange = (field,value) => {
        const {coi} = this.props;

        this.setState({[field]:value});
        this.props.editVendorCategoryt(coi.id,value.value)
    };

        render() {
        const {coi, goToViewPage, vendCategorys} = this.props;
        const {selectedVendorCat} = this.state;
        return (
            <tr onClick={() => goToViewPage(coi.id)}>
                <td data-label="Company">{coi.insured}</td>
                <td data-label="Data Added">{moment(coi.created_at).format('DD.MM.YYYY')}</td>
                <td data-label="Expires">{moment(coi.general_liability_exp_date).format('MMMM YYYY')}</td>
                <td data-label="Category" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    {selectedVendorCat && <ReactSelect
                      options={vendCategorys}
                      setFieldValue={(field,value) => this.onChange(field,value)}
                      field={'selectedVendorCat'}
                      value={selectedVendorCat}
                    />}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        vendorCategorys: state.settings.vendorCategorys
    }
};

export default connect(mapStateToProps,{editVendorCategoryt})(ProcessedCoiView);