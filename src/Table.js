import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps){
  return {showname: state.showname};
}
// function mapDispatchToProps(){

// }

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
							cell=props.showname;
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
	return (<tbody>{Array(10).fill(1).map((el,ind)=><TableRow key={ind} ind={ind+1} showname={props.showname[ind]}/>)}</tbody>);
}
class Table extends React.Component{
	render(){
		return(
			<table >
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
	          <TableBody showname={this.props.showname} />
	        </table>
		);
	}
}
export default connect(mapStateToProps)(Table);