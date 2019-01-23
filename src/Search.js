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
				<select defaultValue='' onChange={this.handleChange('genres')}>
					<option value=''>All genres</option>
					<option value='action'>Action</option>
					<option value='drama'>Drama</option>
					<option value='animation'>Animation</option>
					<option value='mystery'>Mystery</option>
					<option value='adventure'>Adventure</option>
					<option value='fantasy'>Fantasy</option>
					<option value='superhero'>Superhero</option>
					<option value='comedy'>Comedy</option>
					<option value='children'>Children</option>
					<option value='science-fiction'>Science-fiction</option>
					<option value='anime'>Anime</option>
					<option value='crime'>Crime</option>
					<option value='suspense'>Suspense</option>
					<option value='thriller'>Thriller</option>
					<option value='music'>Music</option>
					<option value='soap'>Soap</option>
					<option value='documentary'>Documentary</option>
					<option value='talk-show'>Talk-show</option>
					<option value='reality'>Reality</option>
					<option value='special-interest'>Special-interest</option>
					<option value='romance'>Romance</option>
					<option value='western'>Western</option>
					<option value='history'>History</option>
					<option value='war'>War</option>
					<option value='horror'>Horror</option>
				</select>Search for genres
			</div>
		);
	}
}

export default connect(mapStateToProps)(Search);