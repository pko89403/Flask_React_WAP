import React from "react";
import { InputGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { adder2 } from '../store/modules/addResult';
import { List } from 'immutable';

class SelectModel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      select : this.props.value2
    };
  }
  
  handleChecked = (e) => {
    console.log("SelectModel Checked");
    
    const { value2 } = this.props;
    
    
    let box = value2;
    box = box.toJS();
    if(value2[e.target.id] === false)
    {
      box[e.target.id] = true;
    }
    else
    {
      box[e.target.id] = false;
    }

    console.log(box);
    // REDUX //
    var boxList = List(box);
    const { adder2 } = this.props;
    adder2(boxList);
    ///////

    this.setState({
      select : box
    })

  }

  render() {

    return (
        <div>
            <label>Select Models</label>
            <InputGroup>
                <InputGroup.Prepend>
                  <Button>Mother</Button>
                  <InputGroup.Checkbox  onChange={this.handleChecked}
                                        checked={this.state.select[0]}
                                        id={0}
                                        name="Mother"/>
                </InputGroup.Prepend>
                <InputGroup.Prepend>
                  <Button>Father</Button>
                  <InputGroup.Checkbox  onChange={this.handleChecked}
                                        checked={this.state.select[1]}
                                        id={1}
                                        name="Father"/>
                </InputGroup.Prepend>
                <InputGroup.Prepend>
                  <Button>Son</Button>
                  <InputGroup.Checkbox  onChange={this.handleChecked}
                                        checked={this.state.select[2]}
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
