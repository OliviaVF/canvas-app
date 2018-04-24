import React                     from 'react';
import PropTypes                 from 'prop-types';
import Header                    from '../partials/Header';
import {DrawTypeEnums, DrawType} from '../components/DrawType';
import ColourPicker              from '../components/ColourPicker';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canvas:               null,
            context:              null,
            downloadUrl:          null,
            drawType:             DrawTypeEnums.brush,
            showSelectImagePopup: false,
            showDownloadPopup:    false,
            showNewCanvasPopup:   false,
            imageName:            null,
            brushColour:          "#000000"
        };
    }

    newCanvas() {
        const canvas = this.refs.canvas;

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

    mouseDown(e) {
        const rect = this.state.canvas.getBoundingClientRect();
        this.state.context.beginPath();

        this.setState({
            lastX: e.clientX - rect.left,
            lastY: e.clientY - rect.top,
            drawing: true
        });
    }

    mouseMove(e) {
        if (!this.state.drawing) {
            return false;
        }

        const rect = this.state.canvas.getBoundingClientRect();
        const lastX = this.state.lastX;
        const lastY = this.state.lastY;
        let currentX = e.clientX - rect.left;
        let currentY = e.clientY - rect.top;

        if (this.state.drawType === DrawTypeEnums.circle) {
            let w = this.state.canvas.width;
            let h = this.state.canvas.height;
            let ctx = this.state.context;
            ctx.clearRect(0, 0, w, h);
            this.drawCircle(lastX, lastY, currentX, currentY);
            ctx.strokeStyle = "rgba(255, 0, 0, 0)";
            ctx.strokeRect(lastX, lastY, currentX - lastX, currentY - lastY);
        } else if (this.state.drawType === DrawTypeEnums.square) {
            let w = this.state.canvas.width;
            let h = this.state.canvas.height;
            let ctx = this.state.context;
            ctx.clearRect(0, 0, w, h);
            ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
            ctx.strokeRect(lastX, lastY, currentX - lastX, currentY - lastY);
        } else {
            this.drawBrush(lastX, lastY, currentX, currentY);
            this.setState({
                lastX: currentX,
                lastY: currentY
            });
        }
    }

    mouseUp() {
        this.setState({
            drawing: false,
            downloadUrl: this.state.canvas.toDataURL()
        });
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

    drawBrush(lX, lY, cX, cY) {
        const newContext = this.state.context;
        newContext.strokeStyle = this.state.brushColor;
        newContext.lineWidth = this.props.lineWidth;
        this.setState({
            context: newContext
        });
        this.state.context.moveTo(lX, lY);
        this.state.context.lineTo(cX, cY);
        this.state.context.stroke();
    }

    drawCircle(lastX, lastY, currentX, currentY) {
        let radiusX = (currentX - lastX) * 0.5,
            radiusY = (currentY - lastY) * 0.5,
            centerX = lastX + radiusX,
            centerY = lastY + radiusY,
            step = 0.01,
            a = step,
            pi2 = Math.PI * 2 - step,
            ctx = this.state.context;

        ctx.beginPath();
        ctx.moveTo(centerX + radiusX * Math.cos(0),
            centerY + radiusY * Math.sin(0));

        for (; a < pi2; a += step) {
            ctx.lineTo(centerX + radiusX * Math.cos(a),
                centerY + radiusY * Math.sin(a));
        }

        ctx.closePath();
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    }

    render() {
        return (
            <div>
                <Header
                    className="header"
                    canvas={this.refs.canvas}
                    newCanvas={this.newCanvas.bind(this)}
                    toggleNewCanvasPopup={this.toggleNewCanvasPopup.bind(this)}
                    toggleSelectImagePopup={this.toggleSelectImagePopup.bind(this)}
                    toggleDownloadPopup={this.toggleDownloadPopup.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                    getImage={this.getImage.bind(this)}
                    imageName={this.state.imageName}
                    downloadUrl={this.state.downloadUrl}
                    showNewCanvasPopup={this.state.showNewCanvasPopup}
                    showSelectImagePopup={this.state.showSelectImagePopup}
                    showDownloadPopup={this.state.showDownloadPopup} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1">
                            <DrawType setDrawType={this.setDrawType.bind(this)} />
                            <ColourPicker pickColour={this.pickColour.bind(this)}/>
                        </div>
                        <div className="col-md-11">
                            <canvas ref="canvas"
                                    onMouseDown={this.mouseDown.bind(this)}
                                    onMouseMove={this.mouseMove.bind(this)}
                                    onMouseUp={this.mouseUp.bind(this)}>
                            </canvas>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

App.propTypes = {
    brushColor: PropTypes.string,
    lineWidth: PropTypes.number,
    cursor: PropTypes.string,
    canvasStyle: PropTypes.shape({
        backgroundColor: PropTypes.string
    }),
    newCanvas: PropTypes.bool
};

export default App;
