import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';
import ToastMessenger, { useToasts } from '../Toast/ToastService';
import logo from '../../images/logo.png'
import './UserSignUp.css'

export default function UserSignUp() {
  // const squadLogo = [logo]
  const http = useAxios()
  const localStorageService = useLocalStorage()
  const navigate = useNavigate()
  const toast = useToasts();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    DOB: ''
  })
  const [isUsernameTaken, setIsUsernameTaken] = useState(true);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const DOBRef = useRef(null);
  const timeZoneRef = useRef(null);
  const skillLevelRef = useRef(null);
  const favGameIdRef = useRef(null);
  const mainGameIDRef = useRef(null);
  const timeoutRef = useRef(null);


  function attemptSignUp(formData) {
    http.createNewUser(formData)
      .then(results => {
        console.log(results)
        toast.success("Welcome Aboard Soldier!");
        localStorageService.saveUser(results.data.user)
        navigate('/')
      }).catch(err => {
        console.error(err);
        toast.error("Oops! Username exists! Try something else")
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
        <h1 className='signup-titleh1'>Welcome to SQUAD UP!</h1>
        <p>We need information to fill out your player card!</p>
        {/* <span className='sign-up-icon'><FontAwesomeIcon icon={faBiohazard} size="2x" /></span> */}
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
        </div>


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
        </div>

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
        <div className='skillLevel-input'>

          <select
            type="skillLevel"
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
            ref={skillLevelRef}
            placeholder="Skill Level"
            id="skillLevel"
            required>

            <option value="">Skill Level</option>
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
          </select>
        </div>

        <div className='favGameId-input'>

          <select
            type="favGameId"
            name="favGameId"
            value={formData.favGameId}
            onChange={handleChange}
            ref={favGameIdRef}
            placeholder="Main Game"
            id="favGameId"
            required>

            <option value="">Main Game</option>
            <option value="1">Warzone</option>
            <option value="2">Apex Legends</option>
            <option value="3">Fortnite</option>
          </select>
        </div>

        <div className='maingameID-input'>
          <input
            type="mainGameID"
            name="mainGameID"
            value={formData.mainGameID}
            onChange={handleChange}
            ref={mainGameIDRef}
            placeholder="Gamer Tag"
            id="mainGameID"
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
            Log In
          </Link>
        </div>
      </div>
      <ToastMessenger />
    </form>
  )
}
