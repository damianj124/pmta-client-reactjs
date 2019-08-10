import * as React from "react";
import {Link} from 'react-router-dom';

class Footer extends React.Component {
    render(){
        return(
            <footer>
                <div className="container">
                    <div className="flex justify-between items">
                        <div className="item-left">
                        <ul className="nav">
                            <li>
                                <a href="#">how it works</a>
                            </li>
                            <li>
                                <a href="#">features</a>
                            </li>
                            <li>
                                <a href="#">contact</a>
                            </li>
                            <li>
                                <Link to="/signin">sign in</Link>
                            </li>
                        </ul>
                        </div>
                        <div className="item-right">
                            <div className="connected">
                                <span className="color-purple-light">stay connected</span>
                                <form action="" className="flex align-center mt-10 email-form">
                                    <div className="text-field primary grey no-margin">
                                        <input type="text" placeholder="email address"/>
                                    </div>
                                    <button type="submit" className="btn filled primary w-xxxs h-lg">send</button>
                                </form>
                            </div>
                            <div className="contact">
                                <p className="questions"><span className="color-purple-light">questions?</span> <a href="mailto:info@strada.ai">info@strada.ai</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <div className="items">
                            <div className="logo">
                                <a href="#" className="logo-text lg">strada</a>
                            </div>
                            <p className="copyright">© strada technologies Inc.</p>
                            <ul className="policy">
                                <li>
                                    <a href="#">Terms of Service</a>
                                </li>
                                <li>
                                    <a href="#">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;