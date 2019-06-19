import React from 'react';
import ReactDOM from 'react-dom';

const LoginForm = (props) => (
  <div id='login'>
    <form>
      <label htmlFor='username'>Username:</label><br></br>
      <input type="text" id='username' name="username" value={props.username} onChange={e => props.change(e)} placeholder='username' required></input><br></br>
      <label htmlFor='password'>Password:</label><br></br>
      <input type="password" id='password' name="password" onChange={e => props.change(e)} placeholder='password' minLength='8' required></input><br></br>
    </form>
    <button onClick={() => props.login(props.username, props.password)}>Login</button>
  </div>
);

export default LoginForm;