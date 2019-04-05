import React from "react";
import Chart from "react-google-charts";
import { connect } from 'react-redux';

const databaseURL = "https://flaskreactdb.firebaseio.com/geochart.json";

class World extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data : null,
      load : false,
      gTable : {}
    };
  }

	async componentDidMount() {
    this.loadTable(databaseURL);
  }

  componentWillReceiveProps(nextProps) {    
     if(nextProps.value !== this.state.value) {
        this.setState({data : nextProps.value,
                       load : true });
     }
  }

  loadTable = async (databaseURL) =>  {await fetch(databaseURL).then(response => {
                                        return response.json();
                                      }).then(result => {
                                        this.setState({
                                          gTable : result
                                        })
                                      });
  }

  render() {
    let arr = [["Country", "Popularity"]];
    let graphVisual = '';
    
    if(this.state.load === true)
    {
      const { data } = this.state;
      
      for(var i = 0; i < data.length; i++)
      {
        const val = Math.round(data[i] * 100);
        const tmp = [this.state.gTable[i], val];
        if(val > 1){ arr.push(tmp); }
      }
    }

    graphVisual = <Chart  chartType="GeoChart" 
                            width="100%" 
                            height="5%"
                            data={arr} 
                            options = {{  colorAxis: {colors: ['white', 'green']},
                                          backgroundColor: '#00a0ff',
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
