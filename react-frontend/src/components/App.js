import React, { Component } from 'react';
import World from './World';
import Form1 from './InputForm';
import PredictResult from './PredictResult';
import * as tf from '@tensorflow/tfjs';
import update from 'react-addons-update';
import Spinner from 'react-spinner-material';
import { connect } from 'react-redux';
import { adder } from '../store/modules/addResult';
import './App.css'
import { Jumbotron, Container } from 'react-bootstrap';



const MODEL_URL = 'http://54.180.91.80/model';
const MODEL1_URL_AT_WINDOWS = 'http://127.0.0.1/model';
const MODEL2_URL_AT_WINDOWS = 'http://127.0.0.1/model2';
//////////////////////////////////////////////
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: [],
			model1: null,
			model2: null,
			loading : false,
      	};
  	}
  
	async componentDidMount() {
		 this.setState({model1: await tf.loadLayersModel(MODEL1_URL_AT_WINDOWS),
						model2: await tf.loadLayersModel(MODEL2_URL_AT_WINDOWS),
                   		loading: true});
  	}

	classify = (preprcData, model) => {
     	const inputDim = [1, 30]
     	// Data Preprocessing2 Padding preprocessedSequence -> [1, 150]
		// prediction using model :: output as a softmax result that represent's probability of each 20 elements.

     	const prediction = tf.tidy(() => { 
        	let paddedSeq = tf.tensor1d(preprcData).pad( [[ inputDim[1]-preprcData.length, 0 ]] );
			return (model).predictOnBatch(tf.reshape(paddedSeq, inputDim));
		 });
		 
     	return prediction.dataSync();  
  	}

  	// callback function InputForm component : get input value and post server 
  	handleCreate = async (data) => {
     	// Text Data -> server (POST : txt) -> text2Seq 
     	var processedText = await fetch("/getData", {	method: 'POST',
            						      				body: [data.country]
							    					}).then(response => {
           												return response.json();
        											}).then(result => {
           												return result;
     												});

     	data.value  = this.classify(processedText[0], this.state.model1);
			 
		//Redux Part!!!!!!!!!!!!!!!!!!!!!!!!!!//
		const { adder } = this.props;
		adder(data.value);
		//Redux Part!!!!!!!!!!!!!!!!!!!!!!!!!!//
  	}
 
  	render() {
  		let pageData;
    		if( this.state.loading === false ) {
				pageData = <container class="centered">
								<Spinner size={120} 
                           	 	 	 	 spinnerColor={"blue"} 
                           	 		 	 spinnerWidth={2} />
                  				<p>LOADING MODEL</p>
                  		   </container>
			} else {
       			pageData = <div>
					   			<Container>
									<Jumbotron >
										<h1>Hit Country Classification System Based On Ingredient-Cuisine Dataset</h1>
									</Jumbotron>
									<World appData={this.state.formData} />
									<PredictResult/>
									<br></br>
									<Form1 onCreate={this.handleCreate} />
								</Container>  
						   </div>
    		}
    		return ( <div>{pageData}</div> );
  	}
}

let mapStateToProps = (state) => {
	return {
		value : state.addReducer.list
	};
}

const mapDispatchToProps = dispatch => ({
	adder: predRes => dispatch( adder(predRes) ),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
