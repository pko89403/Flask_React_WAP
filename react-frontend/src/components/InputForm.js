import React from 'react';
import {
  Form,
  Button,
  Col,
} from 'react-bootstrap';

class InputForm1 extends React.Component {
   state = { country: '' }

   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      });
   }

   handleSubmit = (e) => {
	   e.preventDefault();
	   this.props.onCreate(this.state); // 상태 값을 부모에게 전달???
	   this.setState({
	      country: ''
      });
   }

   handleClear = (e) => {
      e.preventDefault();
      this.setState({
         country: ''
      })
   }

   render() {
      return (
	         <Form onSubmit={this.handleSubmit} onReset={this.handleClear}>
               <Form.Row>
                  <Form.Label>Input ingredient list</Form.Label>
                  <Form.Control  as="textarea"
                                 required
                                 variant="dark"
                                 placeholder="Tomato, Green Tea, olive oil"
                                 value={this.state.country}
                                 onChange={this.handleChange}
                                 name="country"/>
                  <Form.Control.Feedback type="invalid">
                     Please provide a valid input.
                  </Form.Control.Feedback>
               </Form.Row>
               <br></br>
               <Form.Row>
                  <Form.Group as={Col}>
                     <Button variant="dark"  type="submit"> 등 록 </Button>
                  </Form.Group>
                  <Form.Group as={Col}>
                     <Button variant="danger" type="reset"> 취 소 </Button>
                  </Form.Group>
               </Form.Row>
            </Form>
     );
   }
}

export default InputForm1;
