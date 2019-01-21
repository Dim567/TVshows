import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState={
	show: Array(10).fill(1).map(()=>{return {title:'n/a',year:'n/a',genres:'n/a',homepage:'n/a',network:'n/a',imgRef:'n/a'};}),
	activePage: 1,
	selector: {showname: '', year: '', genres: ''}
}
function reducer(state=initialState,action){
	switch(action.type){
		// case 'GET_INFO':
		// 	return {showname: ['I','AM','GOOD','PROGRAMMER'], activePage: state.activePage};
		case "BEGIN_REQUEST":
			return state;
		case 'UPDATE':
			return {show: action.response, activePage: action.page, selector: {...action.selector}};
		case 'ERROR':
			alert("External error. Can't perform action");
			return state;
		default:
			return state;
	}
}

export default createStore(reducer, applyMiddleware(thunk));