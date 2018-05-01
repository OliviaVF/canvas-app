import React                     from 'react';
import {DrawType, DrawTypeEnums} from './DrawType';
import ColourPicker              from './ColourPicker';

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            downloadUrl:          null,
            drawType:             null,
            brushColour:          "#000000"
        };
    }

    componentDidMount() {
        this.props.getRefFromChild(this.refs.canvas)
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

    mouseDown(e) {
        const rect = this.refs.canvas.getBoundingClientRect();
        let ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();

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

        const rect = this.refs.canvas.getBoundingClientRect();
        const lastX = this.state.lastX;
        const lastY = this.state.lastY;
        let currentX = e.clientX - rect.left;
        let currentY = e.clientY - rect.top;
        let w = this.refs.canvas.width;
        let h = this.refs.canvas.height;
        let ctx = this.refs.canvas.getContext('2d');

        if (this.state.drawType === DrawTypeEnums.circle) {
            ctx.clearRect(0, 0, w, h);
            this.drawCircle(lastX, lastY, currentX, currentY);
            ctx.strokeStyle = "rgba(255, 0, 0, 0)";
            ctx.strokeRect(lastX, lastY, currentX - lastX, currentY - lastY);
        } else if (this.state.drawType === DrawTypeEnums.square) {
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
            downloadUrl: this.refs.canvas.toDataURL()
        });
    }

    drawBrush(lX, lY, cX, cY) {
        console.log(this.state.brushColour)
        const newContext = this.refs.canvas.getContext('2d');
        newContext.strokeStyle = this.state.brushColour;
        newContext.lineWidth = this.props.lineWidth;
        this.setState({
            context: newContext
        });
        newContext.moveTo(lX, lY);
        newContext.lineTo(cX, cY);
        newContext.stroke();
    }

    drawCircle(lastX, lastY, currentX, currentY) {
        let radiusX = (currentX - lastX) * 0.5,
            radiusY = (currentY - lastY) * 0.5,
            centerX = lastX + radiusX,
            centerY = lastY + radiusY,
            step = 0.01,
            a = step,
            pi2 = Math.PI * 2 - step,
            ctx = this.refs.canvas.getContext('2d');

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
                        <DrawType
                            canvas={this.props.canvas}
                            setDrawType={this.setDrawType.bind(this)} />
                        <ColourPicker
                            canvas={this.props.canvas}
                            drawType={this.state.drawType}
                            pickColour={this.pickColour.bind(this)}/>
                    </div>
                    <div className="col-md-11">
                        <canvas
                            className="canvas"
                            ref="canvas"
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

export default Canvas;