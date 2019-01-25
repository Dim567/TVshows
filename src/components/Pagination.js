import React, { Component } from 'react';
import { connect } from 'react-redux';
import remoteRequest from '../action_creator/remote_request.js';

function mapStateToProps(state){
	return {activePage: state.activePage,maxPage: state.maxPage,selector: state.selector};
}

class Pagination extends Component{
	handleClick(type,aPage,maxPage,selector,ind=1){
		let page=ind+aPage-(aPage-1)%10;
		let backPage=aPage-10>=1?aPage-10:1;
		let forwPage=aPage+10>maxPage?maxPage:aPage+10;
		switch(type){
			case 'back':
				if(backPage===aPage)
					break;
				this.props.dispatch((dispatch)=>remoteRequest(dispatch,backPage,selector));
				break;
			case 'pages':
				if(page===aPage)
					break;
				this.props.dispatch((dispatch)=>remoteRequest(dispatch,page,selector));
				break;
			case 'forward':
				if(forwPage===aPage)
					break;
				this.props.dispatch((dispatch)=>remoteRequest(dispatch,forwPage,selector));
				break;
			default:
				break;
		}
	}
	render() {
		let aPage=this.props.activePage;
		let selector=this.props.selector;
		let maxPage=this.props.maxPage;
		//console.log(maxPage);
		let amount=0;
		let rest=maxPage%10;
		if(rest>0&&(maxPage-aPage)<rest){
			amount=rest;
		}
		else{
			if(maxPage>0)
				amount=10;
		}
		//console.log(aPage,selector);
		return (
			<div className="pagContainer">
				<div className='Pagination' onClick={()=>this.handleClick('back',aPage,maxPage,selector)}>{'<<'}</div>
				{Array(amount).fill(1).map((el,ind)=>
					<div className={aPage===(ind+1+(aPage-1)-(aPage-1)%10)?'activePagination':'Pagination'} key={'key'+ind} onClick={
						()=>this.handleClick('pages',aPage,maxPage,selector,ind)
					}>
						{ind+1+(aPage-1)-(aPage-1)%10}
					</div>
				)}
				<div className='Pagination' onClick={()=>this.handleClick("forward",aPage,maxPage,selector)}>{'>>'}</div>
			</div>
		);
	}
}
export default connect(mapStateToProps)(Pagination);