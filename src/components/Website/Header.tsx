import  * as React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    state ={
        show: false,
    };
    render() {
        return (
            <header>
                <div className="container">
                    <div className="items flex align-center justify-between">
                        <div className="logo">
                            <Link to="/homepage" className="logo-text sm">strada</Link>
                        </div>
                        <ul className={"nav-items " + (this.state.show && 'show' || '')}>
                            <li><Link to="/learn-more">learn more</Link></li>
                            <li><a href="#">request demo</a></li>
                            <li><a href="#">contact</a></li>
                            <li className="outline ml-3"><Link to="/signin">SIGN IN</Link></li>
                        </ul>
                        <button className="btn-simple hamburger-icon" onClick={() => this.setState({show:!this.state.show})}><i className="icon-hamburger">{''}</i></button>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;