import React from 'react';

function TableRow(){
	const newColumns=Array(7).fill(1);
	return <tr>{newColumns.map((el,ind)=><td key={ind}>7</td>)}</tr>;
}
function TableBody(){
	return (<tbody>{Array(10).fill(1).map((el,ind)=><TableRow key={ind} />)}</tbody>);
}
export default class Table extends React.Component{
	render(){
		return(
			<table>
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
	          <TableBody />
	        </table>
		);
	}
}