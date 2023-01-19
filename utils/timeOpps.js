
function toTimeStamp(time){
	return new Date(time*1000).toLocaleDateString();
}

async function nearestBlocks(from, to){


    to = to > (Date.now() / 1000) -1 ?  Date.now() / 1000 : to;
    from = from > to ? to -2 : from;
   
    let from_ts = await fetch(`https://coins.llama.fi/block/ethereum/${from}`).then(res => res.json())

    let to_ts = await fetch(`https://coins.llama.fi/block/ethereum/${to}`).then(res => res.json())

    from_ts = from_ts.height
    to_ts = to_ts.height
    return [from_ts, to_ts]

}

export {toTimeStamp, nearestBlocks}