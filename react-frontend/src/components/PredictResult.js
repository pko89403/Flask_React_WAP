import React from "react";

class PredictResult extends React.Component {
  constructor(props){
     super(props);
     this.state = {
       data : this.props.predictList 
     };
  }

  render() {
    return (
      this.props.data
    );
  }
}

export default PredictResult;
