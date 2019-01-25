import React from 'react';
import { connect } from 'react-redux';
import remoteRequest from './remote_request.js';

function mapStateToProps(state){
	return {selector: state.selector}
}
class Search extends React.Component{
	constructor(props){
		super(props);
		this.showValue=React.createRef();
		this.yearValue=React.createRef();
		this.genresValue=React.createRef();
		this.handleSelectChange=this.handleSelectChange.bind(this);
		this.handleFormChange=this.handleFormChange.bind(this);
	}
	handleSelectChange(event){
		let searchValue={...this.props.selector};
		//console.log(searchValue);
		searchValue['genres']=event.target.value;
		this.props.dispatch((dispatch)=>remoteRequest(dispatch,1,searchValue));   
	}
	handleFormChange(event){
		let searchValue={
			showname: this.showValue.current.value,
			year: this.yearValue.current.value,
			genres: this.genresValue.current.value
		};
		this.props.dispatch((dispatch)=>remoteRequest(dispatch,1,searchValue));
		event.preventDefault();
	}
	render(){
		return (
			<div>
				<form onSubmit={this.handleFormChange} className="SearchForm">
					<div>
						<label>Search for name, description:</label> 
						<input type='text' ref={this.showValue} />
					</div>
					<div>
						<label>Search for year:</label>
						<input type='text' ref={this.yearValue} />
					</div>
					<div>
						<label>Search for genres:</label>
						<select defaultValue='' onChange={this.handleSelectChange} ref={this.genresValue}>
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
						</select>
					</div>
					<input type='submit' value='Search'/>
				</form>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Search);