import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Player from './player'
import Home from './home'

const Root = () => (
  <Router>
    <div className='application'>
      <Switch>
        <Route path='/:hash' component={Player} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  </Router>
)

export default Root