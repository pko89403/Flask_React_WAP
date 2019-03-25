const ADDER = 'addReducer/ADDER';

export const adder = list => ({ type: ADDER, list });

const intialState = {
	list: [['AAAAAA']]
};

export default function addReducer(state = intialState, action)
{
	console.log("addReducer do action");
	switch(action.type) {
		case ADDER:
			return {
				list: action.list
			};
		default:
			return state;
	}
}

