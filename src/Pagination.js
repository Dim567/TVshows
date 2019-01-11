import React, { Component } from 'react';
import { connect } from 'react-redux';
import remoteRequest from './remote_request.js';

function mapStateToProps(state){
	return {activePage: state.activePage}
}

class Pagination extends Component{
	render() {
		return (
			<div className="pagContainer">
				<div className='Pagination' onClick={()=>alert('back')}>{'<<'}</div>
				{Array(10).fill(1).map((el,ind)=>
					<div className={this.props.activePage===(ind+1)?'activePagination':'Pagination'} key={'key'+ind} onClick={
						()=>{this.props.dispatch(
							(dispatch)=>remoteRequest(dispatch,ind+1)
							);
						}
					}>
						{ind+1}
					</div>
				)}
				<div className='Pagination' onClick={()=>alert('forward')}>{'>>'}</div>
			</div>
		);
	}
}
export default connect(mapStateToProps)(Pagination);