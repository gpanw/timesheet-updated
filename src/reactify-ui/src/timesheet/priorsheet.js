import React, { Component } from 'react'
import TimeSheet from './timesheet'

class PriorTimeSheet extends Component {
  constructor (props) {
    super(props)
    let curr = new Date;
    let x = curr.getDate() - 7;
    let newdate = new Date(curr.setDate(x)).toDateString();
    this.state = {
      currDate: curr
    }
  }

  componentDidMount() {
    let curr = new Date;
    let x = curr.getDate() - 7;
    let newdate = new Date(curr.setDate(x)).toDateString();
    this.setState({
      currDate: curr,
      endPoint: `/api/priortime/`,
    })
  }

  handle_changeDate = (curr) => {
    this.setState({
      currDate: curr
    })
  }

  render () {
    return (
      <div>
        <TimeSheet title='Time Adjustment' currDate={this.state.currDate} 
          handle_changeDate={this.handle_changeDate} endPoint={this.state.endPoint}
        />
      </div>
    )
  }
}

export default PriorTimeSheet
