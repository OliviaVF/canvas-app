import React           from 'react';
import Popup           from '../components/Popup';
import Logo            from '../images/logo.jpg';

class Header extends React.Component {
    render() {
        return (
        <header>
            <div className="brand">
                <img src={Logo} alt="Qumodo Logo"/>
                <h1 className="inline">Qumodo Draw</h1>
            </div>
            <ul>
                <li>
                    <button className="new" onClick={this.props.toggleNewCanvasPopup} />
                </li>
                <li>
                    <button disabled={!this.props.canvas} className="open" onClick={this.props.toggleSelectImagePopup} />
                </li>
                <li>
                    <button disabled={!this.props.canvas} className="download" onClick={this.props.toggleDownloadPopup} />
                </li>
            </ul>
            {this.props.showNewCanvasPopup ?
                <Popup
                    text={<div><input
                        value={this.props.imageName.replace(/\.[^/.]+$/, "")}
                        onChange={this.props.handleChange} /><span>.jpg</span></div>}
                    closePopup={this.props.toggleNewCanvasPopup}
                    performAction={<button onClick={this.props.newCanvas}>Go</button>} />
                : null
            }
            {this.props.showSelectImagePopup ?
                <Popup
                    text={<input type="file" onChange={this.props.getImage} />}
                    closePopup={this.props.toggleSelectImagePopup}
                    performAction={<button onClick={this.props.setImage}>Go</button>} />
                : null
            }
            {this.props.showDownloadPopup ?
                <Popup
                    text={<div><input
                        value={this.props.imageName.replace(/\.[^/.]+$/, "")}
                        onChange={this.props.handleChange} /><span>.jpg</span></div>}
                    closePopup={this.props.toggleDownloadPopup}
                    performAction={<a
                        download={this.props.imageName}
                        href={this.props.downloadUrl}
                        onClick={this.props.toggleDownloadPopup}>Go</a>} />
                : null
            }
        </header>
        );
    }
}

export default Header;