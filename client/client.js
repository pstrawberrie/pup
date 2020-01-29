/**
 * Client Entry
 */
import './client.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import IndexContainer from './components/containers/IndexContainer/IndexContainer';

// Render React Components
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <IndexContainer />,
    document.getElementById('index-root')
  );
});
