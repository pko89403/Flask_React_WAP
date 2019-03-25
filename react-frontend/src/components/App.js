import React, { Component } from 'react';
import World from './World';
import Form1 from './InputForm';
import * as tf from '@tensorflow/tfjs';
import './App.css'
import update from 'react-addons-update';
import Spinner from 'react-spinner-material';

import { connect } from 'react-redux';
import { adder } from '../store/modules/addResult';

const modelURL = 'http://127.0.0.1/model';

//////////////////////////////////////////////
class App extends Component {
	constructor() {
		super();
		this.state = {
			formData: [],
			model: null,
      		};
  	}
  
	async componentDidMount() {
     	this.setState({ model: await tf.loadLayersModel(modelURL),
                   	loading: true});
  	}

	classify = (preprcData) => {
     			const inputDim = [1, 150]
     	// Data Preprocessing2 Padding preprocessedSequence -> [1, 150]
	// prediction using model :: output as a softmax result that represent's probability of each 20 elements.

     	const prediction = tf.tidy(() => { 
        	let paddedSeq = tf.tensor1d(preprcData).pad( [[ inputDim[1]-preprcData.length, 0 ]] );
		return (this.state.model).predictOnBatch(tf.reshape(paddedSeq, inputDim));
		 });
		 
     	return prediction.argMax(1).dataSync();  
  	}

  	// callback function InputForm component : get input value and post server 
  	handleCreate = async (data) => {
     	// Text Data -> server (POST : txt) -> text2Seq 
     		var processedText = await fetch("/getData", { method: 'POST',
            						      body: [data.country]
							    }).then(response => {
           		return response.json();
        	}).then(result => {
           		return result;
     		});

     		data.value  = this.classify(processedText[0]);
     		data.country = "China";
     	
		////
		adder([data.value]);
		////

     	var singleObj = [data.country, Number(data.value)* 100];
		console.log(data.country);
     	this.setState({ formData: update( this.state.formData,
           					{
              						$push: [singleObj]
           					})
     		     })
  	}
 
  	render() {
  		let pageData;
    		if( this.state.model === null ) {
       			pageData = <container class="centered">
                  			<Spinner size={120} 
                           	 	 	 spinnerColor={"blue"} 
                           	 		 spinnerWidth={2} />
                  			<p>LOADING MODEL</p>
                  		   </container>
    		} else {
       			pageData = <div>
                  			<World appData={this.state.formData} />
                  			<Form1 onCreate={this.handleCreate} />
                  		   </div>   
    		}
    		return ( <div>{pageData}</div> );
  	}
}


const mapStateToProps = state => ({
	list: state.addReducer.list,
});

const mapDispatchToProps = dispatch => ({
	adder: list => dispatch( adder(list) ),
});




export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
