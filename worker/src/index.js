export default {
	async fetch(request, env, ctx) {
		return handleRequest(request, env, ctx)
	},
};

async function handleRequest(request, env, ctx) {
	let url = new URL(request.url);
	let pathname = url.pathname.replace("_papi/", "");
  
	switch (pathname) {
	  case "/np": {
		console.log(env);
		let recentTracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zimpatrick&api_key=${env.API_KEY}&format=json&nowplaying=true`)
		  .then(r => r.json());
		
		let track = recentTracks.recenttracks.track[0];
		if (!track) return new Response("{}");
  
		// fetch yt
		const YT_REGEX = /(?:https:\/\/)(?:www.)?youtube.com\/watch\?v=([A-z0-9_-]+)/;
		const lastFmHtml = await fetch(track["url"]).then(r => r.text());
		let matchArray = lastFmHtml.match(YT_REGEX);
		if (matchArray.length > 1) track.youtubeId = matchArray[1];
  
		return new Response(JSON.stringify(track), {
			headers: {
				"Access-Control-Allow-Origin": "*"
			}
		});
	  }
	}
  
	return new Response(pathname);
  }