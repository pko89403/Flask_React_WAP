import React from "react";
import Chart from "react-google-charts";

let geo_Header = [["Country", "Popularity"]];

const options = { colorAxis: {colors: ['black']},
                  legend: "none" };


class World extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data : geo_Header.concat(this.props.appData) 
    };
  }

  componentWillReceiveProps(nextProps) {    
     if(nextProps.appData !== this.props.appData) {
        this.setState({data : this.state.data.concat(nextProps.appData)});
     }
  }

  render() {
     return (
        <Chart  chartType="GeoChart" 
                width="100%" 
	              height="5%"
	              data={this.state.data} 
	              options={options} />
    );
  }
}

export default World;