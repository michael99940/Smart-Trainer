import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LoginForm from './components/login.jsx';
import Metrics from './components/metrics.jsx';
import SignUp from './components/signup.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      experience: '',
      weight: 0,
      height: 0,
      gender: '',
      goal:'',
      BF: 0,
      DoB: '',
      ExerciseData: [],
      test: 'test string'
    };
    this.login = this.login.bind(this);
    this.change = this.change.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.submitMetrics = this.submitMetrics.bind(this);
  }

  login(username, password) {
    console.log('logging in');
    axios.get(`/login?username=${username}&password=${password}`)
      .then(results => {
        if(!results.length) {
          console.log('incorrect username or password');
          return;
        } else {
          console.log('logged in');
          return;
        }
      })
      .catch(error => console.log(error));
    //confirm user & password pair exists
    //then either reject or login
  }

  change(e) {
    let entry = new Object();
    console.log(this.state);
    entry[e.target.id] = e.target.value;
    this.setState(entry);
  }

  validatePassword(username, password, cPassword)  {
    console.log('validating Password');
    if (password !== cPassword) {
      console.log('no bueno');
      return;
    } else {
      axios.get(`/checkname?username=${username}`)
        .then(results => {
          if(results.length) {
            console.log('username taken');
            return;
          } else {
            axios.post(`/signup`, {
              username: username,
              password: password
            })
              .then(results => console.log(results))
              .catch(error => console.log(error));
          }
        })
        .catch(error => console.log(error));
      //confirm username not taken first then post signup
    }
  }

  submitMetrics() {
    console.log('submitting metrics');
    axios.post(`/metrics`, this.state)
      .then(results => console.log(results))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    //get cookies
  }

  render() {
    return (
      <div>
        <LoginForm username={this.state.username} 
          password={this.state.password} 
          login={this.login}
          change={this.change} />
        <SignUp username={this.state.username} 
          password={this.state.password} 
          cPassword={this.state.cPassword}
          change={this.change}
          validatePassword={this.validatePassword}/> 
        <Metrics goal={this.state.goal} 
          change={this.change} 
          experience={this.state.experience}
          weight={this.state.weight}
          gender={this.state.gender}
          BF={this.state.BF}
          height={this.state.height}
          DoB={this.state.DoB}
          submitMetrics={this.submitMetrics}/>
      </div>
    );
  }
}
if (window !== undefined) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
