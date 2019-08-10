import * as React from 'react';
import {RouteComponentProps} from "react-router-dom";
import Spinner from "../Spinner";
import {connect} from "react-redux";
import {sendCoisFileAction} from "../../actions";

export interface Props {
    coisData: any,
    unhandledData: any,
    sendCoisFileAction: any,
    pending: boolean
}

class UploadCois extends React.Component <RouteComponentProps & Props, {}> {
    state = {
        dropAreaClassName: '',
        listeners: false
    };
    componentDidMount(): void {
        if(!this.props.coisData.length){
            this.props.history.push('/cois');
        }
    }

    transformImages() {

        // if (!this.state.listeners) {
        //     this.setState({listeners: true});
        //     setTimeout(() => {
        //         const dropArea: any = document.querySelector('#drop-area');
        //         dropArea.addEventListener('dragenter', e => {
        //             e.preventDefault();
        //             e.stopPropagation();
        //             this.setState({dropAreaClassName: 'bordered'});
        //         }, false);
        //         dropArea.addEventListener('dragleave', e => {
        //             e.preventDefault();
        //             e.stopPropagation();
        //             this.setState({dropAreaClassName: ''});
        //         }, false);
        //         dropArea.addEventListener('dragover', e => {
        //             this.setState({dropAreaClassName: 'bordered'});
        //             e.preventDefault();
        //             e.stopPropagation();
        //
        //         }, false);
        //         dropArea.addEventListener('drop', e => {
        //             e.preventDefault();
        //             e.stopPropagation();
        //             const dt = e.dataTransfer;
        //             const files = dt.files;
        //             this.changeHandler({target: {files, type: 'file'}});
        //
        //         }, false);
        //     }, 0);
        // }
        return this.props.coisData && this.props.coisData.map(data => {
            return data[0].data[7].image;
        });
    };

    toArray(fileList) {
        return Array.prototype.slice.call(fileList);
    }

    changeHandler = (e: any) => {
        if (e.target.type === 'file') {
            const files = this.toArray(this.props.unhandledData.files).concat(this.toArray(e.target.files));
            let names = this.props.unhandledData.names;
            for (const f of files) {
                names = names + f.name + '\n';
            }
            const data = new FormData();

            for (const file of e.target.files) {
                data.append("files", file);
            }
            const unhandledData = {files, names};
            this.props.sendCoisFileAction(data, unhandledData);
        }
    };
    changeFirstHandler = (e: any) => {
        if (e.target.type === 'file') {
            const files = e.target.files;
            let names = '';

            for (const f of files) {
                names = names + f.name + '\n';
            }
            const data = new FormData();
            for (const file of files) {
                data.append("files", file);
            }
            const unhandledData = {files, names};
            this.props.sendCoisFileAction(data, unhandledData, true);
        }
    };

    render() {
        const images = this.transformImages();
        return (
            <div className="page-content uploaded-invoices">
                {this.props.pending && <Spinner/>}
                <h1 className="page-title">cois</h1>
                <span className="page-icon">
                  <i className="icon-cois"/>
                </span>
                <div className="main-content mt-6">
                    <h2 className="page-subtitle">cois</h2>
                    <h6 className="page-desc">manage your cois here</h6>
                    {this.props.coisData.length === 0 &&
                    <form action="" className="upload-form">
                      <div id='drop-area' className="file-upload-primary">
                        <div className={"image-upload-wrap " + this.state.dropAreaClassName}>
                          <label htmlFor="file-upload" className="file-upload-label">
                            <input
                              id="file-upload"
                              name='file'
                              multiple
                              onChange={this.changeFirstHandler}
                              className="file-upload-input"
                              type="file"
                            />
                          </label>
                          <div className="drag-text">
                            <i className="icon-pdf">
                              <span className="path1"/>
                              <span className="path2"/>
                              <span className="path3"/>
                              <span className="path4"/>
                              <span className="path5"/>
                            </i>
                              {this.props.coisData.length === 0 && <p className="text-capitalize mt-9">
                                drop PDF(
                                <span className="text-lowercase">s</span>) COIs here
                              </p>}
                              {this.props.coisData.length === 0 && <p className="underline">choose file</p>}
                          </div>
                        </div>
                      </div>
                    </form> ||
                    <form action="">
                      <div id='drop-area' className={"box drop-area " + this.state.dropAreaClassName}>
                        <div className="items">
                            {
                                images.map((image, index) => {
                                    return image.map((img, i) => {
                                        return(<div key={img} className="item">
                                            <p className="numbering">{index + 1}-{i + 1}</p>
                                            <img src={img} alt="Invoice image" className="file"/>
                                        </div>)
                                    })
                                })
                            }
                        </div>
                        {/*<div className="flex align-center">*/}
                          {/*<i className="icon-pdf">*/}
                            {/*<span className="path1"/>*/}
                            {/*<span className="path2"/>*/}
                            {/*<span className="path3"/>*/}
                            {/*<span className="path4"/>*/}
                            {/*<span className="path5"/>*/}
                          {/*</i>*/}
                          {/*<span className="file-upload-tertiary">*/}
                                    {/*<label className="file-upload-label">*/}
                                        {/*<input type="file"*/}
                                               {/*name='file'*/}
                                               {/*multiple*/}
                                               {/*onChange={this.changeHandler}/>*/}
                                        {/*+ add more PDF invoices*/}
                                    {/*</label>*/}
                                {/*</span>*/}
                        {/*</div>*/}
                      </div>
                      <div className="text-right mt-6">
                        <button
                          type='button'
                          onClick={()=> this.props.history.push('/cois/cois-view/')}
                          className="btn filled primary w-lg"
                        >
                          process coi
                        </button>
                      </div>
                    </form>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        coisData: state.settings.coisData,
        pending: state.settings.pending,
        unhandledData: state.settings.unhandledData
    };
};

export default connect(mapStateToProps, {sendCoisFileAction})(UploadCois);
