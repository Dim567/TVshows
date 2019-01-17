export default function remoteRequest(dispatch,page=1,selector={showname: '', year: '', genres: ''}){
	dispatch({type: 'BEGIN_REQUEST'});
	// var selector=selector;
	let reqStr='page='+page;
	// switch(selector.choise){
	// 	case 'year':
	// 		reqStr+='&years='+selector.request;
	// 		break;
	// 	case 'showname':
	// 		reqStr+='&query='+selector.request;
	// 		break;
	// 	case 'genres':
	// 		reqStr+='&genres='+selector.request;
	// 	default:
	// 		break;
	// }
	reqStr+='&query='+selector.showname+'&years='+selector.year+'&genres='+selector.genres;
	//console.log(selector);
	 let request = new XMLHttpRequest();
		request.open('GET', `https://api.trakt.tv/shows/popular?${reqStr}&extended=full`);
		request.setRequestHeader('Content-Type', 'application/json');
		request.setRequestHeader('trakt-api-version', '2');
		request.setRequestHeader('trakt-api-key', '094e531346ad44623adad1d303859ba4bd981a6ea4f60912a38a9d27dca7818d');

		request.onreadystatechange = function () {
		  if (this.readyState === 4) {
		  	if(this.status!==200)
		  	    dispatch({type: 'ERROR'});
			const resp=JSON.parse(this.responseText).map((el)=>{
				return {title: el.title, year: el.year,genres:el.genres.join(', '),homepage:el.homepage,network:el.network};
			});
			/////////////////////
		    let response=undefined;
		    if(resp.length<10)
		    	response=resp.concat(Array(10-resp.length).fill({title:"no more", year: 'no more',genres:'n/a',homepage:'n/a',network:'n/a'}));
		    else
		     	response=resp;
		     // let header=request.getResponseHeader('X-Pagination-Page-Count');
		     // console.log(header);
		    //////////////////////////the response length always equals 10
			//console.log(JSON.parse(this.responseText)[0]);
		    dispatch({type: "UPDATE", response, page, selector:{...selector}});
		  }
		};
	request.send();
}
