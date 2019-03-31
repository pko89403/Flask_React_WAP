import React, { Component } from 'react';
import World from './World';
import Form1 from './InputForm';
import PredictResult from './PredictResult';
import SelectModel from './SelectModel';
import * as tf from '@tensorflow/tfjs';
import Spinner from 'react-spinner-material';
import { connect } from 'react-redux';
import { adder, adder2 } from '../store/modules/addResult';
import { Jumbotron, Button, Container } from 'react-bootstrap';
import './App.css'
import { List } from 'immutable';

const MODEL_URL = 'http://54.180.91.80/model';
const MODEL_URL_AT_WINDOWS = ['http://127.0.0.1/model','http://127.0.0.1/model2'];
const INPUTDIM = [1, 30]
const BAGOFWORDS = 3065
const INPUTDIM2 = [1, BAGOFWORDS]
const LOADING_MODEL_CNT = 2
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			models: [],
			inputText : "",
			loading : false,
			chooseModel : 0,
			prediction : this.props.value,
			checkbox : this.props.value2
		};
  	}

	async componentDidMount() {
		let loaded = []
		for(let i = 0; i < LOADING_MODEL_CNT; i++)
		{
				let tmp = await tf.loadLayersModel( MODEL_URL_AT_WINDOWS[i] );
				loaded.push( tmp );
		}

		this.setState({ models: loaded,
                		loading: true});
  	}

/*	  
	loadModels = async (loadingCNT) => {
		let loaded = []
		for(let i = 0; i < loadingCNT; i++)
		{
				let tmp = await tf.loadLayersModel( MODEL_URL_AT_WINDOWS[i] );
				loaded.push( tmp );
		}
		return loaded;
	}
*/

	classify = (preprcData, model) => {
     	
     	// Data Preprocessing2 Padding preprocessedSequence -> [1, 150]
		// prediction using model :: output as a softmax result that represent's probability of each 20 elements.
     	const prediction = tf.tidy(() => { 
        	//let paddedSeq = tf.tensor1d(preprcData).pad( [[ inputDim[1]-preprcData.length, 0 ]] );
			return (model).predictOnBatch( preprcData );
		 });
		 
     	return prediction.dataSync();  
  	}

  	// callback function InputForm component : get input value and post server 
  	inputFormCallBack = async (data) => {

		this.setState({
			inputText : "	Classification Result	:	" + data.inputTextData + "	"
		});

     	// Text Data -> server (POST : txt) -> text2Seq 
     	var processedText = await fetch("/getData", {	method: 'POST',
            						      				body: [data.inputTextData]
							    					}).then(response => {
           												return response.json();
        											}).then(result => {
           												return result[0];
													 });
													 
		//console.log(processedText);
		// MAKE DATA SELF EMBEDDING INPUTS. /////////////////////////////////////////////////////////////////////

		let paddedSeq = tf.tensor1d(processedText).pad( [[ INPUTDIM[1]-processedText.length, 0 ]] );
		let reshapeSeq = tf.reshape(paddedSeq, INPUTDIM)
		const classification = this.classify(reshapeSeq, this.state.models[this.state.chooseModel]);
		//console.log(classification);

		// MAKE DATA BAG OF 3065 WORDS /////////////////////////////////////////////////////////////////////////

		let bag = new Array(BAGOFWORDS).fill(0);
		for(let item = 0; item < processedText.length; item++)
		{
			bag[ processedText[item] ] = 1;
		}
		let bagTensor = tf.tensor1d(bag);
		let reshapeBag = tf.reshape(bagTensor, INPUTDIM2)
		const classification2 = this.classify(reshapeBag, this.state.models[1]);
		//console.log(classification2);

		///////////////////////////////////////////////////////////////////////////////////////////////////////

		//Redux Part!!!!!!!!!!!!!!!!!!!!!!!!!!//
		const { adder } = this.props;
		adder(classification);
		//Redux Part!!!!!!!!!!!!!!!!!!!!!!!!!!//
  	}
 
  	render() {
		console.log("REDUX STORE UPDATED >> ", List(this.props.value2).toJS() );
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
								<p>{this.props.value2}</p>
					   			<Container>
									<Jumbotron>
										<h1>Hit Country Classification System Based On Ingredient-Cuisine Dataset</h1>
									</Jumbotron>
									<Button variant="primary" size="lg" block className={this.state.inputText==="" ? 'hidden' : ' '}>{this.state.inputText}</Button>
									<World/>
									<PredictResult/>
									<br></br>
									<SelectModel/>
									<br></br>
									<Form1 onCreate={this.inputFormCallBack} />
								</Container>  
						   </div>
    		}
    		return ( <div>{pageData}</div> );
  	}
}

let mapStateToProps = (state) => {
	return {
		value : state.addReducer.list,
		value2 : state.addReducer.list2
	};
}

const mapDispatchToProps = dispatch => ({
	adder: predRes => dispatch( adder(predRes) )
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
