import React, { Component } from 'react'
import Login from './login/Login'
import Current from './timesheet/current'
import PriorTimeSheet from './timesheet/priorsheet'
import Calendar from './leaves/Calendar'
import Profile from './profile/Profile'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './timesheet/mynav'

class Main extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/react/timesheet' component={Current} />
            <Route exact path='/react/timesheet/prior' component={PriorTimeSheet} />
            <Route exact path='/react/leave' component={Calendar} />
            <Route exact path='/react/profile' component={Profile} />
            <Route exact path='/login' render={() => (window.location = '/login')} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default Main
