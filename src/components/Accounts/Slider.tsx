import * as React from 'react';
import Slider from "react-slick";

import { PAST_DUE_DATE } from "../../utils/constants";
import "./slider.css";


export interface Props {
    campaign: any
    changeSliderIndex: any,
    getName: any,
    defaultTemplate: any,
    change: any,
    set: any,
    values: any
}

class SliderCarusel extends React.Component<Props, {}> {

    componentDidMount() {
        for(const item of this.props.campaign){
            this.buildMessage(item);
        }
    }

    buildMessage = item => {
        let items = '\n';
        const name = this.props.getName(item.tenant_name);
        const balance = item.total;
        const days = PAST_DUE_DATE[item.past_due_date];
        for (const o of item.owed) {
            items = items + ' ' + o.substr(0, o.indexOf(':')) + ' ' +  o.substr( o.indexOf(':') + 1) + '\n'
        }

        const message = this.props.defaultTemplate.default_template.content
            .replace('{items}', items)
            .replace('{name}', (name ? name : '{name}'))
            .replace('{balance}', balance)
            .replace('{days}', days);

        this.props.set({ target: { name: item.tenant_name, value: message } });

        return message;
    };

    render() {
        const settings = {
            infinite: true,
            speed: 500,
            autoplay: false,
            slidesToShow: 1,
            afterChange: index => this.props.changeSliderIndex(index + 1)
        };
        return (
            <div className="slick-slider slick-initialized slider-primary">
                <Slider {...settings}>
                    {
                        this.props.campaign && this.props.campaign.map(item => {
                            return (
                                <div key={item.past_due_date + item.total} className="slider-content">
                                    <p className="email-subject email-subject-label">{ this.props.defaultTemplate.default_template.name }</p>

                                    <div className="manage-email">
                                        <textarea name={item.tenant_name} onChange={this.props.change} value={ this.props.values[item.tenant_name] } />
                                    </div>
                                </div>
                            );
                        })
                    }
                </Slider>
            </div>
        );
    }
}
export default SliderCarusel;
