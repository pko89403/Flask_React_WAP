import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from "react-google-charts";
import './App.css'
import { Table } from 'react-bootstrap';

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
    let resList = [];


    if(this.state.load === true)
    {
      const { data } = this.state;
      
      for(var i = 0; i < data.length; i+=1 )  
      {  
        const val = data[i] * 100;
        const tmp = [i.toString(), val];
        arr.push(tmp);

        if(i % 2 === 0)
        {
          let tmpTable =  <tr>
                            <td>{i.toString()}</td>
                            <td>{Math.round(data[i] * 100)}</td>
                            <td>{(i+1).toString()}</td>
                            <td>{Math.round(data[i+1] * 100)}</td>
                          </tr>
          resList.push(tmpTable);
        }
      }
            
      
      graphVisual = <div>
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
                      <Table striped bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>Cuisine2</th>
                            <th>Classifiy1</th>
                            <th>Cuisine2</th>
                            <th>Classify2</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resList}
                        </tbody>
                      </Table>
                    </div>
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