import React from 'react';

export const DrawType = (props) => {
    return (
        <ul>
            <li>
                <button disabled={!props.canvas} className="brush" onClick={() => props.setDrawType(0)} />
            </li>
            <li>
                <button disabled={!props.canvas} className="square" onClick={() => props.setDrawType(1)} />
            </li>
            <li>
                <button disabled={!props.canvas} className="circle" onClick={() => props.setDrawType(2)} />
            </li>
        </ul>
    );
};

export const DrawTypeEnums = {
    "brush": 0,
    "square": 1,
    "circle": 2
};

export default DrawType;