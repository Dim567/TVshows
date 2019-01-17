import React, { Component } from 'react';
import { connect } from 'react-redux';
import remoteRequest from './remote_request.js';

function mapStateToProps(state){
	return {activePage: state.activePage,selector: state.selector};
}

class Pagination extends Component{
	handleClick(type,aPage,selector,ind=1){
		const page=aPage-10>=1?aPage-10:1;
		switch(type){
			case 'back':
				this.props.dispatch((dispatch)=>remoteRequest(dispatch,page,selector));
				break;
			case 'pages':
				this.props.dispatch((dispatch)=>remoteRequest(dispatch,ind+aPage-(aPage-1)%10,selector));
				break;
			case 'forward':
				this.props.dispatch((dispatch)=>remoteRequest(dispatch,aPage+10,selector));
				break;
			default:
				break;
		}
	}
	render() {
		let aPage=this.props.activePage;
		let selector=this.props.selector;
		//console.log(aPage,selector);
		return (
			<div className="pagContainer">
				<div className='Pagination' onClick={()=>this.handleClick('back',aPage,selector)}>{'<<'}</div>
				{Array(10).fill(1).map((el,ind)=>
					<div className={aPage===(ind+1+(aPage-1)-(aPage-1)%10)?'activePagination':'Pagination'} key={'key'+ind} onClick={
						()=>this.handleClick('pages',aPage,selector,ind)
					}>
						{ind+1+(aPage-1)-(aPage-1)%10}
					</div>
				)}
				<div className='Pagination' onClick={()=>this.handleClick("forward",aPage,selector)}>{'>>'}</div>
			</div>
		);
	}
}
export default connect(mapStateToProps)(Pagination);