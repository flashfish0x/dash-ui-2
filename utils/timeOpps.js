
function toTimeStamp(time){
	return new Date(time*1000).toLocaleDateString();
}

async function nearestBlocks(from, to){
   
    let from_ts = await fetch(`https://coins.llama.fi/block/ethereum/${from}`).then(res => res.json())

    let to_ts = await fetch(`https://coins.llama.fi/block/ethereum/${to}`).then(res => res.json())

    from_ts = from_ts.height
    to_ts = to_ts.height
    return [from_ts, to_ts]

}

export {toTimeStamp, nearestBlocks}