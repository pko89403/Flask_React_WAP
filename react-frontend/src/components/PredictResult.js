import React, { Component } from 'react';
import { connect } from 'react-redux';


class PredictResult extends Component {
  constructor(props)
  {
    super(props);
    this.state =  {
      data :  JSON.stringify(this.props.value)
    };
  }




  componentWillReceiveProps(nextProps) {    
    if(nextProps.value !== this.state.value) {
       this.setState({data : JSON.stringify(nextProps.value)});
    }
  }

 

  render() {
    console.log(this.state.data);
    return (
      <div>
        <p>{this.state.data}</p>        
      </div>
    );
  }
}


let mapStateToProps = (state) => {
	return {
		value : state.addReducer.list
	};
}

export default connect( mapStateToProps )( PredictResult );
