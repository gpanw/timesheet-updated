import React, { Component } from 'react'

class SheetTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currWeek: [0, 0, 0, 0, 0, 0, 0],
      myVal: ' ',
      daySum: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    }
  }

  componentDidMount () {
    const { currDate } = this.props
    var newWeek = this.state.currWeek
    newWeek[0] = this.decrementDate(new Date(currDate), -1)[0]
    newWeek[1] = this.decrementDate(new Date(currDate), 0)[0]
    newWeek[2] = this.decrementDate(new Date(currDate), 1)[0]
    newWeek[3] = this.decrementDate(new Date(currDate), 2)[0]
    newWeek[4] = this.decrementDate(new Date(currDate), 3)[0]
    newWeek[5] = this.decrementDate(new Date(currDate), 4)[0]
    newWeek[6] = this.decrementDate(new Date(currDate), 5)[0]
    this.setState({
      currWeek: newWeek,
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.currDate !== prevProps.currDate) {
      const { currDate } = this.props
      var newWeek = this.state.currWeek
      newWeek[0] = this.decrementDate(new Date(currDate), -1)[0]
      newWeek[1] = this.decrementDate(new Date(currDate), 0)[0]
      newWeek[2] = this.decrementDate(new Date(currDate), 1)[0]
      newWeek[3] = this.decrementDate(new Date(currDate), 2)[0]
      newWeek[4] = this.decrementDate(new Date(currDate), 3)[0]
      newWeek[5] = this.decrementDate(new Date(currDate), 4)[0]
      newWeek[6] = this.decrementDate(new Date(currDate), 5)[0]
      this.setState({
        currWeek: newWeek,
        daySum: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      })
    }
    if (this.props.timeSheetEntry !== prevProps.timeSheetEntry) {
      const { timeSheetEntry } = this.props
      const { add_task } = this.props
      let varDaySum = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      for (var i=0; i<timeSheetEntry.length; i++) {
        var task = timeSheetEntry[i].taskid + timeSheetEntry[i].is_billable
        for (var j=0; j<=6; j++) {
          varDaySum[j] = parseFloat(varDaySum[j]) + parseFloat(timeSheetEntry[i].hours[j])
        }
        if (add_task) add_task(task)
      }
    this.setState({
      daySum: varDaySum
    })
    }
  }

  decrementDate (curr, n) {
    if (!curr) return [0, 0, 0]
    if (curr.getDay() < 6) {
      var x = curr.getDate() - curr.getDay() + n
    } else {
      var x = curr.getDate() + 1 + n
    };
    var firstdate = new Date(curr.setDate(x)).toDateString()
    var splitdate = firstdate.split(' ')
    var returndate = splitdate[0] + ' ' + splitdate[2] + '-' + splitdate[1]
    var gg = new Date(curr.setDate(x))
    var date_YYYY_MM_DD = gg.getFullYear() + '-' + (gg.getMonth() + 1) + '-' + gg.getDate()
    return [returndate, firstdate, date_YYYY_MM_DD]
  }

  captureChange = (event) => {
    const { timeSheetEntry } = this.props
    const { change_timeSheet } = this.props
    let varDaySum = this.state.daySum
    let changedVal = event.target.value
    if (changedVal==='' || changedVal===' '){
      changedVal = 0
    }
    if (changedVal >= 0 && changedVal <= 24){
      let coord = parseInt(event.target.name)
      let i = parseInt(coord/10)
      let j = coord%10
      let prevVal = timeSheetEntry[i].hours[j]
      let diff = changedVal - prevVal
      varDaySum[j] = parseFloat(varDaySum[j]) + parseFloat(diff)
      change_timeSheet(i, j, changedVal)
      this.setState({
        daySum: varDaySum,
      })
    } 
    else{
      alert('not a valid value')
    }
  }

  captureBlur = (event) => {
    event.preventDefault()
    const { change_timeSheet } = this.props
    let coord = parseInt(event.target.name)
    let i = parseInt(coord/10)
    let j = coord%10
    let changedVal = parseFloat(event.target.value).toFixed(1)
    if (changedVal==='' || changedVal===' '){
      changedVal = 0
    }
    change_timeSheet(i, j, changedVal)
  }

  add_td(col, timeSheetItem) {
    let td_el = []
    for (let i=0; i<=6; i++){
      td_el.push( <td><input
                        className='hours form-control' onChange={this.captureChange}
                        onBlur={this.captureBlur} name={col.toString() + i}
                        type='text' value={timeSheetItem.hours[i]}
                      />
                  </td>)
    }
    return td_el
  }

  add_td_total() {
    const { daySum } = this.state
    let td_el = []
    for (let i=0; i<=6; i++){
      td_el.push( <td><input 
                        className='hours form-control' type='text' 
                        value={parseFloat(daySum[i]).toFixed(1)} 
                        readonly disabled
                      />
                  </td>)
    }
    return td_el
  }

  render () {
    const { timeSheetEntry } = this.props
    const { daySum } = this.state
    const { currWeek } = this.state
    return (
      <div className='container'>
        <div className='row'>
          <div className='table-responsive'>
            <table className='table table-striped' id='task-table'>
              <thead>
                <tr>
                  <th className='task'>Task #</th>
                  <th className='isbill'>Billable</th>
                  <th id='head-sat'>{currWeek[0]}</th>
                  <th id='head-sun'>{currWeek[1]}</th>
                  <th id='head-mon'>{currWeek[2]}</th>
                  <th id='head-tue'>{currWeek[3]}</th>
                  <th id='head-wed'>{currWeek[4]}</th>
                  <th id='head-thu'>{currWeek[5]}</th>
                  <th id='head-fri'>{currWeek[6]}</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody id='timesheet-table'>
                {timeSheetEntry.map((timeSheetItem, index) => {
                  return (
                    <tr>
                      <td>{timeSheetItem.taskid}</td>
                      <td><input
                            className='checkbill' type='checkbox'
                            readonly disabled 
                            defaultChecked={timeSheetItem.is_billable==='B'? true : false}
                          />
                      </td>
                      {this.add_td(index, timeSheetItem)}
                      <td className='total-task'>
                        <input
                          className='hours form-control'
                          type='text' value={parseFloat(parseFloat(timeSheetItem.hours[0]) + 
                            parseFloat(timeSheetItem.hours[1]) + parseFloat(timeSheetItem.hours[2]) +
                            parseFloat(timeSheetItem.hours[3]) + parseFloat(timeSheetItem.hours[4]) +
                            parseFloat(timeSheetItem.hours[5]) + parseFloat(timeSheetItem.hours[6])).toFixed(1)} 
                            readonly disabled
                        />
                      </td>
                    </tr>
                  )
                })}
                <tr id='total'>
                  <td className='task-total'>Total</td>
                  <td className='isbill' />
                  {this.add_td_total()}
                  <td><input className='hours form-control total-day' 
                      type='text' value={parseFloat(parseFloat(daySum[0]) + parseFloat(daySum[1]) + 
                        parseFloat(daySum[2]) + parseFloat(daySum[3]) + 
                        parseFloat(daySum[4]) + parseFloat(daySum[5]) + 
                        parseFloat(daySum[6])).toFixed(1)} readonly disabled
                      />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default SheetTable
