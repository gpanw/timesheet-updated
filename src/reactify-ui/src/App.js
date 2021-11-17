import React, { Component } from 'react'
import Main from './main'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <div>
        <Main />
      </div>
    )
  }
}

export default App
