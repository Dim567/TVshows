import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState={
	show: Array(10).fill(1).map(()=>{return {title:'n/a',year:'n/a',genres:'n/a',homepage:'n/a',network:'n/a',imgRef:''};}),
	activePage: 1,
	maxPage: 0,
	selector: {showname: '', year: '', genres: ''},
	isLoading: false
}
function reducer(state=initialState,action){
	switch(action.type){
		case "BEGIN_REQUEST":
			let pendingState={
				show: state.show.map((el)=>{return {title: el.title,year: el.year,genres: el.genres,homepage:el.homepage,network: el.network,imgRef:''};}),///maybe state.show and enough
				activePage: state.activePage,
				maxPage: state.maxPage,
				selector: {...state.selector},
				isLoading: true
			};
			return pendingState;
		case 'UPDATE':
			return {show: action.response, activePage: action.page, maxPage: action.maxPage, selector: {...action.selector},isLoading: false};
		case 'ERROR':
			alert("External error. Can't perform action. Try another request");
			return {...state,isLoading: false};
		default:
			return state;
	}
}

export default createStore(reducer, applyMiddleware(thunk));