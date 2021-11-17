import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import JumboTron from '../timesheet/jumbotron'
import { Redirect } from 'react-router-dom'
import DateChanger from './DateChanger'
import MonthWeeks from './MonthWeeks'
import InfoDay from './InfoDay'

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      is_login: true,
      date: new Date(),
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      week: [],
      modal_open: false,
      clicked_date: new Date(),
      leaves: [],
    }
  }

  componentDidMount () {
    const { date } = this.state
    var month = date.getMonth() + 1
    this.fetchApi('/api/leave/month/' + month + '/year/' + date.getFullYear())
  }

  fetchApi (endpoint) {
    const thisComp = this
    const lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        if (response.status == 403) {
          thisComp.setState({
            is_login: false
          })
        }
        return response.json()
      }).then(function (responseData) {
        thisComp.setState(
          { leaves: responseData }
        )
      }).catch(function (error) {
        console.log('error', error)
      })
  }

  toggle_modal = (event) => {
    this.setState({
      modal_open: !this.state.modal_open,
    })
  }

  open_modal = (event) => {
    var clicked_date = new Date(this.state.date.getFullYear(), 
                                this.state.date.getMonth(), 
                                event.currentTarget.getAttribute("value"))
    this.setState({
      clicked_date: clicked_date,
      modal_open: true,
    })
  }

  add_days_th () {
    const { days } = this.state
    var th_el = []
    for (let i = 0; i <= 6; i++) {
      th_el.push(<th>
        {days[i]}
                 </th>)
    }
    return th_el
  }

  change_month = (x) => {
    var { date } = this.state
    var change_date = new Date(date.getFullYear(), date.getMonth()+x, 1)
    var month = change_date.getMonth() + 1
    this.fetchApi('/api/leave/month/' + month + '/year/' + change_date.getFullYear())
    this.setState({
      date: change_date,
    })
  }

  render () {
    if (this.state.is_login == false) return (<Redirect to='/login' />)
    var { week } = this.state
    var currDate = this.state.date
    var currMonth = currDate.toLocaleString('default', { month: 'short' })
    var currYear = currDate.getFullYear()
    return (
      <div>
        <div className='jumbotron'>
          <div className='container-fluid'>
            <h2>Leave Tracker</h2>
            <hr />
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='table-responsive' id='calendar'>
              <table className='table month' id='task-table'>
                <DateChanger date={this.state.date} change_month={this.change_month} />
                <thead>
                  <tr>
                    {this.add_days_th()}
                  </tr>
                </thead>
                <MonthWeeks date={this.state.date} 
                            leaves={this.state.leaves}
                            open_modal={this.open_modal}/>
              </table>
            </div>
          </div>
        </div>
        <br />
        <InfoDay modal_open={this.state.modal_open}
                  toggle_modal={this.toggle_modal}
                  clicked_date={this.state.clicked_date}
                  leaves={this.state.leaves}
        />
      </div>
    )
  }
}

export default Calendar
