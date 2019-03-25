const ADDER = 'addReducer/ADDER';

export const adder = elem => ({ type: ADDER, elem });

const intialState = {
	list: [['AAAAAA']]
};

export default function addReducer(state = intialState, action)
{
	switch(action.type) {
		case ADDER:
			return {
				list: action.elem
			};
		default:
			return state;
	}
}

