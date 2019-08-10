import * as React from 'react';
import {connect} from 'react-redux';
import {match, RouteComponentProps} from 'react-router';
import {sendSignPdfData, getPdfSign} from '../../actions';
import axios from 'axios';
import Spinner from "../Spinner";
import * as moment from "moment";
import * as pdfjsLib from "pdfjs-dist";
import {PDFViewer} from "pdfjs-dist/lib/web/pdf_viewer";
import './SignPdf.css';

export interface Props {
    match: match<{ sign: string, id: string }>,
    sendSignPdfData: any,
    getPdfSign: any
}


class SignPdf extends React.Component<Props & RouteComponentProps, {}> {

    state = {
        name: '',
        date: moment().format('MM.DD.YYYY'),
        error: '',
        show: false,
        pdf: '',
        pdfLoad: false,
    };

    componentDidMount() {
        // @ts-ignore
       const as =  this.props.getPdfSign(this.props.match.params.sign, this.props.match.params.id).then((res) => {
            this.setState({error: null, show: true, pdf: res.data.result});
            pdfjsLib.disableWorker = true;
            pdfjsLib.disableRange = true;
            const container = document.getElementById('viewerContainer');
            const viewer = document.getElementById('viewer');
            const pdfViewer = new PDFViewer({container, viewer});
            pdfjsLib.getDocument(res.data.result).then((pdf) => {
                pdfViewer.setDocument(pdf);
            }).then(()=>{
                const key = setInterval(()=> {
                    const elem = document.querySelector('*[data-page-number="2"]');
                    if(elem){
                        clearInterval(key);
                        elem.classList.add('sign-section');
                        const div = document.createElement('div');
                        div.classList.add('text-field');
                        div.classList.add('grey');
                        const inp = document.createElement('input');
                            // inp.setAttribute('name','name');
                            inp.setAttribute('value',this.state.name);
                            inp.setAttribute('id','name');
                            inp.setAttribute('name','name');
                            inp.setAttribute('type','text');
                            inp.addEventListener('change',this.changeHandler);
                            const date = document.createElement('p');
                            date.textContent = this.state.date;
                            date.classList.add('date');
                            div.appendChild(inp);
                            elem.appendChild(div);
                            elem.appendChild(date);
                    }
                },1000)
            })
        }).catch(error => {
            this.setState({error: error.response.data.error, show: true})
        })
    };


    changeHandler = (event: any) => {
        this.setState({[event.target.name]: event.target.value});
    };

    downloadURI(uri, name) {
        const url = window.URL.createObjectURL(new Blob([uri]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        link.click();
    }

    onSubmit = () => {
        if (this.state.name && this.state.date) {
            const data = {
                sign_date: this.state.date,
                token: this.props.match.params.sign,
                pdf_id: this.props.match.params.id,
                sign_name: this.state.name
            };
            this.props.sendSignPdfData(data).then(res => {
                axios({
                    url: res.data.result,
                    method: 'GET',
                    responseType: 'blob', // important
                }).then(result => {
                    this.downloadURI(result.data, 'file.pdf');
                })
            });
        }
    };

    render() {
        if (!this.state.show) {
            return <Spinner/>
        }

        return (
            <div style={{margin: '100px'}}>
                {!this.state.error && <div id="viewerContainer">
                  <div id="viewer" className="pdfViewer">
                      s
                  </div>
                  <button type='button' onClick={this.onSubmit} className="btn filled primary h-sm w-sm mt-5">Submit</button>
                </div>}
                {this.state.error && <p style={{color: 'red'}}>{this.state.error}</p>}
            </div>
        );
    }
}


export default connect(null, {sendSignPdfData, getPdfSign})(SignPdf);
