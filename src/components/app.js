import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Player from '../pages/player'
import Home from '../pages/home'

export default App = () => (
  <Router>
    <div className='application-route'>
      <Switch>
        <Route path='/:hash' component={Player} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  </Router>
)