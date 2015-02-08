/* 
 * Module used to command the miners.
 */
var C = require('constants');

module.exports = function (creep){
	var mem_source = Memory.resources[creep.memory.source_id];
	var x = mem_source.pos.x;
	var y = mem_source.pos.y;
	
	var source = creep.room.lookAt(x, y)[0].source;
	if (!creep.pos.isNearTo(source)){
		creep.moveTo(source.pos);
	}
	else{
		creep.harvest(source);
		var carriers = mem_source[C.CARRIER.id];
		for (var i=0; i < carriers.length; i++){
			var carrier = Game.creeps[carriers[i]];
			if (carrier.pos.isNearTo(creep)){
				creep.transferEnergy(carrier);
			}
		}
	}
}
