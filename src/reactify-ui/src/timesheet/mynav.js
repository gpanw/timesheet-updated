import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'whatwg-fetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faBackward, 
         faCalendar, faCaretDown, 
         faCaretUp } from '@fortawesome/free-solid-svg-icons'
import NavLi from './navli'
import { Redirect } from 'react-router-dom'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDropDown: false,
      nav_li_value: ['Timesheet', 'Prior Time', 'Leave Tracker'],
      nav_li_link: ['/react/timesheet/', '/react/timesheet/prior', '/react/leave'],
      nav_li_icon: [faClock, faBackward, faCalendar ],
      user: null,
      email: null,
      profile_photo: null,
      is_login: true,
    }
  }

  componentDidMount () {
    this.getUserInfo()
    document.addEventListener('click', this.handleClick, false)
  }

  handleClick = (event) => {
    if (this.node.contains(event.target)) {
      return
    }
    if (this.state.showDropDown){
      this.setState({
        showDropDown: !this.state.showDropDown
      })
    }
  }

  getUserInfo () {
    this.fetchApi('/api/user/reports/userprofile/')
  }

  fetchApi(endpoint) {
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
        thisComp.setState({
          user: responseData[0].user_id.username,
          email: responseData[0].user_id.email,
          profile_photo: responseData[0].profile_photo,
        })
      }).catch(function (error) {
        console.log('error', error)
      })

  }

  inactiveProfile = (event) => {
    if (this.node.classList.contains('active')){
      this.node.classList.remove('active')
    }
  }

  activeProfile = (event) => {
    console.log(this.node.classList)
    this.node.className += ' active' 
  }

  toggle_dropDown = (event) => {
    event.preventDefault()
    this.setState({
      showDropDown: !this.state.showDropDown
    })
  }

  logout = (event) => {
    event.preventDefault()
    let thisComp = this
    const lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/api/auth/logout/', lookupOptions)
      .then(function (response) {
        if (response.status==200) {
          thisComp.setState({
            is_login: false
          })
        }
        return response.json()
      }).then(function (responseData) {
        console.log(responseData)
      }).catch(function (error) {
        console.log('error', error)
      })
  }

  render () {
    var { nav_li_value, 
          nav_li_icon, 
          nav_li_link,
          user,
          email,
          profile_photo } = this.state
    if (this.state.is_login == false) return (<Redirect to='/login'/>)
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
            { nav_li_value.map((nav_item, index) => {
              return (
                  <NavLi value={nav_item} 
                         icon={nav_li_icon[index]} 
                         linkname={nav_li_link[index]}
                         inactiveProfile={this.inactiveProfile} 
                  />
                )
            })}
            <li className='nav-item dropdown' onClick={this.toggle_dropDown} 
                ref={node=>this.node=node}>
              <a>
                <span>
                  <img
                    src={profile_photo}
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
                        src={profile_photo}
                        height='48' width='48' className='profile-pic rounded-circle avatar float-left'
                      />
                    </span>
                    <span><p class='avatar-name'>{ user }</p>
                          <p class='avatar-name'>{ email }</p>
                    </span>
                  </a>
                </li>
                <li class='profile-dropdown card-footer'>
                  <div onClick={this.activeProfile}>
                    <Link
                      maintainScrollPosition={false} 
                      to={{
                        pathname: '/react/profile/',
                        state: { fromDashboard: false }
                        }}
                    >My Profile</Link>
                    <a href="" class='float-right' 
                       role='button' onClick={this.logout}>Logout</a>
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
