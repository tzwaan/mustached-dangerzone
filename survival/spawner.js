/*
 * Spawner module.
 */
var C = require('constants');
var _ = require('lodash');

module.exports = {
	nextInQ: function(spawn_id) {
		var spawn = Game.spawns[spawn_id];
		if(!spawn.spawning & Memory.spawnQueue.length > 0){
			var needed = Memory.spawnQueue.shift();

			var result = spawn.createCreep(needed.body, null,
				       {'source_id': needed.source_id,
					       'type': needed.type});

            if(_.isString(result)){
                if(needed.type == C.MINER.id || needed.type == C.CARRIER.id){
					Memory.resources[needed.source_id][needed.type].push(
						result);
				}
			}
		}
	}
}
