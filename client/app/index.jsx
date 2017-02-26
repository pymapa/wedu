import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import routes from './Router';

class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
                <h1>asdf</h1>
            </div>
        )
    }
}

render(<App />, document.getElementById('app'));
