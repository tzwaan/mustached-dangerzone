/*
 * Resource module.
 *
 * nr of carriers needed:
 * You need 10 energy each tick, so:
 * nr_carriers = (2 * miner_yield * distance) / load
 */
var _ = require('lodash');
var C = require('constants');
var sources = Memory.resources;

module.exports = function() {
	//sort the sources by distance
	var source_ids = Object.keys(sources).sort(function(a, b){
	    	return sources[a].distance - sources[b].distance; });
    if (Memory.spawnQueue.length < 6) {
        for (var source in source_ids) {
            if (creep_needed(source_ids[source])) {
                break;
            }
        }
    }
};

// initialize the Resources memory.
// should be per room, is global now.
module.exports.init = function(room) {
    var new_sources = room.find(Game.SOURCES);
    var spawn = room.find(Game.MY_SPAWNS)[0];

    for (var source_name in new_sources) {
        var path = spawn.pos.findPathTo(new_sources[source_name]);
        var distance = 0;
	var x = new_sources[source_name].pos.x;
	var y = new_sources[source_name].pos.y;

        path.forEach(function(step) {
            var look = room.lookAt(step.x, step.y);
            look.forEach(function(object) {
                if (object.type == 'terrain') {
                    if (object.terrain == 'swamp') {
                        distance += 5;
                    }
                    else {
                        distance += 1;
                    }
                }
            });
        });
        Memory.resources[new_sources[source_name].id] = {
            'distance' : distance,
	    'pos' : {'x': x, 'y': y}
        };
	Memory.resources[new_sources[source_name].id][C.MINER.id] = [];
	Memory.resources[new_sources[source_name].id][C.CARRIER.id] = [];
    }
}

/* returns either false or an object with the needed:
 * type
 * body
 * source_id
 */
module.exports.creep_needed = creep_needed;
function creep_needed(source_id) {
    var miner = miner_needed(source_id);
    var body = [];
    if (miner) {
        body.push(Game.MOVE);
        body.push(Game.CARRY);

	//create creep bodyparts
        while (body.length < Memory.max_parts && (body.length - 2) < miner) {
            body.push(Game.WORK);
        }
        Memory.spawnQueue.push({
            'type' : C.MINER.id,
            'body' : body,
            'source_id' : source_id
        });
        return true;
    }
    var carrier = carrier_needed(source_id);
    if (carrier) {
        while ((body.length + 2) <= Memory.max_parts && (body.length / 2) < carrier) {
            body.push(Game.MOVE);
            body.push(Game.CARRY);
        }
        Memory.spawnQueue.push({
            'type' : C.CARRIER.id,
            'body' : body,
            'source_id' : source_id
        });
        return true;
    }
    return false;
};

// returns either false or the number of [work] parts that are needed.
module.exports.miner_needed = miner_needed;
function miner_needed(source_id) {
    var nr_work = get_workforce(source_id, C.MINER);
    var miner_yield = 6;

    var needed = miner_yield - nr_work;

    if (needed >= 1) {
        return needed;
    }
    return false;
}

// returns either false or the number of [carry&move] parts that are needed.
module.exports.carrier_needed = carrier_needed;
function carrier_needed(source_id) {
    // should be calculated, now hardcoded.
    // considering that the miners are the same
    var nr_work = get_workforce(source_id, C.MINER);
    var source = Memory.resources[source_id];
    var nr_carry = get_workforce(source_id, C.CARRIER);
    var needed = Math.ceil(((4 * nr_work * source.distance) / 50) - nr_carry + 1);

    if (needed >= 1) {
        return needed;
    }
    return false;
};

function get_workforce(source_id, type) {
    var source = Memory.resources[source_id];

    var nr_type = 0;
    if (source[type.id].length > 0){
	    source[type.id].forEach(function(creep) {
        	Game.creeps[creep].body.forEach(function(body_part) {
                if (body_part.type == type.body) {
                    nr_type++;
                }
        	});
	    });
    }
    var queue = Memory.spawnQueue;
    for(var i=0; i < queue.length; i++){
	    if (queue[i].source_id == source_id){
		    queue[i].body.forEach(function(body_part) {
			    if (body_part == type.body){
				    nr_type++;
			    }
		    });
	    }
	}

    return nr_type;
}

	/*
	// commands all creeps associated with this resource
	module.exports.command_creeps = function() {
	    sources.forEach( function(source) {
		source.miners.forEach( function(creep) {
		    miner(creep);
		});
		source.carriers.forEach( function(creep) {
		    carrier(creep);
		});
	    });
	};
	*/
