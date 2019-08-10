import * as React from "react";
import Header from './Header';
import Footer from "./Footer";
import accounts from "./../../assets/img/accounts-demo.png";
import contracts from "./../../assets/img/contracts-demo.png";
import cois from "./../../assets/img/cois-demo.png";
import invoice from "./../../assets/img/invoice-demo.png";

class LearnMore extends React.Component {

    componentDidMount() {
        const oLis = document.getElementsByClassName('tab-click');
        const oDivs = document.getElementsByClassName('tab-item' +
            '' +
            '');

        for (let i = 0; i < oLis.length; i++) {
            const oLi = oLis[i];
            // @ts-ignore
            oLi.n = i;
            // @ts-ignore
            oLi.onclick = function () {
                for (let j = 0; j < oLis.length; j++) {
                    oLis[j].className = 'tab-click';
                    oDivs[j].className = 'tab-item';
                }

                this.className = " tab-click active";
                // @ts-ignore
                oDivs[this.n].className = "tab-item active"
            };
        }
    }

    render(){
        return(
            <div>
                <Header/>
                {/* Main section start */}
                <main className="learn-more">
                    <div className="text-center pr-3 pl-3">
                        <h2 className="title">Tools that fit your workflow.</h2>
                        <p className="desc">to compliment the accounting software you use today</p>
                    </div>
                    {/* Demo section start */}
                    <section className="demo">
                            <ul className="tabs demo-tabs">
                                <li>
                                    <a className="active tab-click">Accounts Receivable</a>
                                </li>
                                <li>
                                    <a className="tab-click">COIS</a>
                                </li>
                                <li>
                                    <a className="tab-click">Contracts</a>
                                </li>
                            </ul>
                            <div className="tab-items">
                                <div className="tab-item accounts active " id="accounts-tab">
                                    <div className="img">
                                        <img src={accounts} alt="Accounts image"/>
                                    </div>
                                    <div className="tab-content accounts">
                                        <h3 className="tab-title">Keep it Simple</h3>
                                        <p className="tab-desc">
                                            Manage and track your accounts payable activities within a single dashboard.
                                            Take the hastle out of tracking down unpaid charges with invoices generated
                                            based on outstanding items. Receive status reports and seamlessly follow
                                            up with the tenants you need to.
                                        </p>
                                    </div>
                                </div>
                                <div className="tab-item cois" id="cois-tab">
                                    <div className="img">
                                        <img src={cois} alt="Cois image"/>
                                    </div>
                                    <div className="tab-content">
                                        <h3 className="tab-title mt-3">Ensure Vendor Compliance</h3>
                                        <p className="tab-desc">
                                            Ensure that recieved liability insurance certificates are up to standards
                                            based on your vendor category requirements. Upload 10’s to 100’s of COIs at
                                            once to be analyzed and sorted. If a certificate you’ve received is deficient,
                                            a report will be generated and ready to send for request to update.
                                        </p>
                                    </div>
                                </div>
                                <div className="tab-item contract" id="contracts-tab">
                                    <div className="img">
                                        <img src={contracts} alt="Contracts image"/>
                                    </div>
                                    <div className="tab-content">
                                        <h3 className="tab-title">Dot Your ‘i’s</h3>
                                        <p className="tab-desc">
                                            Eliminate repetitive entry of building information and visits to multiple
                                            3rd party website databases. All supporting documentation is added as
                                            an attachment and your contract is generated while following a few simple
                                            prompts.
                                        </p>
                                    </div>
                                </div>
                            </div>
                    </section>
                    {/* Demo section end */}
                    {/* Focus section start */}
                    <section className="focus">
                        <div className="content">
                            <h2 className="focus-title">Focus on what matters</h2>
                            <p className="focus-desc">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                architecto beatae vitae dicta sunt explicabo.
                            </p>
                            <button className="btn filled w-xxs">see it</button>
                        </div>
                        <div className="focus-info">
                            <p className="mb-10">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                architecto beatae vitae dicta sunt explicabo.
                            </p>
                            <p>
                                m est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                                non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                                voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
                                laboriosam, nisi ut aliquid ex ea commodi consequatur.
                            </p>
                        </div>
                        <ul className="tabs">
                            <li>
                                <a href="#invoice-tab" className="active">Invoicing</a>
                            </li>
                            <li>
                                <a href="#budget-tab">Budget Reforecasting</a>
                            </li>
                        </ul>
                        <div className="tab-items">
                            <div className="tab-item invoice active" id="invoice-tab">
                                <div className="img">
                                    <img src={invoice} alt="Accounts image"/>
                                </div>
                                <div className="tab-content">
                                    <h3 className="tab-title">Learns as you go</h3>
                                    <p className="tab-desc">
                                        The more you process, the smarter it gets.  Accounts and totals are populated
                                        with taxes and additional fees distributed appropriately. A digital stamp can be
                                        added to your invoice, making uploads to your accounting software simple.
                                    </p>
                                </div>
                            </div>
                            <div className="tab-item invoice" id="budget-tab">
                                <div className="img">
                                    <img src={invoice} alt="Accounts image"/>
                                </div>
                                <div className="tab-content">
                                    <h3 className="tab-title">Keep it Simple</h3>
                                    <p className="tab-desc">
                                        Manage and track your accounts payable activities within a single dashboard.
                                        Take the hastle out of tracking down unpaid charges with invoices generated
                                        based on outstanding items. Receive status reports and seamlessly follow
                                        up with the tenants you need to.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Focus section end */}
                    {/* Search section start */}
                    <section className="search">
                        <div className="container">
                            <form action="" className="flex align-center justify-center search-form">
                                <span>Schedule a demo.</span>
                                <div className="text-field primary no-margin">
                                    <input type="text" placeholder="enter email"/>
                                </div>
                                <button type="submit" className="btn filled color-white">send</button>
                            </form>
                        </div>
                    </section>
                    {/* Search section end */}
                </main>
                {/* Main section end */}
                <Footer/>
            </div>
        )
    }
}

export default LearnMore;