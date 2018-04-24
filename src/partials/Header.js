import React           from 'react';
import Popup           from '../components/Popup';
import {DrawTypeEnums} from '../components/DrawType';
import Logo            from '../images/logo.jpg';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canvas:               null,
            context:              null,
            brushColour:          null,
            downloadUrl:          null,
            drawType:             DrawTypeEnums.brush,
            showSelectImagePopup: false,
            showDownloadPopup:    false,
            showNewCanvasPopup:   false,
            imageName:            null
        };
    }

    newCanvas() {
        const canvas = this.state.canvas;

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

    render() {
        return (
        <header>
            <div className="brand">
                <img src={Logo} alt="Qumodo Logo"/>
                <h1 className="inline">Qumodo Draw</h1>
            </div>
            <ul>
                <li>
                    <button className="new" onClick={this.toggleNewCanvasPopup.bind(this)} />
                </li>
                <li>
                    <button className="open" onClick={this.toggleSelectImagePopup.bind(this)} />
                </li>
                <li>
                    <button className="download" onClick={this.toggleDownloadPopup.bind(this)} />
                </li>
            </ul>
            {this.state.showNewCanvasPopup ?
                <Popup
                    text={<div><input value={this.state.imageName.replace(/\.[^/.]+$/, "")} onChange={this.handleChange.bind(this)} /><span>.jpg</span></div>}
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
                    text={<div><input value={this.state.imageName.replace(/\.[^/.]+$/, "")} onChange={this.handleChange.bind(this)} /><span>.jpg</span></div>}
                    closePopup={this.toggleDownloadPopup.bind(this)}
                    performAction={<a download={this.state.imageName} href={this.state.downloadUrl} onClick={this.toggleDownloadPopup.bind(this)}>Go</a>} />
                : null
            }
        </header>
        );
    }
}

export default Header;