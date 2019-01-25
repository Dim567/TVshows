export default function remoteRequest(dispatch,page=1,selector={showname: '', year: '', genres: ''}){
	dispatch({type: 'BEGIN_REQUEST'});

	let reqStr='page='+page+'&query='+selector.showname+'&years='+selector.year+'&genres='+selector.genres;
	let url=`https://api.trakt.tv/shows/popular?${reqStr}&extended=full`;
	let settings={
				method: 'GET',
				headers:{'Content-Type': 'application/json','trakt-api-version': '2','trakt-api-key':'094e531346ad44623adad1d303859ba4bd981a6ea4f60912a38a9d27dca7818d'}
			}

	async function serialRetrieve(){
		try{
			var data=await fetch(url,settings);
			var textCells=await data.json();///////////////////text data for table
			var maxPage=+data.headers.get('X-Pagination-Page-Count');
		}
		catch(e){
			console.log(e.message);
			dispatch({type: 'ERROR'});
		}
		try{
			//var img=await Promise.all(textCells.map((el)=>retrieveData(`http://webservice.fanart.tv/v3/tv/${el.ids.tvdb}?api_key=a921bece93615667d194099239fce861`)));///////img src for table
			var img=await Promise.all(textCells.map((el)=>retrieveData(`https://api.themoviedb.org/3/tv/${el.ids.tmdb}/images?api_key=199bb1bdaaf09ba68436c8d29c61b489&include_image_language=en,null`)));
		}
		catch(e){
			console.log(e.message);
		}
		let answer=[];
		for(var i=0;i<textCells.length;i++){
			answer.push({title: textCells[i].title, year: textCells[i].year,genres:textCells[i].genres.join(', '),homepage:textCells[i].homepage,network:textCells[i].network,imgRef: img[i]/*ref*/});
		}
		let response=answer;
	    dispatch({type: "UPDATE", response, page, maxPage, selector:{...selector}});
	}

	async function retrieveData(url){
		let response='';
		try{
			let dataObj=await fetch(url);
			let data=await dataObj.json();
			response=`https://image.tmdb.org/t/p/w342/${data.posters[0].file_path}`;
		}
		catch(e){
			console.log(e.message);
		}
			//console.log(data);
		return response;
	}

	serialRetrieve().catch((er)=>alert(er.message+'. External error'));
	
}
