/*
 * The module for the carriers.
 */

module.exports = function carry(creep, destination){
	var source = Game.getObjectById(creep.memory.source_id);

	if(creep.energy < creep.energyCapacity){
        var targets = creep.pos.findInRange(Game.DROPPED_ENERGY, 2);
        if (targets.length > 0) {
            var target = creep.pos.findClosest(targets);
            if (creep.pos.isNearTo(target)) {
                creep.say("pickup E");
                creep.pickup(target);
            }
            else {
                creep.say("moveTo E");
                creep.moveTo(target);
            }
        }
        else {
            creep.moveTo(source.pos.x, source.pos.y);
        }
	}
	else{
		creep.moveTo(destination);
		creep.transferEnergy(destination);
	}
}
