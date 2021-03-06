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
    
    const { select } = this.state;
    let box = select; 

    if(select[e.target.id] === false)
    {
      box[e.target.id] = true;
    }
    else
    {
      box[e.target.id] = false;
    }

    // REDUX //
    const { adder2 } = this.props;
    adder2(List(box));
    ///////

    this.setState({
      select : box
    })
    console.log('redux dispath > change state : ', this.state.select);
  }

  render() {

    return (
        <div>
            <label>Select Models</label>
            <InputGroup>
                <InputGroup.Prepend>
                  <Button>BOW MODEL</Button>
                  <InputGroup.Checkbox  onChange={this.handleChecked}
                                        checked={this.state.select[0]}
                                        id={0}
                                        name="Mother"/>
                </InputGroup.Prepend>
                <InputGroup.Prepend>
                  <Button>CBOW MODEL</Button>
                  <InputGroup.Checkbox  onChange={this.handleChecked}
                                        checked={this.state.select[1]}
                                        id={1}
                                        name="Father"/>
                </InputGroup.Prepend>
                <InputGroup.Prepend>
                  <Button>EMBEDDING MODEL</Button>
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
