import React        from 'react';
import ReactDOM     from 'react-dom';
import Header       from '../partials/Header';
import {DrawType}   from '../components/DrawType';
import ColourPicker from '../components/ColourPicker';
import Canvas       from '../components/Canvas';
import Popup        from '../components/Popup';

class CanvasApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canvas:               null,
            drawType:             null,
            showSelectImagePopup: false,
            showDownloadPopup:    false,
            showNewCanvasPopup:   false,
            brushColour:          "#000000",
            refFromChild:         null
        };

        this.getRefFromChild = this.getRefFromChild.bind(this);
    }

    getRefFromChild(refFromChild) {
        this.setState({
            refFromChild: refFromChild
        })
    }

    toggleSelectImagePopup() {
        this.setState({
            showSelectImagePopup: !this.state.showSelectImagePopup
        });
    }

    toggleDownloadPopup() {
        this.setState({
            showDownloadPopup: !this.state.showDownloadPopup
        });
    }

    toggleNewCanvasPopup() {
        this.setState({
            imageName: "NewImage.jpg",
            showNewCanvasPopup: !this.state.showNewCanvasPopup
        });
    }

    handleChange(event) {
        this.setState({
            imageName: event.target.value + ".jpg"
        })
    }

    setDrawType(drawType) {
        this.setState({
            drawType
        })
    }

    pickColour(colour) {
        this.setState({
            brushColour: colour
        })
    }

    newCanvas() {
        const canvas = ReactDOM.findDOMNode(this.state.refFromChild);

        canvas.style.width  = "100%";
        canvas.style.height = "100%";
        canvas.style.border = "1px solid purple";

        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const context = canvas.getContext('2d');

        if(this.state.canvas) {
            this.state.context.clearRect(0, 0, canvas.width, canvas.height);
        }

        this.setState({
            canvas,
            context,
            downloadUrl: canvas.toDataURL(),
            newCanvas: true,
            showNewCanvasPopup: !this.state.showNewCanvasPopup
        });
    }

    getImage(event) {
        let file = event.target.files[0];
        this.setState({
            file: file
        })
    }

    setImage() {
        let ctx = this.state.context;
        let img = new Image();
        let url = window.URL || window.webkitURL;
        img.src = url.createObjectURL(this.state.file);

        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            url.revokeObjectURL(img.src);
        };

        this.setState({
            downloadUrl: this.state.canvas.toDataURL(),
            imageName: this.state.file.name,
            showSelectImagePopup: !this.state.showSelectImagePopup
        })
    }

    render() {
        return (
            <div>
                <Header
                    className="header"
                    canvas={this.state.canvas}
                    toggleNewCanvasPopup={this.toggleNewCanvasPopup.bind(this)}
                    toggleSelectImagePopup={this.toggleSelectImagePopup.bind(this)}
                    toggleDownloadPopup={this.toggleDownloadPopup.bind(this)} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1">
                            <DrawType
                                canvas={this.state.canvas}
                                setDrawType={this.setDrawType.bind(this)} />
                            <ColourPicker
                                canvas={this.state.canvas}
                                drawType={this.state.drawType}
                                pickColour={this.pickColour.bind(this)}/>
                        </div>
                        <div className="col-md-11">
                            <Canvas brushColour={this.state.brushColour} getRefFromChild={this.getRefFromChild}/>
                            {this.state.showNewCanvasPopup ?
                                <Popup
                                    text={<div><input
                                        value={this.state.imageName.replace(/\.[^/.]+$/, "")}
                                        onChange={this.handleChange.bind(this)} /><span>.jpg</span></div>}
                                    closePopup={this.toggleNewCanvasPopup.bind(this)}
                                    performAction={<button onClick={this.newCanvas.bind(this)}>Go</button>} />
                                : null
                            }
                            {this.state.showSelectImagePopup ?
                                <Popup
                                    text={<input type="file" onChange={this.getImage.bind(this)} />}
                                    closePopup={this.toggleSelectImagePopup.bind(this)}
                                    performAction={<button onClick={this.setImage.bind(this)}>Go</button>} />
                                : null
                            }
                            {this.state.showDownloadPopup ?
                                <Popup
                                    text={<div><input
                                        value={this.state.imageName.replace(/\.[^/.]+$/, "")}
                                        onChange={this.handleChange.bind(this)} /><span>.jpg</span></div>}
                                    closePopup={this.toggleDownloadPopup.bind(this)}
                                    performAction={<a
                                        download={this.state.imageName}
                                        href={this.state.downloadUrl}
                                        onClick={this.toggleDownloadPopup.bind(this)}>Go</a>} />
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CanvasApp;
