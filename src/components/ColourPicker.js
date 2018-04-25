import React           from 'react';
import {DrawTypeEnums} from "./DrawType";

const ColourPicker = (props) => {
    return (
        <ul className="colour-picker">
            <li>
                <button
                    disabled={props.drawType !== DrawTypeEnums.brush}
                    className="red"
                    onClick={() => props.pickColour('#FF0000')} />
            </li>
            <li>
                <button
                    disabled={props.drawType !== DrawTypeEnums.brush}
                    className="yellow"
                    onClick={() => props.pickColour('#FFFF00')} />
            </li>
            <li>
                <button
                    disabled={props.drawType !== DrawTypeEnums.brush}
                    className="green"
                    onClick={() => props.pickColour('#008000')} />
            </li>
            <li>
                <button
                    disabled={props.drawType !== DrawTypeEnums.brush}
                    className="blue"
                    onClick={() => props.pickColour('#0000FF')} />
            </li>
            <li>
                <button
                    disabled={props.drawType !== DrawTypeEnums.brush}
                    className="pink"
                    onClick={() => props.pickColour('#FF1493')} />
            </li>
            <li>
                <button
                    disabled={props.drawType !== DrawTypeEnums.brush}
                    className="purple"
                    onClick={() => props.pickColour('#800080')} />
            </li>
            <li>
                <button
                    disabled={props.drawType !== DrawTypeEnums.brush}
                    className="orange"
                    onClick={() => props.pickColour('#FFA500')} />
            </li>
            <li>
                <button
                    disabled={props.drawType !== DrawTypeEnums.brush}
                    className="black"
                    onClick={() => props.pickColour('#000000')} />
            </li>
        </ul>
    );
};

export default ColourPicker;