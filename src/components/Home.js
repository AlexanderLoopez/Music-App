import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();
  
    const onButtonClick = () => {
  
    }
  
    return(
      <div className='mainContainer'>
        <div className={'titleContainer'}>
          <div>Welcome!</div>
        </div>
        <div>
          This is the home page.
        </div>
        <div className={'buttonContainer'}>
          <input 
            className={'inputButton'}
            type='button'
            onClick={onButtonClick}
            value={loggedIn ? 'Log Out' : 'Log In'} />
            {(loggedIn ? <div>
              Your email addres is {email}
              </div> : <div/>)}
        </div>
      </div>
    )
  }
  
  export default Home