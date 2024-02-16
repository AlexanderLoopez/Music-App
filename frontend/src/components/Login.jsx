import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate();

  const onButtonClick = () => {

    setEmailError('')
    setPasswordError('')

    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === password) {
      setPassword('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be a 8 characters or longer')
      return
    }

    checkAccountExists(accountExists => {
      if (accountExists)
      logIn()
      else 
      if (window.confirm('An account does not exist with this email address:' + email + '. Do you want to create a new account?')) {
        logIn()
      }
    })

  }

  const checkAccountExists = (callBack) => {
    fetch('http://localhost:3080/check-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({email})
    })
    .then(r => r.json())
    .then(r => {
          callBack(r?.userExists)
    })
  }

  const logIn = () => {
    fetch('http://localhost:3080/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(r => r.json())
    .then(r => {
        if ('success' === r.message) {
          localStorage.setItem('user', JSON.stringify({email, token: r.token}))
          props.setLoggedIn(true)
          props.setEmail(email)
          navigate('/')
        } else {
          window.alert('Wrong email or password')
        }
    })
  }

  return (
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
        <label className='errorLabel'>{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input 
          value={password}
          placeholder='Enter your password here'
          onChange={ev => setPassword(ev.target.value)}
          className={'inputBox'} />
        <label className='errorLabel'>{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input 
          className={'inputButton'}
          type='button'
          onClick={onButtonClick}
          value={'Log in'}/>
      </div>
    </div>
  )
}

export default Login;