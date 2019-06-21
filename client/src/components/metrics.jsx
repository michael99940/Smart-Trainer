import React from 'react';
import ReactDOM from 'react-dom';

const Metrics = (props) => {
  console.log(props);
  return (
    <div className='container'>
      <form>
        <div className='row'>
          <label htmlFor='goal' className='col-2'>Goal:</label>
          <select className='col-2' id='goal' name='goal' value={props.goal} onChange={e => props.change(e)} required>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Fat Loss">Fat Loss</option>
            <option value="General Fitness">General Fitness</option>
          </select>
        </div>
        <div className='row'>
          <label htmlFor='weight' className='col-2'>Weight:</label>
          <input className='col-2' type='number' id='weight' name='weight' step='0.1' min='0' value={props.weight} onChange={e => props.change(e)} required></input>
        </div>
        <div className='row'> 
          <label htmlFor='BF' className='col-2'>Body Fat Percentage:</label>
          <input className='col-2' type='number' id='BF' name='BF' step='0.1' value={props.BF} min='0' max='100' onChange={e => props.change(e)}></input>
        </div>
        <div className='row'>
          <label htmlFor='height' className='col-2'>Height:</label>
          <input className='col-2' type='number' id='height' name='height' step='0.1' min='0' value={props.height} onChange={e => props.change(e)}></input>
        </div>
        <div className='row'>
          <label htmlFor='gender' className='col-2'>Biological Gender:</label>
          <select className='col-2' id='gender' name='gender' value={props.gender} onChange={e => props.change(e)} required>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
      </form>
      <button className='row' onClick={props.submitMetrics}>Submit Metrics</button>
    </div>
  );
};

export default Metrics;