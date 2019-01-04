import { createStore } from "redux";

const initialState={
	showname: ['Star Wars','Star Trek', 'Very cool film','Avatar', 'John Carter','Terminator','Back to the future']
}
function reducer(state=initialState,action){
	switch(action.type){
		case 'GET_INFO':
			return {showname: ['I','AM','GOOD','PROGRAMMER']};
		break;
		default:
			return state;
	}
}

export default createStore(reducer);