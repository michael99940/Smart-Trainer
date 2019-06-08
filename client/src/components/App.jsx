import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      experience: '',
      weight: 0,
      height: 0,
      gender: '',
      'Body Fat Percentage': 0
      }
    this.login = this.login.bind(this);
  }

  login(username, password) {
    axios.get(`/login?username=${username}&password=${password}`)
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>Hello World!</div>
    )
  }
}
export default App;