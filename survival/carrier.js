/*
 * module to command the carriers 
 */

module.exports = function (creep){
	var source = Memory.resources[creep.memory.source_id].pos;
	
	if (creep.pos ){
		var miners = Memory.resources[creep.memory.source_id].miners;
		miners.forEach(function (miner){
			creep.moveTo(Game.creeps[miner].pos);
		});
	}
	else {
		
	}
}
