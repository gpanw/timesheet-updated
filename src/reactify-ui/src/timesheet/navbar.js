import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faBackward, 
         faCalendar, faCaretDown, 
         faCaretUp } from '@fortawesome/free-solid-svg-icons'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDropDown: false
    }
  }

  toggle_dropDown = (event) => {
    event.preventDefault()
    this.setState({
      showDropDown: !this.state.showDropDown
    })
  }

  render () {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark'>
        <a className='navbar-brand' href='/timesheet'>
          <span><img
            className='img-responsive'
            src='/static/our_static/img/logo.gif' height='30' width='30'
          />
          </span>
          <span>OTes</span>
        </a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ml-auto'>
            <li className={this.props.title === 'Time Sheet'
              ? 'nav-item active' : 'nav-item'}
            >
              <Link
                maintainScrollPosition={false} to={{
                  pathname: '/react/timesheet/',
                  state: { fromDashboard: false }
                }}
              >
                <p className='glyph-custom-nav-p'><FontAwesomeIcon icon={faClock} /></p>
                <div>Timesheet</div>
              </Link>
            </li>
            <li className={this.props.title === 'Time Adjustment'
              ? 'nav-item active' : 'nav-item'}
            >
              <Link
                maintainScrollPosition={false} to={{
                  pathname: '/react/timesheet/prior',
                  state: { fromDashboard: false }
                }}
              >
                <p className='glyph-custom-nav-p'>
                  <FontAwesomeIcon icon={faBackward} />
                </p>
                <div>Prior Time</div>
              </Link>
            </li>
            <li className={this.props.title === 'Leave Tracker'
              ? 'nav-item active' : 'nav-item'}
            >
              <Link
                maintainScrollPosition={false} to={{
                  pathname: '/react/timesheet/prior',
                  state: { fromDashboard: false }
                }}
              >
                <p className='glyph-custom-nav-p'><FontAwesomeIcon icon={faCalendar} /></p>
                <div>Leave Tracker</div>
              </Link>
            </li>
            <li className='nav-item dropdown' onClick={this.toggle_dropDown}>
              <a>
                <span>
                  <img
                    src='/media/profilepics/images.png'
                    height='38' width='38' className='profile-pic rounded-circle'
                  />
                </span>
                <span className='glyph-custom-nav-p'>
                  {this.state.showDropDown ? <FontAwesomeIcon icon={faCaretUp} />
                           : <FontAwesomeIcon icon={faCaretDown} />}
                </span>
              </a>
              <ul className={this.state.showDropDown ? 'dropdown-menu show-dropdown-menu' :
                          'dropdown-menu'}>
                <li className='profile-dropdown'>
                  <a className='avatar-a'>
                    <span>
                      <img
                        src='/media/profilepics/images.png'
                        height='48' width='48' className='profile-pic rounded-circle avatar float-left'
                      />
                    </span>
                    <span><p class='avatar-name'>current_user</p>
                          <p class='avatar-name'>current_user.email</p>
                    </span>
                  </a>
                </li>
                <li class='profile-dropdown card-footer'>
                  <div>
                    <a href='/profile' id='profile' role='button'>My Profile</a>
                    <a href='/logout' class='float-right' role='button'>Logout</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
