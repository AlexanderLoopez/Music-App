import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate();

  const onButtonClick = () => {
    //Function for later
  }

  return(
    <div className='mainContainer'>
      <div className='tittleContainer'>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input 
          value={email}
          placeholder='Enter your email here'
          onChange={ev => setEmail(ev.target.value)}
          className={'inputBox'} />
        <label className='errLabel'>{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input 
          className={'inputButton'}
          type='button'
          onClick={onButtonClick}
          value={'Log in'} />
      </div>
    </div>
  )
}

export default Login;