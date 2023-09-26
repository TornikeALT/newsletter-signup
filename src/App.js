import { useState, useRef } from 'react';
import listIcon from './images/icon-list.svg'
import signUp from './images/illustration-sign-up-desktop.svg'
import './index.css';

function App() {
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const emailInputRef = useRef(null);

  const handleEmailInput = (e) => {
    const emailValue = e.target.value;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailPattern.test(emailValue)) {
      setError(true);
      setShowModal(false);
    } else {
      setError(false);
      setEmail(emailValue)

    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const emptyInput = e.target.email.value.trim();

    if (error || emptyInput === '') {
      setShowModal(false)
      setError(true)
    }
    else {
      setShowModal(true);
    }

  }

  const handleDismiss = () => {
    setShowModal(false);
    if (emailInputRef.current) {
      emailInputRef.current.value = '';
    }
  }

  return (
    <div className="container">
      <div className={`wrapper ${showModal ? 'none' : ''}`}>
        <div className='content'>
          <h1 className='title'>Stay updated!</h1>
          <p>
            Join 60,000+ product managers receiving monthly updates on:
          </p>
          <ul className='services'>
            <li className='service'>
              <img src={listIcon} alt="list" />
              <span>Product discovery and building what matters</span>
            </li>
            <li className='service'>
              <img src={listIcon} alt="list" />
              <span>Measuring to ensure updates are a success</span>
            </li>
            <li className='service'>
              <img src={listIcon} alt="list" />
              <span>And much more!</span>
            </li>
          </ul>
          <form onSubmit={handleFormSubmit}>
            <div className='email_and_error_title'>
              <label htmlFor="email">Email adress</label>
              {error && <p className='error_title'>Valid email required</p>}
            </div>
            <input type="email" name="email" id="email" placeholder='email@company.com' onChange={handleEmailInput} className={error ? 'error' : ''} ref={emailInputRef} />
            <button className='subscribe_btn'>Subscribe to monthly newsletter</button>
          </form>
        </div>
        <div className='image_container'>
          <img src={signUp} alt="sign up" />
        </div>
      </div>
      {showModal &&
        <div className='modal'>
          <img src={listIcon} alt="ptichka" className='modal_icon' />
          <h2>Thanks for subscribing!</h2>
          <p>A confirmation email has been sent to
            <strong> {email}.</strong>
            <br />Please open it and click the button inside to confirm your subscription
          </p>
          <button className='dismiss_btn' onClick={handleDismiss}>Dismiss Message</button>
        </div>
      }
    </div>
  );
}

export default App;
