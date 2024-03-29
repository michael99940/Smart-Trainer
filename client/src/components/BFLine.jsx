import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';

const BFLine = (props) => {
  let data = {
    labels: [1,2,3,4,5,6,7,8,9,10,11],
    datasets: [
      {
        label: 'Body Fat Percentage',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: props.BFArr
      }
    ]
  };
  
  return (
    <div>
      <Line
        data={data}
        width={100}
        height={600}
        options={{
          maintainAspectRatio: false
        }} 
      />
    </div>
  );
};

export default BFLine;