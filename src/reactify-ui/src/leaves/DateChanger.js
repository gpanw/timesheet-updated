import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import JumboTron from '../timesheet/jumbotron'
import { Redirect } from 'react-router-dom'

class DateChanger extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const currDate = this.props.date
    var currMonth = currDate.toLocaleString('default', { month: 'short' })
    var currYear = currDate.getFullYear()
    var { change_month } = this.props
    return (
      <thead>
        <tr>
          <th class='month' />
          <th class='month change-date' onClick={() => change_month(-12)}>&lt;&lt;</th>
          <th class='month change-date' onClick={() => change_month(-1)}>&lt;</th>
          <th class='month'>
            {currMonth} {currYear}
          </th>
          <th class='month change-date' onClick={() => change_month(+1)}>&gt;</th>
          <th class='month change-date' onClick={() => change_month(+12)}>&gt;&gt;</th>
          <th class='month' />
        </tr>
      </thead>
    )
  }
}

export default DateChanger
