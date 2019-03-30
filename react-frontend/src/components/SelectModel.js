import React from "react";
import { InputGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { adder2 } from '../store/modules/addResult';


class SelectModel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      select : [false,false,false]
    };
  }
  
  handleChecked = (e) => {
    const { value2 } = this.props;
    
    let box = value2;
    if(value2[e.target.id] === false)
    {
      box[e.target.id] = true;
    }
    else
    {
      box[e.target.id] = false;
    }

    // REDUX //
		const { adder2 } = this.props;
		adder2(box);
    ///////

  }

  render() {

    return (
        <div>
            <label>Select Models</label>
            <InputGroup>
                <InputGroup.Prepend>
                  <Button>Mother</Button>
                  <InputGroup.Checkbox  onChange={this.handleChecked}
                                        checked={this.props.value2[0]}
                                        id={0}
                                        name="Mother"/>
                </InputGroup.Prepend>
                <InputGroup.Prepend>
                  <Button>Father</Button>
                  <InputGroup.Checkbox  onChange={this.handleChecked}
                                        checked={this.props.value2[1]}
                                        id={1}
                                        name="Father"/>
                </InputGroup.Prepend>
                <InputGroup.Prepend>
                  <Button>Son</Button>
                  <InputGroup.Checkbox  onChange={this.handleChecked}
                                        checked={this.props.value2[2]}
                                        id={2}
                                        name="Son"/>
                </InputGroup.Prepend>
            </InputGroup>
        </div>
    );
  }
}


let mapStateToProps = (state) => {
	return {
		value2 : state.addReducer.list2
	};
}

const mapDispatchToProps = dispatch => ({
	adder2: checkRes => dispatch( adder2(checkRes) )
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectModel);
