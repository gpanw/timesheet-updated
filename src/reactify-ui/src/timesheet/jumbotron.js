import React, { Component } from 'react'
import TaskDropdown from './tasksdropdown'

class JumboTron extends Component {
  render () {
    const { userTasks } = this.props
    const { leaves } = this.props
    const { title } = this.props
    const { addedTask } = this.props
    const { handle_selectTask } = this.props
    return (
      <div className='jumbotron'>
        <div className='container-fluid'>
          <h2>{title}</h2>
          <hr />
          <TaskDropdown
            userTasks={userTasks} leaves={leaves}
            addedTask={addedTask} handle_selectTask={handle_selectTask}
          />
        </div>
      </div>
    )
  }
}

export default JumboTron
