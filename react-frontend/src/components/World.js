import React from "react";
import Chart from "react-google-charts";
import { connect } from 'react-redux';

/*
const REFERENCE = [ 'brazilian', 'british', 'cajun_creole', 'chinese', 'filipino', 
                    'french', 'greek',  'indian', 'irish',  'italian',  
                    'jamaican', 'japanese', 'korean', 'mexican', 'moroccan', 
                    'russian', 'southern_us', 'spanish', 'thai', 'vietnamese']
*/
const TABLE = [ 'Brazil', 'United Kingdom of Great Britain and Northern Ireland', 'United States of America', 'China', 'Philippines', 
                'France', 'Greece',  'India', 'Ireland',  'Italy',  
                'Jamaica', 'Japan', 'Korea (Republic of)', 'Mexico', 'Morocco', 
                'Russia', 'United States of America', 'Spain', 'Thailand', 'Viet Nam']


class World extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data : null,
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
      
      for(var i = 0; i < data.length; i++)
      {
        const val = data[i] * 100;
        const tmp = [TABLE[i], val];
        if(val > 1){ arr.push(tmp); }
      }
    }

    graphVisual = <Chart  chartType="GeoChart" 
                            width="100%" 
                            height="5%"
                            data={arr} 
                            options = {{  colorAxis: {colors: ['#e7711c', '#4374e0']},
                                          legend: "none" 
                            }}/>
                  

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

export default connect( mapStateToProps )( World );