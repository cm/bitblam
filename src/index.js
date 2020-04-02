import React from 'react';
import { render } from 'react-dom';
import './styles/styles.scss';
import Root from './root';

render(
  <React.StrictMode>
      <Root />
  </React.StrictMode>,
  document.getElementById('root')
);