const ADDER = 'addReducer/ADDER';
const ADDER2 = 'adderReducer/ADDER2';

export const adder = list => ({ type: ADDER, list });
export const adder2 = list2 => ({ type: ADDER2, list2 });

const intialState = {
	list: [],
	list2: [false, false, false],
	change : 0
};

export default function addReducer(state = intialState, action)
{
	switch(action.type) {
		case ADDER:
			return {
				...state,
				list: action.list
			};
		case ADDER2:
			return {
				...state,
				list2: action.list2,
				change : state.change + 1			
			};
		default:
			return state;
	}
}

