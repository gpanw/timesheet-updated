import React, { Component } from 'react'

class DateList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      weekList: [],
      selected_p: ''
    }
  }

  componentDidMount () {
    this.setState({
      selected_p: 0
    })
    this.add_dates()
  }

  componentDidUpdate (prevProps) {
    if (this.props.currDate !== prevProps.currDate) {
      this.add_dates()
    }
  }

  handle_clickDate = (event) => {
    const { handle_changeDate } = this.props
    event.preventDefault()
    let selectedDate = event.target.innerText.replace('Current', '')
    this.setState({
      selected_p: event.target.id
    })
    var curr = new Date(selectedDate)
    handle_changeDate(curr)
  }

  add_dates () {
    const { decrementDate } = this.props
    const { currDate } = this.props
    if (!currDate) return
    const temp = this.state.weekList
    let curr = new Date(currDate)
    temp.push(decrementDate(curr, 5)[1])
    let k = -7
    if (this.props.title==='Time Sheet') k = k*-1
    for (var i = 0; i < 11; i++) {
      var x = curr.getDate() + k
      const newdate = new Date(curr.setDate(x)).toDateString()
      curr = new Date(newdate)
      const add_week = decrementDate(curr, 5)[1]
      temp.push(add_week)
    }
    this.setState({
      weekList: temp
    })
  }

  add_p_el () {
    const { weekList } = this.state
    const { selected_p } = this.state
    const p_el = []
    p_el.push(<p
      className={selected_p == 0 ? 'future-week selected' : 'future-week'} id={0}
      onClick={this.handle_clickDate}
    >
      {weekList[0]} {this.props.title==='Time Sheet'? 'Current' : ''}
    </p>)
    for (var i = 1; i < 11; i++) {
      p_el.push(<p
        className={selected_p == i ? 'future-week selected' : 'future-week'} id={i}
        onClick={this.handle_clickDate}
      >
        {weekList[i]}
      </p>)
    }
    return p_el
  }

  render () {
    return (
      <div>
        <div className='week-list-head'>
          Select a week from dropdown
        </div>
        <div className='float-left week-list'>
          {this.add_p_el()}
        </div>
      </div>
    )
  }
}

export default DateList
