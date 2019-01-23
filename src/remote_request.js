export default function remoteRequest(dispatch,page=1,selector={showname: '', year: '', genres: ''}){
	dispatch({type: 'BEGIN_REQUEST'});
	// var selector=selector;
	let reqStr='page='+page+'&query='+selector.showname+'&years='+selector.year+'&genres='+selector.genres;
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
	//reqStr+='&query='+selector.showname+'&years='+selector.year+'&genres='+selector.genres;
	let url=`https://api.trakt.tv/shows/popular?${reqStr}&extended=full`;
	let settings={
				method: 'GET',
				headers:{'Content-Type': 'application/json','trakt-api-version': '2','trakt-api-key':'094e531346ad44623adad1d303859ba4bd981a6ea4f60912a38a9d27dca7818d'}
			}
	//console.log(selector);
	//  let request = new XMLHttpRequest();
	// 	request.open('GET', `https://api.trakt.tv/shows/popular?${reqStr}&extended=full`);
	// 	request.setRequestHeader('Content-Type', 'application/json');
	// 	request.setRequestHeader('trakt-api-version', '2');
	// 	request.setRequestHeader('trakt-api-key', '094e531346ad44623adad1d303859ba4bd981a6ea4f60912a38a9d27dca7818d');

	// 	request.onreadystatechange = function () {
	// 	  if (this.readyState === 4) {
	// 	  	if(this.status!==200)
	// 	  	    dispatch({type: 'ERROR'});
	// 		const resp=JSON.parse(this.responseText).map((el)=>{
	// 			return {title: el.title, year: el.year,genres:el.genres.join(', '),homepage:el.homepage,network:el.network};
	// 		});
	// 		/////////////////////
	// 	    let response=undefined;
	// 	    if(resp.length<10)
	// 	    	response=resp.concat(Array(10-resp.length).fill({title:"no more", year: 'no more',genres:'n/a',homepage:'n/a',network:'n/a'}));
	// 	    else
	// 	     	response=resp;
	// 	     // let header=request.getResponseHeader('X-Pagination-Page-Count');
	// 	     // console.log(header);
	// 	    //////////////////////////the response length always equals 10
	// 		//console.log(JSON.parse(this.responseText)[0]);
	// 	    dispatch({type: "UPDATE", response, page, selector:{...selector}});
	// 	  }
	// 	};
	// request.send();
	async function serialRetrieve(){
		try{
			var data=await fetch(url,settings);
			var textCells=await data.json();///////////////////text data for table
			var maxPage=+data.headers.get('X-Pagination-Page-Count');
			//console.log(maxPage);
		}
		catch(e){
			console.log(e.message);
			dispatch({type: 'ERROR'});
		}
		try{
			var img=await Promise.all(textCells.map((el)=>retrieveData(`http://webservice.fanart.tv/v3/tv/${el.ids.tvdb}?api_key=a921bece93615667d194099239fce861`)));///////img src for table
		}
		catch(e){
			console.log(e.message);
		}
		let answer=[];
		for(var i=0;i<textCells.length;i++){
			let ref="";
			if(img[i]&&img[i].tvposter&&img[i].tvposter[0]){
				ref=img[i].tvposter[0].url;
			}
			answer.push({title: textCells[i].title, year: textCells[i].year,genres:textCells[i].genres.join(', '),homepage:textCells[i].homepage,network:textCells[i].network,imgRef: ref});
		}
		let response=answer;
		// if(answer.length<10)
	 //    	response=answer.concat(Array(10-answer.length).fill({title:"no more", year: 'no more',genres:'n/a',homepage:'n/a',network:'n/a',imgRef:''}));
	 //    else
	 //     	response=answer;
	    dispatch({type: "UPDATE", response, page, maxPage, selector:{...selector}});
	}
	async function retrieveData(url){
		let retData;
		//try{
			let dataObj=await fetch(url);
			// if(!dataObj.ok){
			// 	 throw new Error();
			// 	}
			let data=await dataObj.json();
			//console.log(data);
			retData=data;
		//}
		//catch(e){
			//console.log(e.message);
			//dispatch({type: 'ERROR'});
		//}
		return retData;
	}
	serialRetrieve().catch((er)=>alert(er.message+'. External error'));
			///////////////////////////////
	// retrieveData(url,settings).then((data)=>{
	// 		//////////////////////////////
	// 		let answer=data.map((el)=>{
	// 				return {title: el.title, year: el.year,genres:el.genres.join(', '),homepage:el.homepage,network:el.network,imgRef: el.ids.tvdb};
	// 			});
	// 		// let response=undefined;
	// 	 //    if(answer.length<10)
	// 	 //    	response=answer.concat(Array(10-answer.length).fill({title:"no more", year: 'no more',genres:'n/a',homepage:'n/a',network:'n/a',imgRef:'n/a'}));
	// 	 //    else
	// 	 //     	response=answer;
	// 	    //dispatch({type: "UPDATE", response, page, selector:{...selector}});
	// 	    return answer;
	// 	}).then((response)=>dispatch({type: "UPDATE", response, page, selector:{...selector}}));
}
