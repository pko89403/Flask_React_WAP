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

const MODEL_URL_AT_WINDOWS = ['https://54.180.91.80:443/model2', 'https://54.180.91.80:80/model', 'https://54.180.91.80:80/model'];
const INPUTDIM = [1, 30]
const BAGOFWORDS = 3065
const INPUTDIM2 = [1, BAGOFWORDS]
const LOADING_MODEL_CNT = 3
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			models: [],
			inputText : "",
			loading : false,
			prediction : this.props.value,
			checkbox : this.props.value2
		};
  	}

	async componentDidMount() {
		const loaded = await this.loadModels(LOADING_MODEL_CNT);
		this.setState({ models: loaded,
                		loading: true});
  	}

	  
	loadModels = async (loadingCNT) => {
		let loaded = []
		for(let i = 0; i < loadingCNT; i++)
		{
				let tmp = await tf.loadLayersModel( MODEL_URL_AT_WINDOWS[i] );
				loaded.push( tmp );
		}
		return loaded;
	}


	classify = (preprcData, model) => {
     	
     	// Data Preprocessing2 Padding preprocessedSequence -> [1, 30]
		// prediction using model :: output as a softmax result that represent's probability of each 20 elements.
     	const prediction = tf.tidy(() => { 
        	//let paddedSeq = tf.tensor1d(preprcData).pad( [[ inputDim[1]-preprcData.length, 0 ]] );
			return (model).predictOnBatch( preprcData );
		 });
		 
     	return prediction.dataSync();  
  	}
	
	backofwordModels = (processedText) => {
		let bog = new Array(BAGOFWORDS).fill(0);
		for(let item =0; item < processedText.length; item++)
		{
			bog[ processedText[item] ] = 1;
		}
		let input = tf.reshape(tf.tensor1d(bog), INPUTDIM2);
		return this.classify(input, this.state.models[0]);
	}

	continuousBOGModels = (processedText) => {
		let paddedSeq = tf.reshape(tf.tensor1d(processedText).pad( [[ INPUTDIM[1]-processedText.length, 0 ]] ), INPUTDIM);
		return this.classify(paddedSeq, this.state.models[1]);
	}
	embeddingModels = (processedText) => {
		let paddedSeq = tf.reshape(tf.tensor1d(processedText).pad( [[ INPUTDIM[1]-processedText.length, 0 ]] ), INPUTDIM);
		return this.classify(paddedSeq, this.state.models[2]);
	}

	ensembleMean = (predictResult) => {
		const resLen = predictResult[0].length;
		const totalRes = predictResult.length;

		let res = new Array(20).fill(0);
		
		for(let resList = 0; resList < resLen; resList++)
		{
			for(let resIdx = 0; resIdx < totalRes; resIdx++)
			{
				res[resList] += predictResult[resIdx][resList];
			}
			res[resList] /= totalRes;
		}
		return res;
	}

	// callback function InputForm component : get input value and post server 
	// INDEX 0 - BOW, INDEX 1 - CBOW, INDEX 2 - EMBEDDING  
  	inputFormCallBack = async (data) => {
		if(this.state.checkbox[0] === false && this.state.checkbox[1] === false && this.state.checkbox[2] === false)
		{
			alert("모델은 적어도 하나는 선택 해주세요.");
			return;
		}

		this.setState({
			inputText : "	Classification Result	:	" + data.inputTextData + "	"
		});

		console.log(this.state.checkbox[0], this.state.checkbox[1], this.state.checkbox[2]);
     	// Text Data -> server (POST : txt) -> text2Seq 
     	var processedText = await fetch("http://54.180.91.80/getData", {	method: 'POST',
            						      				body: [data.inputTextData]
							    					}).then(response => {
           												return response.json();
        											}).then(result => {
           												return result[0];
													});
		
		let classification = [];													
		// BAG OF WORDS /////////////////////////////////////////////////////////////////////////
		if(this.state.checkbox[0] === true){
			const result = this.backofwordModels(processedText);
			classification.push(result);
			console.log("BOG", result)
		}		
		// CONTINUOUS BAG OF WORDS ///////////////////////////////////////////////////////////////////
		if(this.state.checkbox[1] === true){
			const result = this.continuousBOGModels(processedText)
			classification.push(result);
			console.log("CBOG", result)
		}
		// EMBEDDING /////////////////////////////////////////////////////////////////////////
		if(this.state.checkbox[2] === true){
			const result = this.embeddingModels(processedText);
			classification.push(result);
			console.log("EMB", result)
		}
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		const finalResult = this.ensembleMean(classification);
		console.log(finalResult);
		//Redux Part!!!!!!!!!!!!!!!!!!!!!!!!!!//
		const { adder } = this.props;
		adder(finalResult);
		///////////////////////////////////////
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
