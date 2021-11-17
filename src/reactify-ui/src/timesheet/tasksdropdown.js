import React, { Component } from 'react'
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class TaskDropdown extends Component {
  constructor (props) {
   super(props)
   this.state = {
     leave_checked: false,
     modal_open: false,
     teamList:[],
     taskList:[],
     otherTask:'',
   }
  }

  componentDidMount() {
    this.setState({
     leave_checked: false,
     modal_open: false,
   })
  }

  loadTeams () {
    const thisComp = this
    let endpoint = '/api/project/teams/'
    const lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        return response.json()
      }).then(function (responseData) {
        thisComp.setState(
          { teamList: responseData }
        )
      }).catch(function (error) {
        console.log('error', error)
      })
  }

  loadTasks (team) {
    const thisComp = this
    let endpoint = '/api/project/tasks/'
    if (team) endpoint += team
    const lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        return response.json()
      }).then(function (responseData) {
        thisComp.setState(
          { taskList: responseData }
        )
      }).catch(function (error) {
        console.log('error', error)
      })
  }


  toggle_radio = (event) => {
    this.setState({
      leave_checked: !this.state.leave_checked
    })
  }

  selectTask = (event) => {
    event.preventDefault()
    let taskName = this.selectRef.value
    this.addSelectedTask(taskName)
    this.selectRef.value=0
  }

  otherSelectTask = (event) => {
    event.preventDefault()
    this.setState({
      otherTask: this.otherSelectRef.value
    })
  }

  addOtherTask = (event) => {
    event.preventDefault()
    let taskName = this.state.otherTask
    if (taskName) this.addSelectedTask(taskName)
  }

  addSelectedTask = (taskName) => {
    const { addedTask } = this.props
    const { handle_selectTask } = this.props
    const { leave_checked } = this.state
    if (taskName === 'other') {
      this.toggle_modal()
    } 
    else {
      if (leave_checked) {
        taskName += 'L' 
      }
      else {
        var b = taskName.split(' | ')[1]
        taskName = taskName.split(' | ')[0]
        if (b==='Billable') taskName += 'B' 
        if (b==='NonBillable') taskName += 'N'
      }
      if (addedTask.includes(taskName)) {
        alert('task has already been added!!!')
      }
      else { 
        if (handle_selectTask) handle_selectTask(taskName)
      }
    }
  }

  selectTeam = (event) => {
    event.preventDefault()
    this.loadTasks(this.TeamSelectRef.value)
  }

  toggle_modal = () => {
    if (!this.state.modal_open && this.state.teamList.length===0) this.loadTeams()
    this.setState({
      modal_open: !this.state.modal_open,
      taskList: [],
      otherTask: ''
    })
  }

  render () {
    const { userTasks } = this.props
    const { leaves } = this.props
    const { leave_checked } = this.state
    return (
      <div className='row'>
          <div className='radio col-xs-3 offset-md-3'>
            Leaves
            <label className='radio ml-1'>
              <input
                type='radio' value='leaves' ref={node => {this.leaveRadioRef = node}}
                checked={leave_checked} onClick={this.toggle_radio}
              />
            </label>
          </div>
          {this.state.leave_checked ? <div className='col-md-6'>
                                      <select className='form-control' ref={node => {this.selectRef = node}}
                                        onChange={this.selectTask}>
                                        <option value='0'>
                                          Select leaves from dropdown
                                        </option>
                                        {leaves.map((leaveItem, index) => {
                                          return (<option value={leaveItem.leave_id + ' - ' + leaveItem.leave_description}>
                                                    {leaveItem.leave_id + ' - ' + leaveItem.leave_description}
                                                  </option>)
                                        })}
                                      </select>
                                    </div> :  <div className='col-md-6'>
                                                <SelectDropDown userTasks={userTasks} selectItem={this.selectTask}
                                                  InputRef={node => {this.selectRef = node}} 
                                                  other='Other - Tasks from other Teams'
                                                  inputKey='task_name'
                                                  initials='Select tasks from dropdown'
                                                />
                                              </div>
        }
        <div>
          <Modal isOpen={this.state.modal_open} toggle={this.toggle_modal}>
            <ModalHeader toggle={this.toggle_modal}>Add Tasks From Other Team</ModalHeader>
            <ModalBody>
              <SelectDropDown userTasks={this.state.teamList}
                    selectItem={this.selectTeam} 
                    InputRef={node => {this.TeamSelectRef = node}} 
                    other={false}
                    inputKey='team_name'
                    initials='Select Team from dropdown'
              />
              <br></br>
              <SelectDropDown userTasks={this.state.taskList} 
                    selectItem={this.otherSelectTask}
                    InputRef={node => {this.otherSelectRef = node}} 
                    other={false}
                    inputKey='task_name'
                    initials='Select tasks from dropdown'
              />         
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.addOtherTask}>Add To timesheet</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

function SelectDropDown(props) {
  return(<select className='form-control' ref={props.InputRef}
          onChange={props.selectItem}>
          <option value='0'>
            {props.initials}
          </option>
          {props.userTasks.map((taskItem, index) => {
            if (props.inputKey) {
              var task = taskItem[props.inputKey]
              if (taskItem['is_billable'] !== undefined) {
                var billable = taskItem.is_billable ? 'Billable' : 'NonBillable'
                task += ' | ' + billable
              }
            }
            else {
              task = taskItem
            }
            return (<option value={task}>{task}</option>)})
          }
          {props.other ?  <option value='other'>
                            {props.other}
                          </option> : ''
          }
        </select>
      )
}

export default TaskDropdown
