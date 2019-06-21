import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LoginForm from './components/login.jsx';
import Metrics from './components/metrics.jsx';
import SignUp from './components/signup.jsx';
import Exercise from './components/exercise.jsx';
import ChartDisplay from './components/chartDisplay.jsx';


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
      BFArr:[10.2, 10.3, 10.4, 10.3, 10.2, 10.1, 10.0, 9.9, 10.0, 9.8, 9.7],
      weightArr:[72.0, 72.1, 72.2, 72.3, 74.0, 72.0, 73.9, 72.0, 71.5, 71.4,71.3],
      exerciseData: [{name: 'test', frequency: '10 sets of 12', description: 'just lift it', demo: `https://www.youtube.com/embed/oGJr5N2lgsQ`}],
      displayLogin: true,
      test: 'test string'
    };
    this.login = this.login.bind(this);
    this.change = this.change.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.submitMetrics = this.submitMetrics.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
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

  toggleLogin() {
    this.setState({
      displayLogin: !this.state.displayLogin
    });
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
          displayLogin={this.state.displayLogin}
          login={this.login}
          change={this.change} 
          toggleLogin={this.toggleLogin}
        />
        <SignUp username={this.state.username} 
          password={this.state.password} 
          cPassword={this.state.cPassword}
          displayLogin={this.state.displayLogin}
          change={this.change}
          validatePassword={this.validatePassword}
          toggleLogin={this.toggleLogin}
        /> 
        <Metrics goal={this.state.goal} 
          change={this.change} 
          experience={this.state.experience}
          weight={this.state.weight}
          gender={this.state.gender}
          BF={this.state.BF}
          height={this.state.height}
          DoB={this.state.DoB}
          submitMetrics={this.submitMetrics}
        />
        <ChartDisplay BFArr={this.state.BFArr}
          weightArr={this.state.weightArr}
        />
        {this.state.exerciseData.map(exercise => 
          <Exercise demo={exercise.demo}
            name={exercise.name}
            frequency={exercise.frequency}
            description={exercise.description}
          />
        )}
      </div>
    );
  }
}
if (window !== undefined) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
