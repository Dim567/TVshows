import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState={
	showname: [
		{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},
		{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'}
	],
	activePage: 1
}
function reducer(state=initialState,action){
	switch(action.type){
		// case 'GET_INFO':
		// 	return {showname: ['I','AM','GOOD','PROGRAMMER'], activePage: state.activePage};
		case "BEGIN_REQUEST":
			return {showname: state.showname, activePage: state.activePage}
		case 'UPDATE':
			return {showname: action.response, activePage: action.page};
		case 'ERROR':
			return {showname: ['error'], activePage: state.activePage};
		default:
			return state;
	}
}

export default createStore(reducer, applyMiddleware(thunk));