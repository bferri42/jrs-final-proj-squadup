import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';
import './UserSignUp.css'

export default function UserSignUp() {

  const http = useAxios()
  const localStorageService = useLocalStorage()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    DOB: ''
  })
  const [isUsernameTaken, setIsUsernameTaken] = useState(true);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const DOBRef = useRef(null);
  const firstNameRef = useRef(null);
  const timeZoneRef = useRef(null);
  const timeoutRef = useRef(null);


  function attemptSignUp(formData) {
    http.createNewUser(formData)
      .then(results => {
        console.log(results)
        alert("Account creation was a success!")
        localStorageService.saveUser(results.data.user)
        navigate('/')
      }).catch(err => {
        console.error(err);
        alert("Oops! Username exists! Try something else")
      }
      )
  }


  function handleChange(e) {
    let value = e.target.value
    let name = e.target.name


    setFormData({
      ...formData,
      [name]: value
    });
  }


  function handleFormSubmit(e) {
    e.preventDefault()
    if (formData.username && formData.password && checkIfUsernameIsTaken) {
      attemptSignUp(formData);
    }
  }
  // -----CHECK IF USERNAME IS TAKEN --------------

  function checkIfUsernameIsTaken() {
    http.getUserbyUsername(formData.username)
      .then((res) => {
        console.log('the get route by username was sent! It returned this')
        console.log(formData.username)
        setIsUsernameTaken(true)
      })
      .catch((err) => {
        console.log(err);
        let statusCode = err.response.statusCode
        if (statusCode == 404) {
          setIsUsernameTaken(false)
        } else if (err.response.status == 401) {
          setIsUsernameTaken(true)
        }
      })
  }

  useEffect(() => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => { checkIfUsernameIsTaken() }, 500)
  }, [formData.username])

  useEffect(() => {
    usernameRef.current.focus()
  }, [])


  return (
    <form className="sign-up-form"
      onSubmit={handleFormSubmit}>
      <div className='sign-up-title'>
      <h1>Welcome to Squad Up!</h1>
      <span className='sign-up-icon'><FontAwesomeIcon icon={faBiohazard} size="2x"/></span>
      </div>
      <div className='input-container'>
        <div className='sign-up-input'>
          <label htmlFor="username">
          </label>
          <input
            type="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            ref={usernameRef}
            placeholder="Username"
            id="username"
            required
          />
        </div>

        <div className='password-input'>
          <label htmlFor="password">
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            ref={passwordRef}
            placeholder="Password"
            id="password"
            required
          />
          <div className='firstName-input'>
            <input
              type="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              ref={firstNameRef}
              placeholder="First Name"
              id="firstName"
              required
            />
            <div className='DOB-input'>
              <input
                type="DOB"
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
                ref={DOBRef}
                placeholder="DOB YYYY-MM-DD"
                id="DOB"
                required
              />
              <div className='TZ-input'>
                <input
                  type="timeZone"
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                  ref={timeZoneRef}
                  placeholder="Time Zone"
                  id="timeZone"
                  required
                />


              </div>
              <br />
              <button
                type="submit"
                className='sign-up-button'
              >Create my account!
              </button>
              <br />
              <br />
              <div className='cta-switch-container' >
                <p >Already a member?</p>
                <Link to="/login" className='link'>
                  Get logged in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
