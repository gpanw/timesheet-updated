import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import JumboTron from '../timesheet/jumbotron'
import { Redirect } from 'react-router-dom'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      is_login: true,
      user: null,
      modal_open: false,
      image: null,
    }
  }

  componentDidMount () {
    this.getUserInfo()
  }

  change_pic = (event) => {
    this.setState({
      modal_open: true,
    })
  }

  toggle_modal = (event) => {
    this.setState({
      modal_open: !this.state.modal_open,
    })
  }

  handleImageChange = (event) => {
    event.preventDefault()
    this.setState({
      image: event.target.files[0]
    })
  }

  uploadImage = (event) => {
    event.preventDefault()
    let form_data = new FormData();
    form_data.append('profile_photo', this.state.image, this.state.image.name)
    const csrfToken = cookie.load('csrftoken')
    let thisComp = this
    if (csrfToken !== undefined) {
      let lookupOptions = {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'X-CSRFToken': csrfToken
            },
            body: form_data,
            credentials: 'include'
      }
      fetch('/api/user/reports/userprofile/post/image/', lookupOptions)
          .then(function(response){
            if (response.status==403) {
                thisComp.setState({
                  is_login: false
                })}
            return response.json()
          }).then(function(responseData){
              let res_user = thisComp.state.user
              res_user.profile_photo = responseData['profile_photo']
              thisComp.setState({
                user : res_user
              })
              console.log(responseData['profile_photo'])
          }).catch(function(error){
              console.log("error", error)
              alert("An error " + error + " occured, please try again later.")
          })
      } 
  }

  getUserInfo () {
    this.fetchApi('/api/user/reports/userprofile/')
  }

  fetchApi (endpoint) {
    const thisComp = this
    const lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        if (response.status == 403) {
          thisComp.setState({
            is_login: false
          })
        }
        return response.json()
      }).then(function (responseData) {
        thisComp.setState({
          user: responseData[0]
        })
      }).catch(function (error) {
        console.log('error', error)
      })
  }

  render () {
    var { user } = this.state
    if (this.state.is_login == false) return (<Redirect to='/login' />)
    return (
      <div>
        <div className='jumbotron' id='leave-jumbotron'>
          <div className='container' />
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='userprofile container-fluid box-tag'>
                <div className='row'>
                  <div className='col-md-7'>
                    <div>
                      <img
                        src={user === null ? '' : user.profile_photo}
                        height='80%' width='80%' className='profile-pic'
                      />
                      <span className='glyph-custom-nav-p profile-pic-glyph'
                            onClick={this.change_pic}>
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    </div>
                    <div className='user-name userprofile-large'>
                      {user === null ? '' : user.user_id.first_name + ' ' + user.user_id.last_name}
                    </div>
                    <div className='user-role'>
                      {user === null ? '' : user.user_role + ' ' + user.user_skill}
                    </div>
                  </div>
                  <div className='col-md-5'>
                    <h4>
                  Contact Info:
                    </h4>
                    <div className='user-email'>
                      {user === null ? '' : user.user_id.email}
                    </div>
                    <div className='user-mobile'>
                      {user === null ? '' : user.user_mobile}
                    </div>
                    <div className='user-location'>
                      {user === null ? '' : user.user_location}
                    </div>
                    <hr />
                    <h4>
                  Project Info:
                    </h4>
                    <div className='user-project'>
                  Project Name:  {user === null ? '' : user.project}
                    </div>
                    <div className='user-manager'>
                  Manager:  {user === null ? '' : user.manager_id}
                    </div>
                    <div className='user-joinedon'>
                  Joined On:  {user === null ? '' : user.date_joined}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='userprofile container-fluid'>
                <div className='row'>
                  <div className='col-md-12'>
                    <h4>
                  Leave Balance
                    </h4>
                    <table className='table table-striped' id='leave-profile'>
                      <tbody id='leave-table'>
                        <tr>
                          <th>CL (in hrs)</th>
                          <th>EL (in hrs)</th>
                        </tr>
                        <tr>
                          <td className='balance-casual'> {user === null ? '' : user.casual_leave} </td>
                          <td className='balance-earned'> {user === null ? '' : user.earned_leave} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal isOpen={this.state.modal_open} toggle={this.toggle_modal}>
            <ModalHeader toggle={this.toggle_modal}>Update Profile Picture</ModalHeader>
            <ModalBody>
              <img
                src={user === null ? '' : user.profile_photo}
                className='change-profile-img'
              />
            </ModalBody>
            <ModalFooter>
              <div className='container-fluid'>
                <form onSubmit={this.uploadImage}>
                  <input type="file"
                         id="image"
                         accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
                  <Button className='float-right' color='primary'>Upload</Button>
                </form>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Profile
