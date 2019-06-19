import React from 'react';
import ReactDOM from 'react-dom';

const Metrics = (props) => {
  console.log(props);
  return (
    <div id='Metrics'>
      <form>
        <label htmlFor='goal'>Goal:</label><br></br>
        <select id='goal' name='goal' value={props.goal} onChange={e => props.change(e)} required>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Fat Loss">Fat Loss</option>
          <option value="General Fitness">General Fitness</option>
        </select><br></br>
        <label htmlFor='weight'>Weight:</label><br></br>
        <input type='number' id='weight' name='weight' step='0.1' min='0' value={props.weight} onChange={e => props.change(e)}></input><br></br>
        <label htmlFor='BF'>Body Fat Percentage:</label><br></br>
        <input type='number' id='BF' name='BF' step='0.1' value={props.BF} min='0' max='100' onChange={e => props.change(e)}></input><br></br>
        <label htmlFor='height'>Height:</label><br></br>
        <input type='number' id='height' name='height' step='0.1' min='0' value={props.height} onChange={e => props.change(e)}></input><br></br>
        <label htmlFor='gender'>Biological Gender:</label><br></br>
        <select id='gender' name='gender' value={props.gender} onChange={e => props.change(e)} required>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select><br></br>
        <label htmlFor='DoB'>Date of Birth:</label><br></br>
        <input type='date' id='DoB' name='DoB' value={props.DoB} onChange={e => props.change(e)}></input><br></br>
      </form>
      <button onClick={props.submitMetrics}>Submit Metrics</button>
    </div>
  );
};

export default Metrics;