import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import JumboTron from '../timesheet/jumbotron'
import { Redirect } from 'react-router-dom'

class MonthDays extends Component {
  constructor (props) {
    super(props)
    this.state = {
      is_hover: false,
    }
  }

  calDay_Hover = (event) => {
    this.setState({
      is_hover: true,
    })
  }

  calDay_Leave = (event) => {
    this.setState({
      is_hover: false,
    })
  }

  render () {
    var weekDay = this.props.weekDay
    var {leaves} = this.props
    return (
      <td
        className={weekDay === '' ? 'noday' : 
                  this.state.is_hover === true ? 'calday highlight-day' : 'calday'}
        onMouseEnter={this.calDay_Hover}
        onMouseLeave={this.calDay_Leave}
        onClick={this.props.open_modal}
        value={weekDay}
      >
        <div classname='dayNumber'>{weekDay}</div>
        <div className='leavelist'>
          {leaves.map((leave, index) => {
            return (<p className='leaveevents'>
              {weekDay == leave.day ? leave.user + '-' + leave.leaveid : ''}
            </p>)
          })}
        </div>
      </td>
    )
  }
}

export default MonthDays
