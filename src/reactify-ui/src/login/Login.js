import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import { Redirect } from 'react-router-dom'
import Navbar from '../timesheet/navbar'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userid: null,
      password: null,
      is_login: false,
    }
  }

  onChangeInput = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitLogin = (event) => {
    event.preventDefault()
    let data = {'username': this.state.userid,
            'password': this.state.password}
    const csrfToken = cookie.load('csrftoken')
    let thisComp = this
    const endpoint='/api/auth/login/'
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
            if (response.status==200) {
                thisComp.setState({
                  is_login: true
                })}
            return response.json()
          }).then(function(responseData){
              console.log(responseData)
          }).catch(function(error){
              console.log("error", error)
              alert("An error " + error + " occured, please try again later.")
          })
      } 
  }

  render () {
    if (this.state.is_login == true) return (<Redirect to='/react/timesheet'/>)
    return (
      <div>
        <div className='homepage-message'>
          <div className='container'>
            <div className='row'>
              <form className='form-signin signinpage offset-sm-3 col-xs-12 col-sm-6' method='POST'>
                <h2 className='form-signin-heading'>OTes Sign In</h2>
                <hr />
                <label for='inputEmail' className='sr-only'>Email address</label>
                <input 
                  type='text' className='form-control login-input' 
                  name='userid' placeholder='UserId' onChange={this.onChangeInput}
                  required autofocus 
                />
                <label for='inputPassword' className='sr-only'>Password</label>
                <input 
                  type='password' className='form-control login-input' 
                  name='password' placeholder='Password' onChange={this.onChangeInput}
                  required 
                />
                <div className='form-submit'>
                  <button className='btn btn-md btn-success btn-block login-btn' 
                        type='submit' onClick={this.submitLogin}>
                      Submit
                  </button>
                  <div className='error' />
                </div>
                <a className='pull-right' id='reset-password' href='/password_reset'>Reset Password</a>
                <br />
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
