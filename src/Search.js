import React from 'react';
import { connect } from 'react-redux';
import remoteRequest from './remote_request.js';

function mapStateToProps(state){
	return {selector: state.selector}
}
class Search extends React.Component{
	constructor(props){
		super(props);
		this.handleChange=this.handleChange.bind(this);
	}
	handleChange(ask='showname'){
		return (event)=>{	
			//console.log(this.props.selector);	
			let searchValue={...this.props.selector};
			console.log(searchValue);
			searchValue[ask]=event.target.value;
			console.log(searchValue);
			//console.log(this.props.selector);
			//let searchValue=Object.assign({:event.target.value},...this.props.selector);
			this.props.dispatch((dispatch)=>remoteRequest(dispatch,1,searchValue));
		}	   
	}
	render(){
		return (
			<div>
				<input type='text' onChange={this.handleChange('showname')} />Search for name, description
				<input type='text' onChange={this.handleChange('year')} />Search for year
				<input type='text' onChange={this.handleChange('genres')} />Search for genres
			</div>
		);
	}
}

export default connect(mapStateToProps)(Search);