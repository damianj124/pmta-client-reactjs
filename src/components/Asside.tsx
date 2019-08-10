import * as React from 'react';
import {NavLink} from "react-router-dom";


class Aside extends React.Component<{asideMinimize:any, handleClick:any}> {
    state = {
        show: false,
    };

    render() {
        const {handleClick,asideMinimize} = this.props;
        return (
            <div>
                <span className="menu-icon" onClick={()=> this.setState({show: !this.state.show})}><i className="icon-menu"/></span>
                <aside className={' ' + (asideMinimize && 'view-min '|| '') + (this.state.show && 'show '|| '')}>
                    <div className="manage-view">
                        <button className="btn-simple">
                            {/* When view-min class is added to "Aside" component please change "icon-remove-circle " class with "icon-add-circle" in the button */}
                            <i onClick={handleClick} className={"icon " + ((asideMinimize && "icon-add-circle" )|| "icon-remove-circle")} >{''}</i>
                        </button>
                        <span className="item-name">MINIMIZE NAV</span>
                    </div>
                    <ul className="nav">
                        <li onClick={()=> this.setState({show:false})}>
                            <NavLink to={`/dashboard`}>
                                <span className="item-icon"><i className="icon-dashboard"/></span>
                                <span className="item-name" >Dashboard</span>
                            </NavLink>
                        </li>
                        <li onClick={()=> this.setState({show:false})}>
                            <NavLink to={`/vendor`}>
                                <span className="item-icon"><i className="icon-vendor"/></span>
                                <span className="item-name" >vendor contracts</span>
                            </NavLink>
                        </li>
                        <li onClick={()=> this.setState({show:false})}>
                            <NavLink to={`/account`}>
                                <span className="item-icon"><i className="icon-account"/></span>
                                <span className="item-name" >accounts receivable</span>
                            </NavLink>
                        </li>
                        <li onClick={()=> this.setState({show:false})}>
                            <NavLink to={`/invoicing`}>
                                <span className="item-icon"><i className="icon-invoice"/></span>
                                <span className="item-name" >invoicing</span>
                            </NavLink>
                        </li>
                        <li onClick={()=> this.setState({show:false})}>
                            <NavLink to={`/cois`}>
                                <span className="item-icon"><i className="icon-cois"/></span>
                                <span className="item-name" >cois</span>
                            </NavLink>
                        </li>
                        <li onClick={()=> this.setState({show:false})}>
                            <NavLink to={`/approval-docs`}>
                                <span className="item-icon"><i className="icon-approval"/></span>
                                <span className="item-name" >approval docs</span>
                            </NavLink>
                        </li>
                        <li onClick={()=> this.setState({show:false})}>
                            <NavLink to={`/settings`}>
                                <span className="item-icon custom"><i className="icon-settings"/></span>
                                <span className="item-name" >settings</span>
                            </NavLink>
                        </li>
                        <li onClick={()=> this.setState({show:false})}>
                            <NavLink to={`/budget-calendar`}>
                                <span className="item-icon"><i className="icon-calendar"/></span>
                                <span className="item-name" >budget calendar</span>
                            </NavLink>
                        </li>
                        <li onClick={()=> this.setState({show:false})}>
                            <NavLink to={`/reforecast-items`}>
                                <span className="item-icon"><i className="icon-reforcast"/></span>
                                <span className="item-name" >reforecast items</span>
                            </NavLink>
                        </li>
                    </ul>
                </aside>
            </div>
        );
    }
}

export default Aside;
