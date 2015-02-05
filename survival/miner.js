/* 
 * Module used to command the miners.
 */
var C = require('constants');

module.exports = function (creep){
	var x = Memory.resources[creep.memory.source_id].pos.x;
	var y = Memory.resources[creep.memory.source_id].pos.y;
	
	var source = creep.room.lookAt(x, y)[0].source;
	if (!creep.pos.isNearTo(source)){
		creep.moveTo(source.pos);
	}
	else{
		creep.harvest(source);
	}
}
