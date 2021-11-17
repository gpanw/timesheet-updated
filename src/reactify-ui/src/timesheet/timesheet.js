import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import SheetTable from './sheetTable'
import JumboTron from './jumbotron'
import DateList from './dateList'
import { Redirect } from 'react-router-dom'

class TimeSheet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timeSheetEntry: [],
      userTasks: [],
      leaves: [],
      addedTask: [],
      is_login: true,
    }
  }

  componentDidMount () {
    this.loadTimesheet()
    this.loadTasks()
    this.loadLeaves()
  }

  componentDidUpdate(prev) {
    if (this.props.currDate !== prev.currDate) this.loadTimesheet()
  }

  fetchApi(endpoint, stateEl) {
    let thisComp = this
    const lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        if (response.status==403) {
          thisComp.setState({
            is_login: false
          })
        }
        return response.json()
      }).then(function (responseData) {
        thisComp.setState(
          { [stateEl]: responseData }
        )
      }).catch(function (error) {
        console.log('error', error)
      })

  }

  loadTimesheet () {
    this.setState({
      addedTask: []
    })
    let varDate = this.props.currDate
    let YYYY_MM_DD = varDate.getFullYear() + '-' + (varDate.getMonth() + 1) + '-' + varDate.getDate()
    const endpoint = this.props.endPoint + YYYY_MM_DD
    this.fetchApi(endpoint, 'timeSheetEntry')
  }

  loadTasks (team) {
    let endpoint = '/api/project/tasks/'
    if (team) endpoint += team
    this.fetchApi(endpoint, 'userTasks')
  }

  loadLeaves () {
    const endpoint = '/api/project/leaves/'
    this.fetchApi(endpoint, 'leaves')
  }

  createTimesheet(data){
    let varDate = this.props.currDate
    let YYYY_MM_DD = varDate.getFullYear() + '-' + (varDate.getMonth() + 1) + '-' + varDate.getDate()
    const endpoint = this.props.endPoint + YYYY_MM_DD + '/create/' 
    const csrfToken = cookie.load('csrftoken')
    let thisComp = this
    if (csrfToken !== undefined) {
      let lookupOptions = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
      }
      fetch(endpoint, lookupOptions)
          .then(function(response){
            if (response.status==403) {
                thisComp.setState({
                  is_login: false
                })}
            return response.json()
          }).then(function(responseData){
              alert(responseData['rc'])
          }).catch(function(error){
              console.log("error", error)
              alert("An error " + error + " occured, please try again later.")
          })
      } 
  }

  add_task = (task) => {
    task = task.replace(' | ','')
    let { addedTask } = this.state
    if (addedTask.includes(task)){
      alert('task has already been added')
    }
    else {
      addedTask.push(task)
      this.setState({
        addedTask: addedTask,
      })
    }
  }

  handle_selectTask = (task) => {
    var t = this.state.timeSheetEntry
    var sheetObj = {}
    sheetObj.taskid = task.slice(0, task.length-1)
    sheetObj.is_billable = task[task.length-1]
    sheetObj.hours = ["0.0", "0.0", "0.0", "0.0", "0.0", "0.0", "0.0"]
    sheetObj.sum_hours=0
    sheetObj.approved='Y'
    sheetObj.approved_by=""
    t.push(sheetObj)
    this.add_task(task)
    this.setState({
      timeSheetEntry: t
    })
  }

  change_timeSheet = (row, col, changedVal) => {
    let changeTimesheet = this.state.timeSheetEntry
    changeTimesheet[row].hours[col] = changedVal
    this.setState({
      timeSheetEntry: changeTimesheet
    })
  }

  handle_submtSheet = (event) => {
    event.preventDefault()
    const { timeSheetEntry } = this.state
    this.createTimesheet(timeSheetEntry)
  }

  decrementDate (curr, n) {
    if (!curr) return [0, 0, 0]
    if (curr.getDay() < 6) {
      var x = curr.getDate() - curr.getDay() + n
    } else {
      var x = curr.getDate() + 1 + n
    };
    var firstdate = new Date(curr.setDate(x))
    var splitdate = firstdate.toDateString().split(' ')
    var returndate = splitdate[0] + ' ' + splitdate[2] + '-' + splitdate[1]
    var gg = firstdate
    var date_YYYY_MM_DD = gg.getFullYear() + '-' + (gg.getMonth() + 1) + '-' + gg.getDate()
    return [returndate, firstdate.toDateString(), date_YYYY_MM_DD]
  }

  render () {
    const { timeSheetEntry } = this.state
    const { userTasks } = this.state
    const { leaves } = this.state
    const { currDate } = this.props
    const { addedTask } = this.state
    if (this.state.is_login == false) return (<Redirect to='/login'/>)
    return (
      <div>
        <JumboTron
          userTasks={userTasks} addedTask={addedTask}
          leaves={leaves} title={this.props.title} handle_selectTask={this.handle_selectTask}
        />
        <SheetTable timeSheetEntry={timeSheetEntry} currDate={currDate}
         add_task={this.add_task} change_timeSheet={this.change_timeSheet}
        />
        <br></br>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <DateList currDate={currDate} decrementDate={this.decrementDate}
                handle_changeDate={this.props.handle_changeDate} title={this.props.title}
              />
            </div>
            <div className='col-xs-3 float-right'>
              <button className='btn btn-success btn-block submit-btn' 
                type='submit' onClick={this.handle_submtSheet}>
                    Submit
              </button>
            </div>
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

export default TimeSheet
