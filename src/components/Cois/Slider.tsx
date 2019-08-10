import * as React from 'react';
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify';


export interface Props {
    data: any
}

class SliderCarusel extends React.Component<Props & {}> {
    state = {
        index: 1
    }

    changeSliderIndex = index => {
        this.setState({index});
    }

    render() {
        const settings = {
            //   dots: true,
            infinite: true,
            speed: 500,
            autoplay: false,
            slidesToShow: 1,
            afterChange: index => this.changeSliderIndex(index + 1)
            //   slidesToScroll: 1
        };
        return (
            <React.Fragment>
                <p className="page-number">invoicing page {this.state.index} of {this.props.data.length}</p>
                <div className="slick-slider slick-initialized slider-secondary">
                    <Slider {...settings}>
                        {
                            this.props.data.map(d => {
                                return (
                                    <ReactImageMagnify enlargedImagePosition={'over'} key={d} className="file" {...{
                                        smallImage: {
                                            alt: 'Invoice image',
                                            isFluidWidth: true,
                                            src: d
                                        },
                                        largeImage: {
                                            src: d,
                                            width: 1200,
                                            height: 1800
                                        }
                                    }} />
                                );
                                // return <img key={d} src={d} alt="Invoice image" className="file" />;
                            })
                        }
                    </Slider>
                </div>
            </React.Fragment>

        );
    }
}
export default SliderCarusel;


