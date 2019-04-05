import React from 'react';
import {Form,Button,Col} from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";


const config = {
   apiKey: "AIzaSyD4qGgS2_mfD6-6NhrJDivCty8JG10J91c",
   authDomain: "flaskreactdb.firebaseapp.com",
   databaseURL: "https://flaskreactdb.firebaseio.com",
   projectId: "flaskreactdb",
   storageBucket: "flaskreactdb.appspot.com",
   messagingSenderId: "406809941570"
 };
 firebase.initializeApp(config);


class InputForm1 extends React.Component {
   state = { inputTextData: '' }

   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      });
   }

   handleSubmit = (e) => {
	   e.preventDefault();
	   this.props.onCreate(this.state); // 상태 값을 부모에게 전달???
      /*
      this.setState({
	      inputTextData: ''
      });
      */
   }

   handleClear = (e) => {
      e.preventDefault();
      this.setState({
         inputTextData: ''
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
                                 value={this.state.inputTextData}
                                 onChange={this.handleChange}
                                 name="inputTextData"/>
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
