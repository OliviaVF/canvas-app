import React from 'react';

class Popup extends React.Component {
    render() {
        return (
            <div className="popup">
                <div className="popup_inner">
                    <h1>{this.props.text}</h1>
                    <div>{this.props.performAction}</div>
                    <button onClick={this.props.closePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default Popup;