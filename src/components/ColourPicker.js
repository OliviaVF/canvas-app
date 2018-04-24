import React from 'react';

const ColourPicker = (props) => {
    return (
        <ul className="colour-picker">
            <li>
                <button className="red" onClick={() => props.pickColour('#FF0000')} />
            </li>
            <li>
                <button className="yellow" onClick={() => props.pickColour('#FFFF00')} />
            </li>
            <li>
                <button className="green" onClick={() => props.pickColour('#008000')} />
            </li>
            <li>
                <button className="blue" onClick={() => props.pickColour('#0000FF')} />
            </li>
            <li>
                <button className="pink" onClick={() => props.pickColour('#FF1493')} />
            </li>
            <li>
                <button className="purple" onClick={() => props.pickColour('#800080')} />
            </li>
            <li>
                <button className="orange" onClick={() => props.pickColour('#FFA500')} />
            </li>
            <li>
                <button className="black" onClick={() => props.pickColour('#000000')} />
            </li>
        </ul>
    );
};

export default ColourPicker;