/*
 * The module for the carriers.
 */
var C = require('constants');
var _ = require('lodash');

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
        else if (creep.pos.inRangeTo(source, 3)) {
            var target = creep.pos.findClosest(Game.MY_CREEPS, {
                filter: function(object) {
                    return (object.memory.source_id == creep.memory.source_id
                        &&
                        object.memory.type == C.MINER.id);
                }
            });
            creep.moveTo(target);
        }
        else {
            creep.moveTo(source);
        }
	}
	else{
		creep.moveTo(destination);
		creep.transferEnergy(destination);
	}
}
