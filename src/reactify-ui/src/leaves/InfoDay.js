import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import { Redirect } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class InfoDay extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  submitLeave = (event) => {
    event.preventDefault()
    console.log('submit button11')
    console.log(this.props.clicked_date)
    console.log(this.props.clicked_date.getDate())
  }

  render () {
    var { leaves } = this.props
    let monthDate = this.props.clicked_date.getDate()
    return (
      <Modal isOpen={this.props.modal_open} toggle={this.props.toggle_modal}>
        <ModalHeader toggle={this.props.toggle_modal}>Manage Leaves</ModalHeader>
        <ModalBody>
          {this.props.clicked_date.getDate()} -
          <table className='table' id='task-table'>
            <thead>
              <tr>
                <th>
                        User
                </th>
                <th>
                        Leave Type
                </th>
                <th>
                        Comments
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => {
                return (<>{monthDate==leave.day ? (<tr>
                  <td>{leave.user}</td>
                  <td>{leave.leaveid}</td>
                  <td>{leave.comment}</td>
                        </tr>) : null}</>)
              })}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <div className='container-fluid'>
            <Button className='float-right' color='primary' onClick={this.submitLeave}>Upload</Button>
          </div>
        </ModalFooter>
      </Modal>
    )
  }
}

export default InfoDay
