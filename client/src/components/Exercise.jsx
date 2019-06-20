import React from 'react';
import ReactDOM from 'react-dom';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      frequency: props.frequency,
      description: props.description,
      demo: props.demo,
      showVid: false
    };

    this.showVid = this.showVid.bind(this);
  }

  showVid() {
    this.setState({
      showVid: !this.state.showVid
    });
  }

  render() {
    return(
      <div>
        <div className='exercise' onClick={() => this.showVid()}>
          <div>{this.state.name}</div>
          <div>{this.state.frequency}</div>
          <div>{this.state.description}</div>
        </div>
        <div className='video'>
          <iframe style={this.state.showVid ? {display: 'block'} : {display: 'none'}} width="560" height="315" src={this.state.demo} frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    );
  }
}



export default Exercise;