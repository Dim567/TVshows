import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state){
	return {isLoading: state.isLoading};
}

class Loader extends React.Component{
	constructor(props){
		super(props);
		this.loader='startLoader';
		//this.loaderContainer='loadedLoader';
	}
	render(){
		if(this.props.isLoading){
			//this.loaderContainer='Loader';
			this.loader='endLoader';
		}
		else {
			//this.loaderContainer='loadedLoader';
			this.loader='startLoader';
		}
		return (
			<div className=''>
				<div className={this.loader}></div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Loader);