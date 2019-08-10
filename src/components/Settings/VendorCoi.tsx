import * as React from 'react';
import {connect} from 'react-redux';
import {getPropertyManagersAction, getVendorCategoryAction, removeVendorCategoryAction} from "../../actions";
import Select from "react-select";

export interface Props {
    getPropertyManagersAction: any,
    getVendorCategoryAction: any,
    vendorCategorys: any,
    properties: any,
    removeVendorCategoryAction(id:number)
}
export interface State {
    selectedProperty: any,
    addVendor: any,
    nameInpVal: any,
    fieldErr: any,
}

class VendorCoi extends React.Component<Props, State>{
    state = {
        selectedProperty: null,
        addVendor: false,
        fieldErr: false,
        nameInpVal: '',
    };

    componentDidMount(){
        const getProperties = this.props.getPropertyManagersAction();
        getProperties.then((res)=> {
            const selectedProperty = {
                label:res.data.results[0].property_name,
                value:res.data.results[0].property
            };
            this.onPropertyChange(selectedProperty)
        })
    }

    OpenVendorCatInp = () => {
        this.setState({addVendor:!this.state.addVendor});
    };

    onPropertyChange = (selectedProperty) => {
        this.setState({ selectedProperty });
        this.props.getVendorCategoryAction(selectedProperty.value);
    };

    onChange = (e) => {
      this.setState({
          nameInpVal: e.target.value,
      })
    };

    onCategoryDelete = (id) => {
        this.props.removeVendorCategoryAction(id).then(() => {
            this.onPropertyChange(this.state.selectedProperty);
        });
    };


    addNewVendorCat = () => {
        const {nameInpVal} = this.state;
        if(nameInpVal){
            this.setState({fieldErr:false});
            // @ts-ignore
            this.props.history.push("/settings/category-view/" + nameInpVal);
        } else {
            this.setState({fieldErr:true});
        }
    };

    render(){
        const {vendorCategorys,properties} = this.props;
        const pros = properties && properties.map((property) => {
            return {value: property.property, label: property.property_name}
        }) ||  [];
        return (
            <div className="page-content vendor-coi" >
                <h1 className="page-title">settings</h1>
                <span className="page-icon">
                <i className="icon-settings"/>
            </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">vendor COI</h2>
                    <div className="flex justify-end vendor-select">
                        {/* Please be informed that select box and label need to be added here after which I need to work on the styles */}
                        <div className="select-box no-outline column">
                            <span className="label italic mb-2">select a property</span>
                            <Select  value={this.state.selectedProperty}
                                         onChange={this.onPropertyChange}
                                         options={pros} />
                        </div>
                    </div>
                    <p className="mt-8 mb-8 color-black">Vendor Categories</p>
                    <ul className="categories">
                        {vendorCategorys && vendorCategorys.map((vendorCategory,index)=>{
                            return(
                                <li key={index}>
                                    <p>{vendorCategory.name}</p>
                                    <span className="delete" onClick={() => { this.onCategoryDelete(vendorCategory.id) }}><i className="icon-delete">{''}</i></span>
                                </li>
                            )
                        })}

                    </ul>

                    {this.state.addVendor && <div className={"text-field primary half-width "+(this.state.fieldErr ? 'invalid' : '')}>
                        <input type="text" value={this.state.nameInpVal} onChange={this.onChange} />
                        {this.state.fieldErr && <p className="error-text">* This field is required.</p>}
                    </div>}
                    {this.state.addVendor && <div className="pt-5">
                        <a onClick={this.OpenVendorCatInp} className="btn filled tertiary w-xxxs h-sm  mr-4">cancel</a>
                        <button onClick={this.addNewVendorCat} className="btn filled primary w-xxxs h-sm">add</button>
                    </div> ||
                    <a className="color-primary mt-4 inline-block" onClick={this.OpenVendorCatInp}>+ Add additional vendor category</a>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        properties: state.settings.properties,
        vendorCategorys: state.settings.vendorCategorys,
    }
};
export default connect(mapStateToProps,{getPropertyManagersAction,getVendorCategoryAction, removeVendorCategoryAction})(VendorCoi);