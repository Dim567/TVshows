import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState={
	showname: ['Star Wars','Star Trek', 'Very cool film','Avatar', 'John Carter','Terminator','Back to the future']
}
function reducer(state=initialState,action){
	switch(action.type){
		case 'GET_INFO':
			return {showname: ['I','AM','GOOD','PROGRAMMER']};
		case 'UPDATE':
			return {showname: action.response};
		default:
			return state;
	}
}

export default createStore(reducer, applyMiddleware(thunk));