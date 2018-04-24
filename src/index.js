import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
