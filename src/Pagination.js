import React, { Component } from 'react';
import { connect } from 'react-redux';
import remoteRequest from './remote_request.js';

function mapStateToProps(state){
	return {activePage: state.activePage}
}

class Pagination extends Component{
	handleClick(type,aPage,ind=1){
		const page=aPage-10>=1?aPage-10:1;
		switch(type){
			case 'back':
				this.props.dispatch((dispatch)=>remoteRequest(dispatch,page));
				break;
			case 'pages':
				this.props.dispatch((dispatch)=>remoteRequest(dispatch,ind+aPage-(aPage-1)%10));
				break;
			case 'forward':
				this.props.dispatch((dispatch)=>remoteRequest(dispatch,aPage+10));
				break;
			default:
				break;
		}
	}
	render() {
		let aPage=this.props.activePage;
		return (
			<div className="pagContainer">
				<div className='Pagination' onClick={()=>this.handleClick('back',aPage)}>{'<<'}</div>
				{Array(10).fill(1).map((el,ind)=>
					<div className={aPage===(ind+1+(aPage-1)-(aPage-1)%10)?'activePagination':'Pagination'} key={'key'+ind} onClick={
						()=>this.handleClick('pages',aPage,ind)
					}>
						{ind+1+(aPage-1)-(aPage-1)%10}
					</div>
				)}
				<div className='Pagination' onClick={()=>this.handleClick("forward",aPage)}>{'>>'}</div>
			</div>
		);
	}
}
export default connect(mapStateToProps)(Pagination);