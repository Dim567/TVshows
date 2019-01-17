import React from 'react';
import { connect } from 'react-redux';
import remoteRequest from './remote_request.js';

function mapStateToProps(state, ownProps){
  return state;
}
 function mapDispatchToProps(dispatch){
//return function(){
 	return{
	 	getInfoFromStore: ()=>dispatch({type: "GET_INFO"}),
	 	getStartPage: (pageNum)=>remoteRequest(dispatch,pageNum),
	 	getFoundList: (page,selector)=>remoteRequest(dispatch,page,selector)//////example of async action creator
	}
 //}
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
function TableHead(props){
	return (
		<thead>
	        <tr>
	          <th>Number</th>
	          <th>Poster</th>
	          <th onClick={()=>props.searchList(undefined,{choise: 'showname', showname:'batman'})}>Show Name</th>
	          <th onClick={()=>props.searchList(undefined,{choise: 'year', year: 2016})}>year</th>
	          <th>somth</th>
	          <th>somth</th>
	          <th>somth</th>
	        </tr>
        </thead>
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
	          <TableHead searchList={this.props.getFoundList} page={this.props.activePage} selector={this.props.selector}/>
	          <TableBody showname={this.props.showname} page={this.props.activePage}/>
	        </table>
		);
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Table);