import React from 'react';
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Col,
  Container
} from 'react-bootstrap';

class InputForm1 extends React.Component {
   state = {
      country: '',
      value: ''
   }

   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      });
   }

   handleSubmit = (e) => {
	   e.preventDefault();
	   this.props.onCreate(this.state); // 상태 값을 부모에게 전달???
	   this.setState({
	      country: '',
         value: ''
      });
   }

   handleClear = (e) => {
      e.preventDefault();
   }

   render() {
      return (
         <Container>
	         <Form onSubmit={this.handleSubmit}>
               <Form.Row>
                  <Form.Label>state.country</Form.Label>
                  <Form.Control  as="textarea"
                                 required
                                 variant="dark"
                                 placeholder="Country"
                                 value={this.state.country}
                                 onChange={this.handleChange}
                                 name="country"/>
                  <Form.Control.Feedback type="invalid">
                     Please provide a valid input.
                  </Form.Control.Feedback>
               </Form.Row>
               <Form.Row>
               <Form.Label>state.popularity</Form.Label>
	            <Form.Control  as="textarea" 
                              variant="dark"
	                           placeholder="Popularity"
                              value={this.state.value}
                              onChange={this.handleChange}
                              name="value"/>
               </Form.Row>
               <br></br>
               <Form.Row>
                  <Form.Group as={Col}>
                     <Button variant="dark"  type="submit"> 등 록 </Button>
                  </Form.Group>
                  <Form.Group as={Col}>
                     <Button variant="danger" type="clear"> 취 소 </Button>
                  </Form.Group>
               </Form.Row>
            </Form>
         </Container>
     );
   }
}

export default InputForm1;
