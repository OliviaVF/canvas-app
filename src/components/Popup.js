import React from 'react';

export const Popup = (props) => {
    return (
        <div className="popup">
            <div className="popup_inner">
                <h1>{props.text}</h1>
                <div>{props.performAction}</div>
                <button onClick={props.closePopup}>Cancel</button>
            </div>
        </div>
    );
};

export default Popup;