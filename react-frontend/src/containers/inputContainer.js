import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputForm1 from '../components/InputForm';
import { result } from '../components/store/modules/addResult';

class InputContainer extends Component {
	handleInput = data => {
		const { changeData } = this.props;
		console.log(changeData);
		result(data);
	};
}

const mapStateToProps = state => ({
	data : state.result.list,
});

const mapDispatchToProps = dispatch => ({
	result: data => dispatch(result(data)),
});

export default connect(
	mapStateToPros,
	mapDispatchToPros
)(InputContainer);
