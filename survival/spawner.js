/*
 * Spawner module.
 */
var C = require('constants');

module.exports = function(spawn_id, needed) {
	var spawn = Game.spawns[spawn_id];

	if(!spawn.spawning){
	       spawn.createCreep(needed.body, null, 
			       {'source_id': needed.source_id, 
				       'type': needed.type});
	}
	else {
	
	}
}
