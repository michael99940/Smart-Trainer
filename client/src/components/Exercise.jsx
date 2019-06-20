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
      <div className="container container-exercise">
        <div className="row" onClick={() => this.showVid()}>
          <div className="col-sm">{this.state.name}</div>
          <div className="col-sm">{this.state.frequency}</div>
          <div className="col-sm">{this.state.description}</div>
        </div>
        <div className="row">
          <iframe className="col-sm" style={this.state.showVid ? {display: 'block'} : {display: 'none'}} width="560" height="315" src={this.state.demo} frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    );
  }
}



export default Exercise;