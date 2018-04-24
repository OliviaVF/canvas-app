import React        from 'react';
import Canvas       from './Canvas';
import Header       from '../partials/Header';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header className="header" {...this.state}/>
                <Canvas {...this.state}/>
            </div>
        );
    }
}

export default App;
