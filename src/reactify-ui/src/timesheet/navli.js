import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NavLi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: false
    }
  }

  onClick_li = (event) => {
    event.preventDefault()
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render () {
    const { value } = this.props
    const { icon } = this.props
    const { linkname } = this.props
    return (
        <li className='nav-item' onClick={this.props.inactiveProfile}>
              <NavLink
                maintainScrollPosition={false} 
                to={{
                  pathname: linkname,
                  state: { fromDashboard: false }
                }}
                activeClassName="active"
                exact
              >
                <p className='glyph-custom-nav-p'><FontAwesomeIcon icon={icon} /></p>
                <div>{value}</div>
              </NavLink>
        </li>
    )
  }
}

export default NavLi
