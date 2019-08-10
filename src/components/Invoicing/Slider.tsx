import * as React from 'react';
import Slider from '@material-ui/lab/Slider';
import Cropper from 'react-easy-crop';
import { Slide } from 'react-slideshow-image';

export interface Props {
    data: any,
}

class SliderCarusel extends React.Component<Props & {}> {
    state = {
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 1,
        index: 1,
    };
    componentDidMount(): void {
        const button = document.querySelector('.controls button');
        if(button){
            // @ts-ignore
            button.setAttribute("tabindex", -1);
        }
    };


    onCropChange = crop => {
        this.setState({ crop })
    };

    onZoomChange = zoom => {
        this.setState({ zoom })
    };

    render() {

        const SlideProperties = {
            duration: 10000000000,
            // transitionDuration: 500,
            infinite: false,
            indicators: true,
            arrows: true
        };

        return (
            <React.Fragment>
                <p className="page-number">invoicing page {this.state.index} of {this.props.data.length}</p>
                <div className="controls">
                    <Slider
                        tabIndex={100000}
                        value={this.state.zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e, zoom) => this.onZoomChange(zoom)}
                    />
                </div>
                <br/>
                <div className="slick-slider slick-initialized slider-secondary"
                     style={{display: "inline-block",
                        position: "relative", overflow: "hidden",
                        width: '620px', height: '650px'}}
                >
                    <Slide {...SlideProperties} >
                        {
                            this.props.data.map(d => {
                                return (
                                    <div className="each-slide" style={{display: "inline-block", position: "relative", overflow: "hidden", width: '620px', height:'650px'}} key={d} >
                                        <Cropper
                                            image={d}
                                            crop={this.state.crop}
                                            zoom={this.state.zoom}
                                            aspect={this.state.aspect}
                                            onCropChange={this.onCropChange}
                                            onZoomChange={this.onZoomChange}
                                        />
                                    </div>
                                );
                            })
                        }
                    </Slide>
                </div>
            </React.Fragment>

        );
    }
}
export default SliderCarusel;


