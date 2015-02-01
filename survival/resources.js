/*
 * Resource module.
 *
 * nr of carriers needed:
 * You need 10 energy each tick, so:
 * carriers = (2 * miner_yield * distance) / load
 */
var _ = require('lodash');
var C = require('constants');
var sources = Memory.resources;

module.exports = function() {
    var source_ids = _.sortBy(sources, function(n) {
        return n.distance;
    });
    console.log(source_ids);
    source_ids.forEach( function(source) {
        console.log(source);
        console.log(source.distance);
    });
};

// initialize the Resources memory.
// should be per room, is global now.
module.exports.init = function(room) {
    var new_sources = room.find(Game.SOURCES);
    var spawn = room.find(Game.MY_SPAWNS)[0];

    for (var source_name in new_sources) {
        var path = spawn.pos.findPathTo(new_sources[source_name]);
        var distance = 0;
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
            'distance' : distance
        };
    }
}

module.exports.creep_needed = function(source_id) {
};

/*
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
