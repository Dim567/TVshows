import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState={
	showname: [
		{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},
		{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'},{title: 'n/a',year: 'n/a'}
	],
	activePage: 1,
	selector: {choise: null}
}
function reducer(state=initialState,action){
	switch(action.type){
		// case 'GET_INFO':
		// 	return {showname: ['I','AM','GOOD','PROGRAMMER'], activePage: state.activePage};
		case "BEGIN_REQUEST":
			return state;
		case 'UPDATE':
			return {showname: action.response, activePage: action.page, selector: {...action.selector}};
		case 'ERROR':
			alert("External error. Can't perform action");
			return state;
		default:
			return state;
	}
}

export default createStore(reducer, applyMiddleware(thunk));