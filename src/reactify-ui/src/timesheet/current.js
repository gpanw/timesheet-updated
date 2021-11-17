import React, { Component } from 'react'
import TimeSheet from './timesheet'
import testfunc1 from './utils'

class Current extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currDate: new Date(),
      endPoint: '/api/timesheet/',
    }
  }

  handle_changeDate = (curr) => {
    this.setState({
      currDate: curr
    })
  }

  render () {
    return (
      <div>
      <TimeSheet title='Time Sheet' currDate={this.state.currDate} 
        handle_changeDate={this.handle_changeDate} endPoint={this.state.endPoint}
      />
      </div>
    )
  }
}

export default Current
