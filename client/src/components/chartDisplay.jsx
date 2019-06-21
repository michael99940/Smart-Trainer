import React from 'react';
import ReactDOM from 'react-dom';
import BFLine from './BFLine.jsx';
import WeightLine from './weightLine.jsx'

class chartDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BFArr: props.BFArr,
      weightArr: props.weightArr,
      showWeight: false
    };
    this.switchChart = this.switchChart.bind(this);
  }
  
  switchChart(input) {
    this.setState({
      showWeight: input
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className={`col-2 cursor ${this.state.showWeight ? 'active' : ''}`} onClick={() => this.switchChart(true)}>Body Weight Graph</div>
          <div className={`col-2 cursor ${this.state.showWeight ? '' : 'active'}`} onClick={() => this.switchChart(false)}>Body Fat Percentage Graph</div>
        </div>
        {this.state.showWeight ? < WeightLine weightArr={this.state.weightArr}/> : <BFLine BFArr={this.state.BFArr} />}
      </div>
    );
  }
}



export default chartDisplay;