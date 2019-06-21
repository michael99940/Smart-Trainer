import React from 'react';
import ReactDOM from 'react-dom';

const LoginForm = (props) => (
  <div style={ props.displayLogin ? {display: 'block' } : {display: 'none'}}>
    <div className='container'>
      <b><u>Login:</u></b>
      <form>
        <div className='row'>
          <label htmlFor='username' className='col-2'>Username:</label>
          <input className='col-2' type="text" id='username' name="username" value={props.username} onChange={e => props.change(e)} placeholder='username' required></input>
        </div>
        <div className='row'>
          <label htmlFor='password' className='col-2'>Password:</label>
          <input className='col-2' type="password" id='password' name="password" onChange={e => props.change(e)} placeholder='password' minLength='8' required></input>
        </div>
      </form>
      <div className='row'>
        <div className='col-2 active' onClick={() => props.login(props.username, props.password)}>Login</div>
        <div className='col-2 cursor' onClick={() => props.toggleLogin()}>Sign Up</div>
      </div>
    </div>
  </div>
);

export default LoginForm;