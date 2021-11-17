import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import { Redirect } from 'react-router-dom'
import Navbar from '../timesheet/navbar'

class Logout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      is_login: true,
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
    const endpoint='/api/auth/logout/'
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
                  is_login: false
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
    if (this.state.is_login == false) return (<Redirect to='/login/'/>)
  }
}

export default Login
