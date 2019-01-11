import React from 'react';
import { connect } from 'react-redux';
import remoteRequest from './remote_request.js';

// function remoteRequest(dispatch,startPage){
// 	dispatch({type: 'BEGIN_REQUEST'});
// 	let page=startPage;
// 	 let request = new XMLHttpRequest();
// 		request.open('GET', `https://api.trakt.tv/shows/popular?page=${page}`);
// 		request.setRequestHeader('Content-Type', 'application/json');
// 		request.setRequestHeader('trakt-api-version', '2');
// 		request.setRequestHeader('trakt-api-key', '094e531346ad44623adad1d303859ba4bd981a6ea4f60912a38a9d27dca7818d');

// 		request.onreadystatechange = function () {
// 		  if (this.readyState === 4) {
// 		  	if(this.status!==200)
// 		  		dispatch({type: 'ERROR'});
// 		    //console.log('Show name:', JSON.parse(this.responseText));
// 		   const response=JSON.parse(this.responseText).map((el)=>el.title);
// 		   // console.log(response);
// 		    dispatch({type: "UPDATE", response});
// 		  }
// 		};
// 	request.send();
// }

function mapStateToProps(state, ownProps){
  return {...state};
}
 function mapDispatchToProps(){
 return function(dispatch){
 	return{
	 	getInfoFromStore: ()=>dispatch({type: "GET_INFO"}),
	 	getStartPage: (pageNum)=>remoteRequest(dispatch,pageNum)//////example of async action creator
	}
 }
}

function TableRow(props){
	const newColumns=Array(7).fill(1);
	return (
		<tr>
			{newColumns.map((el,ind)=>
				{   
					let cell=0;
					switch(ind){
						case 0:
							cell=props.ind;
						break;
						case 1:
							cell="photo";
						break;
						case 2:
							cell=props.showname.title;
						break;
						case 3:
							cell=props.showname.year;
						break;
						default:
							cell='...';
					}
					return <td key={ind}>{cell}</td>;
				}
			)}
		</tr>
	);
}
function TableBody(props){
	return (
		<tbody>
			{Array(10).fill(1).map((el,ind)=><TableRow key={ind} ind={ind+1+(props.page-1)*10} showname={props.showname[ind]}/>)}
		</tbody>
	);
}
class Table extends React.Component{
	componentDidMount(){
		this.props.getStartPage(1);		
	}
	componentDidUpdate(){
		//this.props.getUpdate();
	}
	render(){
		return(
			<table onClick={()=>{this.props.getInfoFromStore(); console.log(this.props.activePage);}}>
	          <thead>
	            <tr>
	              <th>Number</th>
	              <th>Poster</th>
	              <th>Show Name</th>
	              <th>somth</th>
	              <th>somth</th>
	              <th>somth</th>
	              <th>somth</th>
	            </tr>
	          </thead>
	          <TableBody showname={this.props.showname} page={this.props.activePage}/>
	        </table>
		);
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Table);