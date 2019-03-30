import React from "react";
import { InputGroup, Button } from 'react-bootstrap';

class SelectModel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      select : [false,false,false]
    };
  }

  handleChecked = (e) => {
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

    this.setState({
      select : box
    });
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

export default SelectModel;
