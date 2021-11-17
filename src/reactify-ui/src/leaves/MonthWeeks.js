import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import JumboTron from '../timesheet/jumbotron'
import { Redirect } from 'react-router-dom'
import MonthDays from './MonthDays'

class MonthWeeks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      week: [],
      leaves: []
    }
  }

  componentDidMount () {
    this.populate_days()
  }

  componentDidUpdate (prevProps) {
    if (this.props.date != prevProps.date) {
      this.populate_days()
    }
  }

  populate_days () {
    var { date } = this.props
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    var week = []
    var cal_line = []
    if (firstDay.getDay() > 0) {
      for (let i = 0; i < firstDay.getDay(); i++) {
        cal_line.push('')
      }
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      cal_line.push(i)
      if (cal_line.length >= 7) {
        week.push(cal_line)
        cal_line = []
      }
    }
    if (cal_line.length > 0) {
      for (let i = cal_line.length; i < 7; i++) {
        cal_line.push('')
      }
      week.push(cal_line)
    }
    this.setState({
      week: week
    })
  }

  add_days_td (weekItem) {
    var td_el = []
    for (let i = 0; i < weekItem.length; i++) {
      td_el.push(
        <MonthDays
          weekDay={weekItem[i]}
          leaves={this.props.leaves}
          open_modal={this.props.open_modal}
        />
      )
    }
    return td_el
  }

  render () {
    var week = this.state.week
    return (
      <tbody>
        {week.map((weekItem, index) => {
          return (
            <tr>
              {this.add_days_td(weekItem)}
            </tr>
          )
        })}
      </tbody>
    )
  }
}

export default MonthWeeks
