import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from "react-google-charts";
import './App.css'
class PredictResult extends Component {
  constructor(props)
  {
    super(props);
    this.state =  { data : null,
                    load : false 
                  };
  }

  componentWillReceiveProps(nextProps) {    
    if(nextProps.value !== this.state.value) {
       this.setState({data : nextProps.value,
                      load : true });
    }
  }

  render() {

    let arr = [["Country", "Popularity"]];
    let graphVisual = '';

    if(this.state.load === true)
    {
      const { data } = this.state;
      for(var i = 0; i < data.length; i+=1 )  
      {  
        const tmp = [i.toString(), data[i]* 100];
        arr.push(tmp);
      }

      graphVisual =
      <Chart  width={'100%'}
              height={'1%'}
              chartType="Bar"
              data={arr}
              options={{
                title : 'Classification Result',
                chartArea : { width: '100%' },
                hAxis : {
                  minValue: 0,
                  maxValue: 100,
                },
                bar : { groupWidth : '50%'},
                legend : { position : 'none'},
              }}
      />
    }

    return (
      <div>{graphVisual}</div>
    );
  }
}

let mapStateToProps = (state) => {
	return {
		value : state.addReducer.list
	};
}

export default connect( mapStateToProps )( PredictResult );