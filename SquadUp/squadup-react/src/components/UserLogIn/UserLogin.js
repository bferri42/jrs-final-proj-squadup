import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useAxios } from '../../services/axios.service';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../../services/localstorage.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';
import ToastMessenger, { useToasts } from '../Toast/ToastService';
import './UserLogin.css'

export default function UserLogin() {

  const localStorageService = useLocalStorage()
  const http = useAxios()
  var navigate = useNavigate();
  const toast = useToasts();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const usernameRef = useRef(null);
  const passwordRef = useRef(null)

  function handleChange(e) {
    let value = e.target.value
    let name = e.target.name

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function attemptLogIn() {
    setIsLoading(true)
    if (formData.username && formData.password) {
      http.login(formData)
        .then(results => {
          console.log(results.data)
          toast.success("Welcome Back Soldier!");
          localStorageService.saveUser(results.data.user);
          navigate('/')
        }).catch(err => {
          setIsLoading(false)
          console.log(err)
          toast.error("Username or password is incorrect :(");
          setFormData({ username: '', password: '' });
        })
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      attemptLogIn()
    }, 1000)
  }

  useEffect(() => {
    usernameRef.current.focus()
  }, [])



  return (
    <form className="login-form"
      onSubmit={handleFormSubmit}>
      <div className='login-title'>
        <h1> Welcome to SQUAD UP! </h1>
        <h2>Sign in to continue</h2>
        <span className='log-in-icon'><FontAwesomeIcon icon={faBiohazard} size="2x" /></span>
      </div>
      <div className='login-input-container'>
        <div className='login-input'>
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
        </div>
        <br />
        <button
          type="submit"
          className='login-button'
        >
          Log In
        </button>
        <br />
        <br />
        <div className="cta-switch-container">
          <p>Not a member?</p>
          <Link to="/signup" className='link'>
            Sign up now
          </Link>
        </div>
      </div>
      <ToastMessenger />
    </form>
  )
}

