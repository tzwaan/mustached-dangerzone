/*
 * The module for the carriers.
 */

module.exports = function carry(creep, destination){
	var source = Game.getObjectById(creep.memory.source_id);
	
	if(creep.energy < creep.energyCapacity){
		creep.moveTo(source.pos.x, source.pos.y);
	}
	else{
		creep.moveTo(destination);
		creep.transferEnergy(destination);
	}
}
