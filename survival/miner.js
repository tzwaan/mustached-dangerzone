/* 
 * Module used to command the miners.
 */
var C = require('constants');

module.exports = function (creep){
	var mem_source = Memory.resources[creep.memory.source_id];
	var x = mem_source.pos.x;
	var y = mem_source.pos.y;
	
	var source = Game.getObjectById(creep.memory.source_id);
	if (!creep.pos.isNearTo(source)){
		creep.moveTo(source.pos);
	}
	else{
		creep.harvest(source);
		var carriers = mem_source[C.CARRIER.id];
		if(carriers.length > 0){
			carriers.forEach(function(carrier){
				carrier = Game.creeps[carrier];
				console.log(carrier);
				if (carrier.pos.isNearTo(creep)){
					creep.transferEnergy(carrier);
				}
			});
		}
	}
}
