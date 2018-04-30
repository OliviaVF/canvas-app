import React           from 'react';
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
        </header>
        );
    }
}

export default Header;