/*
 * Main module.
 */
var C = require('constants');
var Resources = require('resources');
var Spawner = require('spawner');
var miner = require('miner');
var carrier = require('carrier');

// Init is still on a game start basis, but should be on a per room basis.
// meaning: whenever a new room is found, initialize the room.
if (!Memory.init) {
    Memory.init = true;
    Memory.resources = {};
    Memory.max_parts = 5;
    Memory.spawnQueue = [];

    for (var index in Game.rooms) {
        Resources.init(Game.rooms[index]);
    }
}
else{
    creep_upkeep();
	Resources();

	//hardcode spawn
	Spawner.nextInQ('Spawn1');
	//testing the miner
	for(var creep_name in Game.creeps){
		var creep = Game.creeps[creep_name];
		if (creep.memory.type == C.MINER.id){
			miner(creep);
		}
		if (creep.memory.type == C.CARRIER.id){
            if (!creep.spawning) {
                carrier(creep, Game.spawns.Spawn1);
            }
		}
	}
}

function creep_upkeep() {
    for (var creep_name in Memory.creeps) {
        if (!Game.creeps[creep_name]) {
            console.log("Dead creep named " + creep_name + " found.");
            Resources.remove_creep(creep_name);
            delete Memory.creeps[creep_name];
        }
    }
}
