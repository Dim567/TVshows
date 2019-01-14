export default function remoteRequest(dispatch,startPage){
	dispatch({type: 'BEGIN_REQUEST'});
	let page=startPage;
	 let request = new XMLHttpRequest();
		request.open('GET', `https://api.trakt.tv/shows/popular?page=${page}`);
		request.setRequestHeader('Content-Type', 'application/json');
		request.setRequestHeader('trakt-api-version', '2');
		request.setRequestHeader('trakt-api-key', '094e531346ad44623adad1d303859ba4bd981a6ea4f60912a38a9d27dca7818d');

		request.onreadystatechange = function () {
		  if (this.readyState === 4) {
		  	if(this.status!==200)
		  	    dispatch({type: 'ERROR'});
			const resp=JSON.parse(this.responseText).map((el)=>{return {title: el.title, year: el.year};});
			/////////////////////
		    let response=undefined;
		    if(resp.length<10)
		    	response=resp.concat(Array(10-resp.length).fill({title:"no more", year: 'no more'}));
		    else
		     	response=resp;
		    //////////////////////////the response length always equals 10
			//console.log(response);
		    dispatch({type: "UPDATE", response, page});
		  }
		};
	request.send();
}

export function sortCol(dispatch, colName){
	dispatch({type: 'BEGIN_REQUEST'});
	console.log('remote work');
}