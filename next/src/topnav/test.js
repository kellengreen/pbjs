import React from 'react';
import ReactDOM from 'react-dom';
import TopNav from './TopNav';

it('renders without crashing', () => {
    ReactDOM.render(<TopNav />, document.createElement('div'));
});
