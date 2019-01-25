import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state){
	return {isLoading: state.isLoading};
}

class Loader extends React.Component{
	render(){
		let loadClass='Invisible';
		if(this.props.isLoading){
			loadClass='loader';
		}
		else {
			loadClass='Invisible';
		}
		return (
			<div className=''>
				<div className={loadClass}>
					Loading
					<div className="loading1"></div>
					<div className="loading2"></div>
					<div className="loading3"></div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Loader);