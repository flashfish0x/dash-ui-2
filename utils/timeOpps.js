
function toTimeStamp(time){
	return new Date(time*1000).toLocaleDateString();
}



export {toTimeStamp}