import React                     from 'react';
import PropTypes                 from 'prop-types';
import {DrawTypeEnums, DrawType} from '../components/DrawType';
import ColourPicker              from '../components/ColourPicker';

class Canvas extends React.Component {
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
            imageName:            null
        };
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
        newContext.strokeStyle = this.props.brushColor;
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1">
                        <DrawType setDrawType={this.setDrawType.bind(this)} />
                        <ColourPicker className="inline" pickColour={this.pickColour.bind(this)}/>
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
        );
    }

}

Canvas.propTypes = {
    brushColor: PropTypes.string,
    lineWidth: PropTypes.number,
    cursor: PropTypes.string,
    canvasStyle: PropTypes.shape({
        backgroundColor: PropTypes.string
    }),
    newCanvas: PropTypes.bool
};

export default Canvas;

