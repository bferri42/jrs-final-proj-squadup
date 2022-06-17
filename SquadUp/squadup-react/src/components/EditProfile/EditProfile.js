import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import ToastMessenger, { useToasts } from '../Toast/ToastService';
import './EditProfile.css'

export default function UserSignUp() {
  const http = useAxios()
  const localStorageService = useLocalStorage()
  const navigate = useNavigate()
  const toast = useToasts();
  const user = localStorageService.getUser();
  const [updateForm, setUpdateForm] = useState({...user})

  const timeZoneRef = useRef(null);
  const skillLevelRef = useRef(null);
  const favGameIdRef = useRef(null);
  const mainGameIDRef = useRef(null);
  const timeoutRef = useRef(null);

  function editInfo(updateForm) {
    http.editUserInfo(updateForm)
      .then(results => {
        console.log(results)
        toast.success("Information updated!");
        navigate('/')
      }).catch(err => {
        console.error(err);
        toast.error("Unable to update information")
      }
      )
  }


  function handleChange(e) {
    let value = e.target.value
    let name = e.target.name


    setUpdateForm({
      ...updateForm,
      [name]: value
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    editInfo(updateForm);
  }


return (
  <form className="sign-up-form"
  onSubmit={handleFormSubmit}
  >
    <div className='sign-up-title'>
      <h1 className='signup-titleh1'>Update Your Player Card!</h1>
      <p>We need information to update your player card!</p>
    </div>
    <div className='input-container'>
      <div className='TZ-input'>
        <input
          type="timeZone"
          name="timeZone"
          value={updateForm.timeZone}
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
          value={updateForm.skillLevel}
          onChange={handleChange}
          ref={skillLevelRef}
          placeholder="Skill Level"
          id="skillLevel"
          required>

          <option value="">Rank</option>
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>
      </div>

      <div className='favGameId-input'>
        <select
          type="favGameId"
          name="favGameId"
          value={updateForm.favGameId}
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
          value={updateForm.mainGameID}
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
      >Update My Account!
      </button>

    </div>
    <ToastMessenger />
  </form>
)
}
