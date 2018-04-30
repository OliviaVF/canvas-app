import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import CanvasApp from './containers/CanvasApp';

if (module.hot) {
    module.hot.accept();
}

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(<CanvasApp />, container);
