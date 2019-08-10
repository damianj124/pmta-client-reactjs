import * as React from 'react';
import Header from './Header';
import Footer from "./Footer";
import Select from "react-select";
import desc from "./../../assets/img/homepage-1.png";
import scan from "./../../assets/img/scan-white.png";
import lines from "./../../assets/img/lines.png";


class Homepage extends React.Component {
    render(){
        return(
            <div>
                <Header/>
                {/* Main section start */}
                <main className="homepage">
                    {/* Intro section start */}
                    <section className="intro flex">
                        <div className="img">
                            <img src={desc} alt="Desc image"/>
                        </div>
                        <div className="intro-content flex justify-center column">
                            <p className="intro-title">Al FOR COMMERCIAL PROPERTY MANAGEMENT</p>
                            <p className="intro-slogan">A property manager’s best friend.</p>
                            <h1 className="intro-desc">Software that automates and tracks your day to day operations. Manage multiple assets more effectively than ever.</h1>
                        </div>
                    </section>
                    {/* Intro section end */}

                    {/* Invoice section start */}
                    <section className="invoice-intro flex column align-center">
                        <div className="invoice-content text-center">
                            <p className="invoice-slogan">Hyper <span>Efficient.</span> Hyper <span>Accurate.</span></p>
                            <p className="invoice-desc">powerful user friendly tools ensure nothing slips by you</p>
                        </div>
                        <div className="invoice-demo">
                            <div className="container-sm">
                                <p className="section-title black">
                                    Self learning technology to process invoices <br />
                                    quicker and more accurately than ever
                                </p>
                                <p className="section-title short">
                                    Invoicing
                                </p>
                                <p className="section-desc">
                                    Self learning technology for <br />
                                    invoice processing
                                </p>
                                <div className="demo flex justify-start">
                                    <div className="items-left">
                                        <div className="flex column items">
                                            <div className="item flex align-start gl-account">
                                                <div className="select-box disabled light-grey">
                                                    <label htmlFor="" className="label color-black">G/L Account:</label>
                                                    <div className="content">
                                                        <Select
                                                            value={{label:'Electric - common', value: 'building'}}
                                                            options={[{label:'Electric - common', value: 'building'}]}
                                                        />
                                                    </div>
                                                </div>
                                                <p className="price"><span data-aos="zoom-in" data-aos-duration="1600" data-aos-delay="1650">$23,287</span></p>
                                            </div>
                                            <div className="item flex align-start gl-account">
                                                <div className="select-box disabled light-grey">
                                                    <label htmlFor="" className="label color-black">G/L Account:</label>
                                                    <div className="content">
                                                        <Select
                                                            value={{label:'Gas & Fuel - common', value: 'building'}}
                                                            options={[{label:'Gas', value: 'building'}]}
                                                        />
                                                    </div>
                                                </div>
                                                <p className="price"><span data-aos="zoom-in" data-aos-duration="1600" data-aos-delay="1650">$1,256</span></p>
                                            </div>
                                            <div className="item flex justify-end pt-2 approval">
                                                <div className="select-box disabled dark-grey">
                                                    <label htmlFor="" className="label color-black mr-4">send for approval?</label>
                                                    <div className="content">
                                                        <Select
                                                            value={{label:'Jamie', value: 'building'}}
                                                            options={[{label:'Jamie', value: 'building'}]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="items-right flex">
                                        <div className="lines-img">
                                            <img src={lines} alt="Lines image" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="400"/>
                                        </div>
                                        <div className="charges">
                                            <p>Current electric charges <span>$23,287</span></p>
                                            <p className="bg-color">Gas delivery charges <span>$1,256</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Invoice section end */}

                    {/* Accounts receivable section start */}
                    <section className="accounts-intro">
                        <div className="container-sm">
                            <p className="section-title white">Accounts Receivable</p>
                            <div className="account-content flex align-center justify-between">
                                <p className="section-desc">One click tenant outreach includes information <br />
                                    on unpaid charges with auto generated invoices
                                </p>
                                <button className="btn filled secondary w-lg font-md" data-aos="pressed-button" data-aos-duration="600" data-aos-delay="200">Send to all tenants 30 days past due</button>
                            </div>
                            <div className="email-intro">
                                <div data-aos="fade-in" data-aos-duration="1500" data-aos-delay="800">
                                    <p className="mb-9">Hi Jerry,</p>
                                    <p className="mb-9">There are a few items 30 days past due. Here’s a bit more info on the
                                        charges with an attached invoice, thanks.
                                    </p>
                                    <ul className="item-list">
                                        <li>
                                            <span className="label">Base Rent November 2018</span>
                                        </li>
                                        <li>
                                            <span className="label">CAM Charges 11.18.18</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Accounts receivable section end */}

                    {/* Space section start */}
                    <section className="space">
                        {""}
                    </section>
                    {/* Space section end */}

                    {/* COIS section start */}
                    <section className="cois-intro">
                        <div className="container-sm">
                            <p className="section-title black">COIs</p>
                            <div className="cois-content flex align-center justify-between">
                                <p className="section-desc pr-3 pl-3">
                                    Auto capture COI information and
                                    instantly detect any deficient
                                    certificates. Receive notification on
                                    those about to expire.
                                </p>
                                <div className="img">
                                    <div className="cover" data-aos="scan-animation" data-aos-delay="300" data-aos-duration="2600" data-aos-mirror="true">
                                        {''}
                                    </div>
                                    <img src={scan} alt="Scan image"/>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* COIS section end */}

                    {/* Contracts section start */}
                    <section className="contracts-intro">
                        <div className="container-sm">
                            <p className="section-title black">Contracts</p>
                            <div className="contracts-content flex align-center justify-between">
                                <div className="license-content">
                                    <div className="license-info flex justify-end">
                                        <div className="check">
                                            <i className="icon-check" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="800">{''}</i>
                                        </div>
                                        <div className="details mt-3" data-aos="zoom-in" data-aos-delay="800" data-aos-duration="900">
                                            <p className="message">LICENSE MATCH!</p>
                                            <p className="color-primary italic valid-date">valid till 4/21/2019</p>
                                        </div>
                                    </div>
                                    <p className="font-xxxl license-number"><span className="license-label">License number: </span><span className="color-black">873217291</span></p>
                                </div>
                                <p className="section-desc pr-3 pl-3">
                                    Retrieve license and other
                                    relevant information, ensuring all
                                    paperwork is up to date and to
                                    company requirements
                                </p>
                            </div>
                            <div className="schedule">
                                <button className="btn filled color-green-light w-xl">schedule demo</button>
                                <p className="desc">(1 month free trial)</p>
                            </div>
                        </div>
                    </section>
                    {/* Contracts section end */}

                </main>
                {/* Main section end */}
                <Footer/>
            </div>
        )
    }
}

export default Homepage;